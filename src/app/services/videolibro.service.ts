import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Alumno, DetalleTecnico, GrupoVideoLibro, VideoLibro } from '../../interfaces/interfaces';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class VideoLibroService {

  token: string = null;
  grupoVideoLibroId: string;
  paginaVideo=0
  paginaConsejo=0
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   putPaginas0(){
     this.paginaConsejo=0;
     this.paginaVideo=0;
   }

   async getMenuIds(ap:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/menuIds/${ap}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['menuIds']);
          } else {
            resolve(null);
          }
        })
    });
  
  }
  


 
 async getVideoLibros() {
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/videoLibro`, {headers})
      .subscribe(resp => {
 
        if (resp['ok']) {
          resolve(resp['videoLibros']);
        } else {
          resolve(null);
        }
      })
  });

}



async getVideoLibrosGrupoPaginado(grupoId:string,consejo:boolean) {
  console.log("Consejo: "+this.paginaConsejo)
  console.log("Video: "+this.paginaVideo)
  if (!consejo){
    this.paginaVideo++;
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/videoLibro/${grupoId}/0/${this.paginaVideo}`, {headers})
        .subscribe(resp => {
 
          if (resp['ok']) {
            resolve(resp['videoLibros']);
          } else {
            resolve(null);
          }
        })
    });
  } else {
    this.paginaConsejo++;
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/videoLibro/${grupoId}/1/${this.paginaConsejo}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['videoLibros']);
          } else {
            resolve(null);
          }
        })
    });
  }
 

}


async putVideoLibro(videoLibro: VideoLibro) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/videoLibro/${videoLibro.id}`,videoLibro,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}
   

/*
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
*/
}

