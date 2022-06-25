import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profesor } from 'src/interfaces/interfaces';
import { StorageService } from './storage.service';
import { UsuarioService } from './usuario.service';

const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  token: string = null;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }
   async setProfesorIdActual(profesorId:string){
    await this.storage.set('profesorId', profesorId);
  }
  
  async getProfesorIdActual(){
    return await this.storage.get('profesorId');
  }

  async removeProfesorIdActual(){
    return await this.storage.delete('profesorId');
  }

     
  async setPaginaAnterior(pagina:string){
    await this.storage.set('paginaAnteriorProfesor', pagina  );
  }

   async getPaginaAnterior(){
    return await this.storage.get('paginaAnteriorProfesor');
  }

  async getAlumnosProfesor(profesorId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/alumno/profesor/${profesorId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['alumnos']);
          } else {
            resolve(null);
          }
        })
    });

  }

    
  async getAlumnosUsuarioProfesor(profesorId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/alumnoUsuario/profesor/${profesorId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['alumnos']);
          } else {
            resolve(null);
          }
        })
    });

  }

  async getProfesoresClub(clubId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/profesor/club/${clubId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['profesores']);
          } else {
            resolve(null);
          }
        })
    });

  }

  async getClubProfesor(profesorId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/profesor/pertenece/club/${profesorId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['profesor']);
          } else {
            resolve(null);
          }
        })
    });

  }

  async postProfesor(profesor: Profesor) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/profesor/crear`, profesor,{ headers })
        .subscribe(resp => {
          console.log(resp)
          if (resp['ok']) {
            console.log(resp)
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }

   
async deleteProfesor(profesor: Profesor) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/profesor/${profesor.usuarioId}`,{ headers })
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

 