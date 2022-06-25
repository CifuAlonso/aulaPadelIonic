import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { SemanaPlanificacionEjercicio } from '../../interfaces/interfaces';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class SemanaEjercicioService {

  token: string = null;
  semanaEjercicioId: string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
   async setSemanaEjercicioIdActual(semanaEjercicioId:string){
    this.semanaEjercicioId=semanaEjercicioId
    await this.storage.set('semanaEjercicioId', this.semanaEjercicioId);
  }

   async getSemanaEjercicioIdActual(){
    return await this.storage.get('semanaEjercicioId');
  }

  async deleteSemanaEjercicioIdActual(){
   
   await this.storage.delete('semanaEjercicioId');
 }

 
 async getEjerciciosSemana(semanaId:string) {
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/semanaPlanificacion-ejercicio/${semanaId}`, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(resp['semanaEjercicios']);
        } else {
          resolve(null);
        }
      })
  });
}



  async postSemanaEjercicio(semanaEjercicio: SemanaPlanificacionEjercicio) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/semanaPlanificacion-ejercicio/crear`, semanaEjercicio,{ headers })
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


async putSemanaEjercicio(semanaEjercicio: SemanaPlanificacionEjercicio) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/semanaPlanificacion-ejercicio/actualizar/${semanaEjercicio.id}`,semanaEjercicio,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deleteSemanaEjercicio(semanaEjercicio: SemanaPlanificacionEjercicio) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/semanaPlanificacion-ejercicio/${semanaEjercicio.id}`,{ headers })
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
}

