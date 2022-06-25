import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { ComiteTecnico } from 'src/interfaces/interfaces';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class ComiteTecnicoService {

  
  token: string = null;
  alumnoId: string;
  comiteId: string;
  constructor(private http: HttpClient,  private storage: StorageService, private fileTransfer:FileTransfer) {
   
   }

   
   async setComiteIdActual(comiteId:string){
    this.comiteId=comiteId
    await this.storage.set('comiteId', this.comiteId);
  }

   async getComiteIdActual(){
    return await this.storage.get('comiteId');
  }


   
  async getComitesTecnicosAlumno(alumnoId:string, profesorId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/comiteTecnico/${alumnoId}/${profesorId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['comiteTecnico']);
          } else {
            resolve(null);
          }
        })
    });

  }
  


  async postComiteTecnico(comiteTecnico: ComiteTecnico) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/comiteTecnico`, comiteTecnico,{ headers })
        .subscribe(resp => {
          console.log(resp)
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }


async putComiteTecnico(comiteTecnico: ComiteTecnico) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/comiteTecnico/${comiteTecnico.id}`,comiteTecnico,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deleteComiteTecnico(comiteTecnico: ComiteTecnico) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/comiteTecnico/${comiteTecnico.id}`,{ headers })
      .subscribe(resp => {
        console.log(resp)
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}

subirComite(comite: any, id:string){

  const options: FileUploadOptions = {
    fileKey: 'comite',
    headers:{
      'x-token': this.token
    }
  };

  const fileTransfer: FileTransferObject = this.fileTransfer.create();
console.log("Llegamos al servicio")
  fileTransfer.upload( comite, `${URL}/comiteTecnico/uploadComite/${id}`, options)
  .then( data =>{
   console.log(data)
  }).catch( err =>{
    console.log('error en carga', err)
  })
}

async enviaComite(comiteId: string, usuarioId:string, alumnoId:string){

  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/comiteTecnico/uploadComite/${comiteId}/${usuarioId}/${alumnoId}`,{ headers })
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
