import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AlumnoUsuario } from '../../interfaces/interfaces';
import { StorageService } from './storage.service';

const URL = environment.url
@Injectable({
  providedIn: 'root'
})
export class AlumnoUsuarioService {
  token: string = null;
  constructor(private http: HttpClient,  private storage: StorageService) { }

  
  async postAlumnoUsuario(alumno: AlumnoUsuario) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/alumnoUsuario/crear`, alumno,{ headers })
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
