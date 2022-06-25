import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { OpinionEntrenador } from '../../interfaces/interfaces';



const URL = environment.url
@Injectable({
  providedIn: 'root'
})
export class OpinionEntrenadorService {

  token: string = null;
  comiteTecnicoId: string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
  async getOpinionEntrenador(comiteTecnicoId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/opinion-entrenador/${comiteTecnicoId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['opinion']);
          } else {
            resolve(null);
          }
        })
    });

  }
  


  async postOpinionEntrenador(opinion: OpinionEntrenador) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/opinion-entrenador/crear`, opinion,{ headers })
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


async putOpinionEntrenador(opinion: OpinionEntrenador) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/opinion-entrenador/actualizar/${opinion.id}`,opinion,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deleteOpinionEntrenador(opinion: OpinionEntrenador) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/opinion-entrenador/${opinion.id}`,{ headers })
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
