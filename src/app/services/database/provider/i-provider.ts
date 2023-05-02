export interface IProvider {
  connect(): void;
  disconnect(): void;
  insert(table: string, data: any, key: string): void;
  update(table: string, data: any, search: any): void;
  delete(table: string, search: any): void;
  select(table: string, search: any): Promise<any>;
}
