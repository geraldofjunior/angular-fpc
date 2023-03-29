export interface IProvider {
  connect(): void;
  disconnect(): void;
  insert(table: string, data: any, key: string): Promise<void>;
  update(table: string, data: any, search: any): Promise<void>;
  delete(table: string, search: string): Promise<void>;
  select(table: string, search: string): Promise<any>;
}
