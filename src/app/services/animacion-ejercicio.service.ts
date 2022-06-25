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
export class AnimacionEjercicioService {


  moviendoAnimacion = false;
  datosEjercicio: any;
framesTerminados = false;

token: string = null;
comiteTecnicoId: string;


  constructor(
    private http: HttpClient,  private storage: StorageService
  ) { }

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

  getAnimaciones() {
    if (this.datosEjercicio.id_ejercicio != undefined) {
    let url = environment + 'animacionEjercicio'
    return this.http.get(url);
  }else{
    let url = environment + 'animacionEjercicioUsuario'
    return this.http.get(url);
  }
  }

  async getAnimacion(id_ejercicio: number) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/animacionEjercicio/${id_ejercicio}`, {headers})
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
      this.http.post(`${URL}/animacionEjercicio/crear`, animacion,{ headers })
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


  putAnimacion(animacion: AnimacionEjercicio) {
    if (this.datosEjercicio.id_ejercicio != undefined) {
      let url = environment + 'animacionEjercicio' + '/' + animacion.id;
      return this.http.put(url, animacion)
      /*  
      .pipe(map((resp: any) => {

          Swal.fire('Animación actualizada', '', 'success');
          return resp;
        }));
        */
    } else {
      let url = environment + 'animacionEjercicioUsuario' + '/' + animacion.id;;
      return this.http.put(url, animacion)
      /*
        .pipe(map((resp: any) => {
          Swal.fire('Animación actualizada', '', 'success');

          return resp;
        }));
        */
    }
  }

  async deleteAnimacion(id) {
    
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/animacionEjercicio/${id}`,{ headers })
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
