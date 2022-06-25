import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TrimestreExploraService {

  
  token: string = null;
  trimestreId: string;
  constructor(private storage: StorageService,) {
   
   }

   
   async setTrimestreIdActual(trimestreId:string){
    this.trimestreId=trimestreId
    await this.storage.set('trimestreExploraId', this.trimestreId);
  }

   async getTrimestreIdActual(){
    return await this.storage.get('trimestreExploraId');
  }

}
