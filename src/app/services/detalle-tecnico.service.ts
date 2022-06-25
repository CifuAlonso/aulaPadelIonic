import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Alumno, DetalleTecnico } from '../../interfaces/interfaces';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class DetalleTecnicoService {

  token: string = null;
  comiteTecnicoId: string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
  async getDetallesAlumno(comiteTecnicoId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/detalleTecnico/${comiteTecnicoId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['detalles']);
          } else {
            resolve(null);
          }
        })
    });

  }
  


  async postDetalleTecnico(detalle: DetalleTecnico) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/detalleTecnico/crear`, detalle,{ headers })
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


async putDetalleTecnico(detalle: DetalleTecnico) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/detalleTecnico/actualizar/${detalle.id}`,detalle,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deleteDetalleTecnico(detalle: DetalleTecnico) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/detalleTecnico/${detalle.id}`,{ headers })
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

