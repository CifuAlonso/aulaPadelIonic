import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { SemanaExplora } from '../../interfaces/interfaces';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class SemanaExploraService {

  token: string = null;
  semanaId: string;
  paginaAnterior:string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
   async setSemanaIdActual(semanaId:string){
    this.semanaId=semanaId
    await this.storage.set('semanaExploraId', this.semanaId);
  }


  async setPaginaAnterior(pagina:string){
    this.paginaAnterior=pagina
    await this.storage.set('paginaAnteriorSemanaExplora', this.paginaAnterior);
  }

   async getPaginaAnterior(){
    return await this.storage.get('paginaAnteriorSemanaExplora');
  }

   async getSemanaIdActual(){
    return await this.storage.get('semanaExploraId');
  }

  async deleteSemanaIdActual(){
   
   await this.storage.delete('semanaExploraId');
 }

 
 async getSemana(semanaId:string) {
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/semanaExplora/${semanaId}`, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(resp['semana']);
        } else {
          resolve(null);
        }
      })
  });

}
   
  async getSemanasTrimestre(trimestreId:string,nivelId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/semanaExplora/${trimestreId}/${nivelId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['semanas']);
          } else {
            resolve(null);
          }
        })
    });

  }

     
  async getSemanasPlanificacion(nivelId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/semanaExplora/planificacion/nivel/${nivelId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['semanas']);
          } else {
            resolve(null);
          }
        })
    });

  }
  
     
  async getSeccionesSemana(semanaId:string) {
    this.token = await  this.storage.get('token')|| null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/seccionPlanificacion-explora/${semanaId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['seccionPlanificacionExplora']);
          } else {
            resolve(null);
          }
        })
    });

  }


  async getSubSeccionesSeccion() {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/subseccionPlanificacion-explora/`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['subseccionPlanificacionExplora']);
          } else {
            resolve(null);
          }
        })
    });

  }



}

