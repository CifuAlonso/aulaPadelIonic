import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { environment } from 'src/environments/environment';
import { ComiteTecnico } from 'src/interfaces/interfaces';
import { AnimacionEjercicio } from '../../interfaces/interfaces';
const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class AnimacionEjercicioExploraService {


  moviendoAnimacion = false;
  datosEjercicio: any;
framesTerminados = false;

token: string = null;
comiteTecnicoId: string;


  constructor(private http: HttpClient,  private storage: StorageService) { }

  getFramesTerminados() {
    return this.framesTerminados;
  }

  putFramesTerminados(estado:boolean){
    this.framesTerminados=estado;
  }
  


  moviendoAnimacionFalse() {
    this.moviendoAnimacion = false
  }

  moviendoAnimacionTrue() {
    this.moviendoAnimacion = true;
  }

  getMoviendoAnimacion(): boolean {
    return this.moviendoAnimacion
  }


  async getAnimacion(id_ejercicio: number) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/animacionEjercicioExplora/${id_ejercicio}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['ejercicio']);
          } else {
            resolve(null);
          }
        })
    });
  }

  async postAnimacion(animacion: AnimacionEjercicio) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/animacionEjercicioExplora/crear`, animacion,{ headers })
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



  async deleteAnimacion(id) {
    
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/animacionEjercicioExplora/${id}`,{ headers })
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
