import { Complexity } from 'src/app/enums/complexity';
import { FunctionType } from '../function-type';

export class ExternalOutput extends FunctionType {

  constructor() {
    super();
    super.dataTypeRange = {
      low: 6,
      high: 19
    };
    super.elementaryTypeRange = {
      low: 2,
      high: 3
    }
  }

  public calculateContribution(complexity: Complexity): number {
    switch(complexity) {
      case Complexity.LOW: return 4;
      case Complexity.MEDIUM: return 5;
      case Complexity.HIGH: return 7;
    }
  }
}
