import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Sugerencia } from '../../interfaces/interfaces';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class SugerenciaService {

  token: string = null;
  comiteTecnicoId: string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
  async getSugerenciasAlumno(comiteTecnicoId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/sugerencia/${comiteTecnicoId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['sugerencias']);
          } else {
            resolve(null);
          }
        })
    });

  }
  


  async postSugerencia(sugerencia: Sugerencia) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/sugerencia/crear`, sugerencia,{ headers })
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }


async putSugerencia(sugerencia: Sugerencia) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/sugerencia/actualizar/${sugerencia.id}`,sugerencia,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deleteSugerencia(sugerencia: Sugerencia) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/sugerencia/${sugerencia.id}`,{ headers })
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

