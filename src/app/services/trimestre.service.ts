import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Alumno, DetalleTecnico, GrupoEjercicios, Planificacion, Trimestre } from '../../interfaces/interfaces';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class TrimestreService {

  token: string = null;
  trimestreId: string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
   async setTrimestreIdActual(trimestreId:string){
    this.trimestreId=trimestreId
    await this.storage.set('trimestreId', this.trimestreId);
  }

   async getTrimestreIdActual(){
    return await this.storage.get('trimestreId');
  }

  async deleteTrimestreIdActual(){
   
   await this.storage.delete('trimestreId');
 }

 
 async getTrimestre(trimestreId:string) {
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/trimestre/${trimestreId}`, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(resp['trimestre']);
        } else {
          resolve(null);
        }
      })
  });

}
   
  async getTrimestresPlanificacion(planificacionId:string,usuarioId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/trimestre/${planificacionId}/${usuarioId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['trimestres']);
          } else {
            resolve(null);
          }
        })
    });

  }
  


  async postTrimestre(trimestre: Trimestre) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/trimestre/crear`, trimestre,{ headers })
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }


async putTrimestre(trimestre: Trimestre) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/trimestre/actualizar/${trimestre.id}`,trimestre,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deleteTrimestre(trimestre: Trimestre) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/trimestre/${trimestre.id}`,{ headers })
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

