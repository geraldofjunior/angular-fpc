import { ICountedFunction } from './i-counted-function';

export interface IFunctionType {
  calculate(functionCounted: ICountedFunction): number;
}
