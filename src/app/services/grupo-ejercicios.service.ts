import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Alumno, DetalleTecnico, GrupoEjercicios } from '../../interfaces/interfaces';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class GrupoEjerciciosService {

  token: string = null;
  grupoEjerciciosId: string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
   async setGrupoEjerciciosIdActual(grupoEjerciciosId:string){
    this.grupoEjerciciosId=grupoEjerciciosId
    await this.storage.set('grupoEjerciciosId', this.grupoEjerciciosId);
  }

   async getgrupoEjerciciosIdActual(){
    return await this.storage.get('grupoEjerciciosId');
  }

  async deleteGrupoEjerciciosIdActual(){
   
   await this.storage.delete('grupoEjerciciosId');
 }

 
 async getGrupoEjercicios(grupoId:string) {
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/grupo-ejercicios/${grupoId}`, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(resp['grupo']);
        } else {
          resolve(null);
        }
      })
  });

}
   
  async getGruposUsuario(usuarioId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/grupo-ejercicios/usuario/${usuarioId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['grupos']);
          } else {
            resolve(null);
          }
        })
    });

  }
  


  async postGrupoEjercicios(grupo: GrupoEjercicios) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/grupo-ejercicios/crear`, grupo,{ headers })
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


async putGrupoEjercicios(grupo: GrupoEjercicios) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/grupo-ejercicios/actualizar/${grupo.id}`,grupo,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deleteGrupoEjercicios(grupo: GrupoEjercicios) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/grupo-ejercicios/${grupo.id}`,{ headers })
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

