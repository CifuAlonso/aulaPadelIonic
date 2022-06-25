import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Comportamiento } from '../../interfaces/interfaces';
import { environment } from 'src/environments/environment';
const URL = environment.url
@Injectable({
  providedIn: 'root'
})
export class ComportamientoService {

  token: string = null;
  comiteTecnicoId: string;
  
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
  async getComportamientosAlumno(comiteTecnicoId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/comportamiento/${comiteTecnicoId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['comportamiento']);
          } else {
            resolve(null);
          }
        })
    });

  }
  


  async postComportamientoTecnico(comportamiento: Comportamiento) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/comportamiento`, comportamiento,{ headers })
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


async putComportamiento(comportamiento: Comportamiento) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/comportamiento/${comportamiento.id}`,comportamiento,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deleteComportamiento(comportamiento: Comportamiento) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/comportamiento/${comportamiento.id}`,{ headers })
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
