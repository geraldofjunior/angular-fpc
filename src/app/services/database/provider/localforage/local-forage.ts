import { IProvider } from '../i-provider';
import * as localforage from 'localforage';

export class LocalForage implements IProvider {
  private readonly DB_VERSION = 0.1;
  private readonly DB_DRIVER = localforage.INDEXEDDB;
  private readonly DB_TABLES = [ 'project', 'function', 'adjustment_factor', 'user' ];

  private data: globalThis.LocalForage[] = [];

  constructor() {
    this.connect();
  }

  connect() {
    const config = {
      driver: this.DB_DRIVER,
      name: '',
      version: this.DB_VERSION,
      storeName: ''
    };

    this.DB_TABLES.forEach((current_table, current_index) => {
      config.name = 'FPC_' + current_table;
      config.storeName = 'FPC_' + current_table;
      this.data[current_index] = localforage.createInstance(config);
    });
  }

  async disconnect(): Promise<void> {
    await localforage.clear();
  }

  async insert(table: string, data: any, key: string): Promise<void> {
    await this.data[this.DB_TABLES.indexOf(table)].setItem(key, data);
  }

  public async update(table: string, data: any, search: any): Promise<void> {
    await this.data[this.DB_TABLES.indexOf(table)].setItem(search, data);
  }

  public async delete(table: string, search: any): Promise<void> {
    this.search(table, search).then(dataToDelete => {
      this.data[this.DB_TABLES.indexOf(table)].removeItem(dataToDelete.id);
    });
  }

  public async select(table: string, search: any): Promise<any> {
    return await this.search(table, search);
  }

  private async search(table: string, search: object): Promise<Array<{ id: string; value: object; }>> {
    const results: { id: string; value: any; }[] = [];

    if (Object.hasOwn(search, "id")) {
      const result = await this.data[this.DB_TABLES.indexOf(table)].getItem(search.id);
      results.push({ id: search.id, value: result });
      return results;
    }

    await localforage.iterate((value: string, key: string) => {
      const valueFound = Object.values(value).find(val => val === search.toString());
      if (valueFound) {
        results.push({ id: key, value: value });
      }
    });

    return results;
  }

}
