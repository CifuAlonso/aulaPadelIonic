import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { GrupoAlumnos } from '../../interfaces/interfaces';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class GrupoAlumnoService {

  token: string = null;
  grupoAlumnoId: string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
   async setGrupoAlumnoIdActual(grupoAlumnoId:string){
    this.grupoAlumnoId=grupoAlumnoId
    await this.storage.set('grupoAlumnoId', this.grupoAlumnoId);
  }

   async getgrupoAlumnoIdActual(){
    return await this.storage.get('grupoAlumnoId');
  }

  async deleteGrupoAlumnoIdActual(){
   
   await this.storage.delete('grupoAlumnoId');
 }

 
 async getGrupoAlumno(grupoId:string) {
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/grupo-alumno/${grupoId}`, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(resp['grupos']);
        } else {
          resolve(null);
        }
      })
  });

}

async getGrupo(grupoId:string) {
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/grupo-alumno/grupo/${grupoId}`, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(resp['grupo']);
        } else {
          resolve(null);
        }
      })
  });

}
   


  async postGrupoAlumno(grupo: GrupoAlumnos) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/grupo-alumno/crear`, grupo,{ headers })
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


async putGrupoAlumno(grupo: GrupoAlumnos) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/grupo-alumno/actualizar/${grupo.id}`,grupo,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deleteGrupoAlumno(grupo: GrupoAlumnos) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/grupo-alumno/${grupo.id}`,{ headers })
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

