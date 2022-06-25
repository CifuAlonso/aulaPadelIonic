import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlumnoUsuario, AsistenciaAlumno } from '../../interfaces/interfaces';
import { StorageService } from './storage.service';

const URL = environment.url
@Injectable({
  providedIn: 'root'
})
export class AsistenciaAlumnoService {
  token: string = null;
  constructor(private http: HttpClient,  private storage: StorageService) { }

  
  async postAsistencia(asistencia: AsistenciaAlumno) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/asistencia-alumno/crear`, asistencia,{ headers })
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
    });
  }

  async getAsistenciaAlumnoClase(claseId:string,alumnoId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/asistencia-alumno/${claseId}/${alumnoId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['asistenciaAlumnos']);
          } else {
            resolve(null);
          }
        })
    });

  }

}
