import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Alumno, DetalleTecnico, GrupoEjercicios, Planificacion } from '../../interfaces/interfaces';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class PlanificacionesService {

  token: string = null;
  planificacionId: string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
   async setPlanificacionIdActual(planificacionId:string){
    this.planificacionId=planificacionId
    await this.storage.set('planificacionId', this.planificacionId);
  }

   async getplanificacionIdActual(){
    return await this.storage.get('planificacionId');
  }

  async deleteplanificacionIdActual(){
   
   await this.storage.delete('planificacionId');
 }

 
 async getPlanificacion(usuarioId:string,planificacionId:string) {
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/planificacion/${usuarioId}/${planificacionId}`, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(resp['planificacion']);
        } else {
          resolve(null);
        }
      })
  });

}

 
   
  async getPlanificacionesUsuario(usuarioId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/planificacion/${usuarioId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['planificaciones']);
          } else {
            resolve(null);
          }
        })
    });

  }
  


  async postPlanificacion(planificacion: Planificacion) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/planificacion/crear`, planificacion,{ headers })
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }


async putPlanificacion(planificacion: Planificacion) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/planificacion/actualizar/${planificacion.id}`,planificacion,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deletePlanificacion(planificacion: Planificacion) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/planificacion/${planificacion.id}`,{ headers })
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

