import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { OpinionTutor } from '../../interfaces/interfaces';



const URL = environment.url
@Injectable({
  providedIn: 'root'
})
export class OpinionTutorService {

  token: string = null;
  comiteTecnicoId: string;
  constructor(private http: HttpClient,  private storage: StorageService,) {
   
   }

   
  async getOpinionTutor(comiteTecnicoId:string) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.get(`${URL}/opinion-tutor/${comiteTecnicoId}`, {headers})
        .subscribe(resp => {
          if (resp['ok']) {
            resolve(resp['opinion']);
          } else {
            resolve(null);
          }
        })
    });

  }
  


  async postOpinionTutor(opinion: OpinionTutor) {
    this.token = await this.storage.get('token') || null
    const headers = new HttpHeaders({
      'x-token':  this.token
    });
    return new Promise(resolve => {
      this.http.post(`${URL}/opinion-tutor/crear`, opinion,{ headers })
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


async putOpinionTutor(opinion: OpinionTutor) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.put(`${URL}/opinion-tutor/actualizar/${opinion.id}`,opinion,{ headers })
      .subscribe(resp => {
        if (resp['ok']) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
  });
}


async deleteOpinionTutr(opinion: OpinionTutor) {
  
  this.token = await this.storage.get('token') || null
  const headers = new HttpHeaders({
    'x-token':  this.token
  });
  return new Promise(resolve => {
    this.http.delete(`${URL}/opinion-tutor/${opinion.id}`,{ headers })
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
