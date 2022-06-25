import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Alumno, DetalleTecnico, GrupoVideoLibro } from '../../interfaces/interfaces';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class GrupoVideoLibroService {

  token: string = null;
  grupoVideoLibroId: string;
  pagina=0;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
   async setGrupoVideoLibroIdActual(grupoVideoLibroId:string){
    this.grupoVideoLibroId=grupoVideoLibroId
    await this.storage.set('grupoVideoLibroId', this.grupoVideoLibroId);
  }

   async getgrupoVideoLibroIdActual(){
    return await this.storage.get('grupoVideoLibroId');
  }

  async deleteGrupoVideoLibroIdActual(){
   
   await this.storage.delete('grupoVideoLibroId');
 }

 
 async getGruposVideoLibro() {
   this.pagina++;
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/grupo-videoLibro/paginacion/${this.pagina}`, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(resp['grupos']);
        } else {
          resolve(null);
        }
      })
  });

}


async getVideoLibro(videoLibroId:string) {
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/grupo-videoLibro/${videoLibroId}`, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(resp['grupo']);
        } else {
          resolve(null);
        }
      })
  });

}
   


  async postGrupoVideoLibro(grupo: GrupoVideoLibro) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/grupo-videoLibro/crear`, grupo,{ headers })
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


async putGrupoVideoLibro(grupo: GrupoVideoLibro) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/grupo-videoLibro/actualizar/${grupo.id}`,grupo,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deleteGrupoVideoLibro(grupo: GrupoVideoLibro) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/grupo-videoLibro/${grupo.id}`,{ headers })
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

async getFotoGrupo(id:string){
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/grupo-videoLibro/imagen/${id}`, {headers, responseType:'blob'},)
      .subscribe(resp => {
 
          resolve(resp);
        
      })
  });
}
}

