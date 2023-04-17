import { Injectable } from '@angular/core';
import { IProvider } from './provider/i-provider';
import { LocalForage } from './provider/localforage/local-forage';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor() { }

  // TODO: Make this accept other providers
  private provider: IProvider = new LocalForage();

  public async readOne(dataType: string, id: string) {

  }

  public async readMany(dataType: string, search: string[]): Promise<any[]> {

  }

  public write(datatype: string, newData: any, newId: string): void {

  }
}
