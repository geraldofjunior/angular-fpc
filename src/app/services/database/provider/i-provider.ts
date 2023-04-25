export interface IProvider {
  connect(): void;
  disconnect(): void;
  insert(table: string, data: any, key: string): void;
  update(table: string, data: any, search: Object): void;
  delete(table: string, search: Object): void;
  select(table: string, search: Object): Promise<any>;
}
