import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { Usuario } from 'src/interfaces/interfaces';
import { StorageService } from './storage.service';
import { NavController } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};

  constructor(private http: HttpClient,
    private storage: StorageService,
    private navCtrl:NavController,
    private fileTransfer:FileTransfer) { }

  login(email: string, password: string) {

    const data = { email, password };

    return new Promise(resolve => {
      this.http.post(`${URL}/usuario/login`, data)
        .subscribe(async resp => {
          if (resp['ok']) {
            await this.guardarToken(resp['token'])
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        })
    });

  }

  logout(){
    this.token = null;
    this.usuario = null;
    this.storage.clear();
    this.navCtrl.navigateRoot('/login', {animated:true})
  }

  registro(usuario: Usuario) {

    return new Promise(resolve => {
      this.http.post(`${URL}/usuario/crear`, usuario)
        .subscribe(async resp => {
          if (resp['ok']) {
           await this.guardarToken(resp['token'])
            resolve(true);
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false);
          }
        })
    });
  }

  registroProfe(usuario: Usuario) {

    return new Promise(resolve => {
      this.http.post(`${URL}/usuario/crear`, usuario)
        .subscribe(async resp => {
          if (resp['ok']) {
         //  await this.guardarToken(resp['token'])
            resolve(resp);
          } else {
         
            resolve(false);
          }
        })
    });
  }

  getUsuario(){

    return { ...this.usuario };
  }


  async getUsuarioId(usuarioId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/usuario/id/${usuarioId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['usuario']);
          } else {
            resolve(null);
          }
        })
    });

  }

  
  async actualizaUsuario(usuario: Usuario) {

    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.put(`${URL}/usuario/actualizar`, usuario,{ headers })
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }
  async actualizaPassword(usuario: Usuario) {

    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.put(`${URL}/usuario/actualizar/password`, usuario,{ headers })
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }

  async guardarToken(token: string) {
    this.token = token;
    await this.storage.set('token', token);

    await this.validaToken();
  }

  async cargarToken(){
     this.token = await this.storage.get('token') || null;

  }

 
 async validaToken(): Promise<boolean> {

    await this.cargarToken();

    if (!this.token){
 
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      this.http.get(`${URL}/usuario`, { headers }).subscribe(resp => {
        if (resp['ok']) {
          this.usuario = resp['usuario'];
          resolve(true)
        } else {
          this.navCtrl.navigateRoot('/login');
          resolve(false)
        }
      })
    });
  }

  subirAvatar(img: string, id:string){

    const options: FileUploadOptions = {
      fileKey: 'avatar',
      headers:{
        'x-token': this.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload( img, `${URL}/usuario/uploadAvatar/${id}`, options)
    .then( data =>{
     
    }).catch( err =>{
      console.log('error en carga', err)
    })
  }

  async getAvatar(img:string){
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/usuario/avatar/imagen/${img}`, {headers, responseType:'blob'},)
        .subscribe(resp => {
   
            resolve(resp);
          
        })
    });
  }

  async cambiaPassword(email:string){
   
    return new Promise(resolve => {
      this.http.get(`${URL}/usuario/cambiaPass/email/${email}`)
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }


  async deleteUsuario(usuario:Usuario) {
  
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.delete(`${URL}/usuario/${usuario.id}`,{ headers })
        .subscribe(resp => {
  
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }

}
