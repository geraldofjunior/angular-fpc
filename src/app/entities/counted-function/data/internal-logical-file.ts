import { ICountedFunction } from '../i-counted-function';
import { IFunctionType } from './../i-function-type';

export class InternalLogicalFile implements IFunctionType{
  calculate(functionCounted: ICountedFunction): number {
    throw new Error('Method not implemented.');
  }
}
