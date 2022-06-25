import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class NivelPlanificacionExploraService {

  
  token: string = null;
 
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
   async setNivelActual(NivelId:string){
    await this.storage.set('NivelPlanificacionExploraId', NivelId);
  }

   async getNivelIdActual(){
    return await this.storage.get('NivelPlanificacionExploraId');
  }


   
  async getNivelesCategoria(categoriaId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/nivel-planificacion-explora/categoria/${categoriaId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['nivelesPlanificacion']);
          } else {
            resolve(null);
          }
        })
    });

  }

  async getNivel(nivelId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/nivel-planificacion-explora/${nivelId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['nivelPlanificacion']);
          } else {
            resolve(null);
          }
        })
    });

  }

  async getNiveles() {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/nivel-planificacion-explora/`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['nivelesPlanificacion']);
          } else {
            resolve(null);
          }
        })
    });

  }


  
}
