import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Alumno, Ejercicio } from '../../interfaces/interfaces';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  token: string = null;
  ejercicioId: string;
  paginaAnterior:string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   async setEjercicioIdActual(ejercicioId:string){
     this.ejercicioId=ejercicioId
     await this.storage.set('ejercicioId', this.ejercicioId);
   }

    async getEjercicioIdActual(){
     return await this.storage.get('ejercicioId');
   }

   async deleteEjercicioIdActual(){
    
    await this.storage.delete('ejercicioId');
  }

  async setPaginaAnterior(pagina:string){
    this.paginaAnterior=pagina
    await this.storage.set('paginaAnterior', this.paginaAnterior);
  }

   async getPaginaAnterior(){
    return await this.storage.get('paginaAnterior');
  }

   
  
  async getEjerciciosProfesor(profesorId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/ejercicio/${profesorId}`, {headers})
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
      this.http.get(`${URL}/ejercicio/grupo-ejercicios/${grupoEjerciciosId}/${usuarioId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['ejercicios']);
          } else {
            resolve(null);
          }
        })
    });

  }

    
  async getEjercicio(profesorId:string,ejercicioId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/ejercicio/${profesorId}/${ejercicioId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['ejercicio']);
          } else {
            resolve(null);
          }
        })
    });

  }

  async postEjercicio(ejercicio: Ejercicio) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/ejercicio/crear`, ejercicio,{ headers })
        .subscribe(resp => {

          if (resp['ok']) {
            resolve(resp['ejercicio']);
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

}
