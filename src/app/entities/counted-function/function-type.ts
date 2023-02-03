import { ICountedFunction } from './i-counted-function';
export class FunctionType implements ICountedFunction {
  calculate(): number {
    throw new Error('Method not implemented.');
  }
}
