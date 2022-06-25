import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Alumno, Ejercicio, VideoEjercicio } from '../../interfaces/interfaces';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class EjercicioExploraService {

  token: string = null;
  ejercicioId: string;
  paginaAnterior:string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   async setEjercicioIdActual(ejercicioId:string){
     this.ejercicioId=ejercicioId
     await this.storage.set('ejercicioExploraId', this.ejercicioId);
   }

    async getEjercicioIdActual(){
     return await this.storage.get('ejercicioExploraId');
   }

   async deleteEjercicioIdActual(){
    
    await this.storage.delete('ejercicioExploraId');
  }

  async setPaginaAnterior(pagina:string){
    this.paginaAnterior=pagina
    await this.storage.set('paginaAnteriorEjercicioExplora', this.paginaAnterior);
  }

   async getPaginaAnterior(){
    return await this.storage.get('paginaAnteriorEjercicioExplora');
  }

   
  
  async getEjercicios() {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/ejercicioExplora`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['ejercicios']);
          } else {
            resolve(null);
          }
        })
    });

  }

  async getEjerciciosGrupoEjercicios(grupoEjerciciosId:string, usuarioId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/ejercicio-explora/${grupoEjerciciosId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['ejercicios']);
          } else {
            resolve(null);
          }
        })
    });

  }

  async getEjercicio(ejercicioId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/ejercicioExplora/${ejercicioId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['ejercicio']);
          } else {
            resolve(null);
          }
        })
    });
  }

  async getEjercicioCodigo(cod_ejercicio:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/ejercicioExplora/cod_ejercicio/${cod_ejercicio}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['ejercicio']);
          } else {
            resolve(null);
          }
        })
    });
  }

  async getVideoEjercicio(ejercicioId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/video-ejercicio/${ejercicioId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['videoEjercicio']);
          } else {
            resolve(null);
          }
        })
    });
  }

  async postVideoEjercicio(videoEjercicio: VideoEjercicio) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/video-ejercicio/crear`, videoEjercicio,{ headers })
        .subscribe(resp => {

          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }
    
  /*
  async postEjercicio(ejercicio: Ejercicio) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/ejercicio/crear`, ejercicio,{ headers })
        .subscribe(resp => {

          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }



  async putEjercicio(ejercicio: Ejercicio) {
  
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.put(`${URL}/ejercicio/actualizar/${ejercicio.id}`,ejercicio,{ headers })
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }

  
async deleteEjercicio(ejercicio: Ejercicio) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/ejercicio/${ejercicio.id}`,{ headers })
      .subscribe(resp => {

        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}
*/
}
