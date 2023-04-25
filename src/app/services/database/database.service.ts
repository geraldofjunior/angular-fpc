import { Injectable } from '@angular/core';
import { IProvider } from './provider/i-provider';
import { LocalForage } from './provider/localforage/local-forage';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  constructor() { }

  private provider: IProvider = new LocalForage();

  /* About the search object

    It must be formatted as:
    { column1: value1, column2: value2 }

    It will search with AND operator.

    Its flexibility is yet low, but I'll try to increase that without sacrificing this
    object simplicity. The search object will be parsed by the provider.
  */

  public async read(datatype: string, search: Object) {
    return await this.provider.select(datatype, search.toString());
  }

  public write(datatype: string, newData: any, id: string): void {
    this.provider.insert(datatype, newData, id);
  }

  public update(datatype: string, newData: any, search: Object): void {
     this.provider.update(datatype, newData, search.toString());
  }

  public delete(datatype: string, search: Object) {
    this.provider.delete(datatype, search.toString());
  }
}
