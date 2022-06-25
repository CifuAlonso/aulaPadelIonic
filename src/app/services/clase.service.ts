import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Alumno, Clase } from '../../interfaces/interfaces';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  token: string = null;
  claseId: string;
  paginaAnterior:string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   async setClaseIdActual(claseId:string){
     this.claseId=claseId
     await this.storage.set('claseId', this.claseId);
   }

    async getClaseIdActual(){
     return await this.storage.get('claseId');
   }

  async setPaginaAnterior(pagina:string){
    this.paginaAnterior=pagina
    await this.storage.set('paginaAnteriorClase', this.paginaAnterior);
  }

   async getPaginaAnterior(){
    return await this.storage.get('paginaAnteriorClase');
  }

   
  async getClasesDia(usuarioId:string,fecha:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/clase/${usuarioId}/${fecha}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['clases']);
          } else {
            resolve(null);
          }
        })
    });

  }

     
  async getClase(claseId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/clase/${claseId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['clase']);
          } else {
            resolve(null);
          }
        })
    });

  }
  

  async postClase(clase: Clase) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/clase/crear`, clase,{ headers })
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

  async postClaseMultiple(clase: Clase, fechaInicio:string, fechaFin:string, diasSemana:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/clase/multiple/crear/${fechaInicio}/${fechaFin}/${diasSemana}`, clase,{ headers })
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



  async putClase(clase: Clase) {
  
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.put(`${URL}/clase/actualizar/${clase.id}`,clase,{ headers })
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }

  async retrasaClases(clase:Clase,usuarioId:string){
    
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.put(`${URL}/clase/retrasar/clase/${clase.id}/${usuarioId}`,clase,{ headers })
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }

  
async deleteClase(clase: Clase) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/clase/${clase.id}`,{ headers })
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
