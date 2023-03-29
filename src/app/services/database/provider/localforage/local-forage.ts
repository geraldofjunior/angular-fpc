import { IProvider } from '../i-provider';
import * as localforage from 'localforage';

export class LocalForage implements IProvider {
  private readonly DB_VERSION = 0.1;
  private readonly DB_DRIVER = localforage.INDEXEDDB;
  private readonly DB_TABLES = [ 'project', 'function', 'adjustment_factor', 'user' ];

  private data: any;

  constructor() {
    this.connect();
  }

  connect() {
    let config = {
      driver: this.DB_DRIVER,
      name: '',
      version: this.DB_VERSION,
      storeName: ''
    };

    this.DB_TABLES.forEach(current_table => {
      config.name = 'FPC_' + current_table;
      config.storeName = 'FPC_' + current_table;
      this.data[current_table] = localforage.createInstance(config);
    });
  }

  async disconnect(): Promise<void> {
    await localforage.clear();
  }

  async insert(table: string, data: any, key: string): Promise<void> {
    await this.data[table].setItem(key, data);
  }

  async update(table: string, data: any, search: any): Promise<void> {
    await this.data[table].setItem(search, data);
  }

  async delete(table: string, search: string): Promise<void> {
    await this.data[table].removeItem(search);
  }

  async select(table: string, search: string): Promise<any> {
    return await this.data[table].getItem(search);
  }
}
