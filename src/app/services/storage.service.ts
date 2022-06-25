import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
   public async set(key: string, value: any) {
    await this.storage.set(key, value);
  }

  public async  get(key: string) {

    const data = await this.storage.get(key);

    return data
  }

  public async  delete(key: string) {

    const data = await this.storage.remove(key);

    return data
  }
  public clear(){
    this._storage.clear();
  }
}
