import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Semana } from '../../interfaces/interfaces';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class SemanaService {

  token: string = null;
  semanaId: string;
  paginaAnterior:string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
   async setSemanaIdActual(semanaId:string){
    this.semanaId=semanaId
    await this.storage.set('semanaId', this.semanaId);
  }


  async setPaginaAnterior(pagina:string){
    this.paginaAnterior=pagina
    await this.storage.set('paginaAnteriorSemana', this.paginaAnterior);
  }

   async getPaginaAnterior(){
    return await this.storage.get('paginaAnteriorSemana');
  }

   async getSemanaIdActual(){
    return await this.storage.get('semanaId');
  }

  async deleteSemanaIdActual(){
   
   await this.storage.delete('semanaId');
 }

 
 async getSemana(semanaId:string) {
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/semana/${semanaId}`, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(resp['semana']);
        } else {
          resolve(null);
        }
      })
  });

}
   
  async getSemanasTrimestre(trimestreId:string,usuarioId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/semana/${trimestreId}/${usuarioId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['semanas']);
          } else {
            resolve(null);
          }
        })
    });

  }

     
  async getSemanasPlanificacion(planificacionId:string,usuarioId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/semana/planificacion/${planificacionId}/${usuarioId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['semanas']);
          } else {
            resolve(null);
          }
        })
    });

  }
  


  async postSemana(semana: Semana) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/semana/crear`, semana,{ headers })
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }


async putSemana(semana: Semana) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/semana/actualizar/${semana.id}`,semana,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deleteSemana(semana: Semana) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/semana/${semana.id}`,{ headers })
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

