export interface IProvider {
  connect(): void;
  disconnect(): void;
  insert(table: string, data: any): Promise<void>;
  update(table: string, data: any, search: any): Promise<void>;
  delete(table: string, search: any): Promise<void>;
  select(table: string, search: any): Promise<Array<any>>;
}
