import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Falta } from 'src/interfaces/interfaces';
import { StorageService } from './storage.service';
const URL = environment.url
@Injectable({
  providedIn: 'root'
})
export class FaltasService {

  token: string = null;
  alumnoId: string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
  async getFaltasAlumno(alumnoId:string, profesorId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/ausencia/${alumnoId}/${profesorId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['falta']);
          } else {
            resolve(null);
          }
        })
    });

  }
  


  async postFalta(falta: Falta) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/ausencia`, falta,{ headers })
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


async putFalta(falta: Falta) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/ausencia/${falta.id}`,falta,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deleteFalta(falta: Falta) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/ausencia/${falta.id}`,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}

async enviaAusencia(ausenciaId: string, usuarioId:string, alumnoId:string){

  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/ausencia/uploadAusencia/${ausenciaId}/${usuarioId}/${alumnoId}`,{ headers })
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
