import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { SemanaPlanificacionEjercicio, SemanaPlanificacionExploraEjercicio } from '../../interfaces/interfaces';


const URL = environment.url

@Injectable({
  providedIn: 'root'
})
export class SemanaEjercicioExploraService {

  token: string = null;
  semanaEjercicioId: string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
   async setSemanaEjercicioIdActual(semanaEjercicioId:string){
    this.semanaEjercicioId=semanaEjercicioId
    await this.storage.set('semanaEjercicioExploraId', this.semanaEjercicioId);
  }

   async getSemanaEjercicioIdActual(){
    return await this.storage.get('semanaEjercicioExploraId');
  }

  async deleteSemanaEjercicioIdActual(){
   
   await this.storage.delete('semanaEjercicioExploraId');
 }

 
 async getEjerciciosSemana(semanaId:string) {
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.get(`${URL}/semanaPlanificacionExplora-ejercicio/${semanaId}`, {headers})
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(resp['semanaEjercicios']);
        } else {
          resolve(null);
        }
      })
  });
}

async putEjericcioSemana(ejercicioSemana: SemanaPlanificacionExploraEjercicio) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/semanaPlanificacionExplora-ejercicio/actualizar/${ejercicioSemana.id}`,ejercicioSemana,{ headers })
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

