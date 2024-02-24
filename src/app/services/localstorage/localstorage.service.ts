import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  public async setItem<T>(key: string, data: T): Promise<boolean> {
    return new Promise<boolean>((resolve) => { 
      localStorage.setItem(key, JSON.stringify(data));
      resolve(true);
    });
  }
  

  public getItem(key: string) {
    return localStorage.getItem(key);
  }
}
