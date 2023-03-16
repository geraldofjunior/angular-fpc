import { IFunctionType } from './i-function-type';
import { Complexity } from 'src/app/enums/complexity';

export abstract class FunctionType implements IFunctionType {
  protected dataTypeRange = { low: 25, high: 50 }
  protected elementaryTypeRange = { low: 2, high: 5 };

  public calculateComplexity(elementaryTypes: number, dataTypes: number): Complexity {
    if (elementaryTypes < this.elementaryTypeRange.low) {

      if (dataTypes > this.dataTypeRange.high )
        return Complexity.MEDIUM;
      else
        return Complexity.LOW;

    } else if (elementaryTypes > this.elementaryTypeRange.high) {

      if (dataTypes > this.dataTypeRange.high)
        return Complexity.HIGH;
      else
        return Complexity.MEDIUM;

    } else {

      if (dataTypes > this.dataTypeRange.high)
        return Complexity.HIGH;
      else if(dataTypes < this.dataTypeRange.low)
        return Complexity.LOW;
      else
        return Complexity.MEDIUM;

    }
  }

  public abstract calculateContribution(complexity: Complexity): number;

}
