import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class CategoriaPlanificacionExploraService {

  
  token: string = null;
 
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
   async setCategoriaActual(categoriaId:string){
    await this.storage.set('categoriaPlanificacionExploraId', categoriaId);
  }

   async getCategoriaIdActual(){
    return await this.storage.get('categoriaPlanificacionExploraId');
  }


   
  async getCategorias() {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/categoria-planificacion-explora/`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['categoriasPlanificacion']);
          } else {
            resolve(null);
          }
        })
    });

  }

  async getCategoria(categoriaId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/categoria-planificacion-explora/${categoriaId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['categoriaPlanificacion']);
          } else {
            resolve(null);
          }
        })
    });

  }

  
}
