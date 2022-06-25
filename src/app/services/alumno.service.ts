import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Alumno } from '../../interfaces/interfaces';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@awesome-cordova-plugins/file-transfer/ngx';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  token: string = null;
  alumnoId: string;
  paginaAnterior:string;
  constructor(private http: HttpClient,  private storage: StorageService,
    private fileTransfer:FileTransfer) {
   
   }

   async setAlumnoIdActual(alumnoId:string){
     this.alumnoId=alumnoId
     await this.storage.set('alumnoId', this.alumnoId);
   }

    async getAlumnoIdActual(){
     return await this.storage.get('alumnoId');
   }
   
  async setPaginaAnterior(pagina:string){
    this.paginaAnterior=pagina
    await this.storage.set('paginaAnteriorAlumno', this.paginaAnterior);
  }

   async getPaginaAnterior(){
    return await this.storage.get('paginaAnteriorAlumno');
  }

   
  async getAlumno(alumnoId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/alumno/${alumnoId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['alumno']);
          } else {
            resolve(null);
          }
        })
    });

  }
  
  async getAlumnosProfesor(profesorId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/alumno/profesor/${profesorId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['alumnos']);
          } else {
            resolve(null);
          }
        })
    });

  }

  async postAlumnoProfesor(alumno: Alumno) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/alumno/crear`, alumno,{ headers })
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



  async putAlumno(alumno: Alumno) {
  
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.put(`${URL}/alumno/${alumno.id}`,alumno,{ headers })
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }

  
async deleteAlumno(alumno: Alumno) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/alumno/${alumno.id}`,{ headers })
      .subscribe(resp => {

        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}

subirAvatar(img: string, idUsuario:string, idAlumno:string){

  const options: FileUploadOptions = {
    fileKey: 'avatar',
    headers:{
      'x-token': this.token
    }
  };

  const fileTransfer: FileTransferObject = this.fileTransfer.create();

  fileTransfer.upload( img, `${URL}/alumno/uploadAvatar/${idUsuario}/${idAlumno}`, options)
  .then( data =>{
   
  }).catch( err =>{
    console.log('error en carga', err)
  })
}

async getAvatar(idUsuario:string, avatarAlumno:string){
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/alumno/avatar/imagen/${idUsuario}/${avatarAlumno}`, {headers, responseType:'blob'},)
      .subscribe(resp => {
 
          resolve(resp);
        
      })
  });
}

}
