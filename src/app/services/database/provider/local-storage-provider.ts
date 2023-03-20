import { IProvider } from './i-provider';

export class LocalStorageProvider implements IProvider {
  public connect(): void {
    throw new Error('Method not implemented.');
  }
  public disconnect(): void {
    localStorage.clear();
  }
  public insert(table: string, data: any): void {
    throw new Error('Method not implemented.');
  }
  public update(table: string, data: any, search: any): void {
    throw new Error('Method not implemented.');
  }
  public delete(table: string, search: any): void {
    throw new Error('Method not implemented.');
  }
  public select(table: string, search: any): any[] {
    throw new Error('Method not implemented.');
  }

  private encode(data: any): string {
    return "";
  }

  private decode(data: any): any {
    return "";
  }

}
