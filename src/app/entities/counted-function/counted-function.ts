import { IFunctionType } from './i-function-type';
// The context class
export class CountedFunction {

  private functionType: IFunctionType; // the strategy

  constructor(functionType: IFunctionType) {
    this.functionType = functionType;
  }

  public calculate(): number {
    return this.functionType.calculate(this);
  }
}
