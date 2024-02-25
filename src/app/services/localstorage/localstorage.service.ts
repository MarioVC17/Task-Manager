import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  /**
   * @param {string} key - Key de la info en el localstorage
   * @param {T} data - Data a guardar en el localstorage
   * @returns {Promise<boolean>}
   */
  public async setItem<T>(key: string, data: T): Promise<boolean> {
    return new Promise<boolean>((resolve) => { 
      localStorage.setItem(key, JSON.stringify(data));
      resolve(true);
    });
  }
  
  /**
   * 
   * @param {string} key - Key de la infor en el localstorage 
   * @returns 
   */
  public getItem(key: string) {
    return localStorage.getItem(key);
  }
}
