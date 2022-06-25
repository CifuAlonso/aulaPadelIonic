import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Alumno, DetalleTecnico, Grupo } from '../../interfaces/interfaces';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class GrupoService {


  token: string = null;
  grupoId:string;

  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
   async setGrupoIdActual(grupoId:string){
    this.grupoId=grupoId
    await this.storage.set('grupoId', this.grupoId);
  }

   async getGrupoIdActual(){
    return await this.storage.get('grupoId');
  }

  

  async setPaginaAnterior(pagina:string){
    await this.storage.set('paginaAnteriorGrupo', pagina);
  }

   async getPaginaAnterior(){
    return await this.storage.get('paginaAnteriorGrupo');
  }


  async getGruposProfesor(profesorId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/grupo/${profesorId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['grupos']);
          } else {
            resolve(null);
          }
        })
    });

  }

 async getGrupo(grupoId: string, profesorId:string) {
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/grupo/${grupoId}/${profesorId}`, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(resp['grupo']);
        } else {
          resolve(null);
        }
      })
  });
  }
  


  async postGrupo(grupo: Grupo) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/grupo/crear`, grupo,{ headers })
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


async putGrupo(grupo: Grupo) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/grupo/actualizar/${grupo.id}`,grupo,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deleteGrupo(grupo: Grupo) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/grupo/${grupo.id}`,{ headers })
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

