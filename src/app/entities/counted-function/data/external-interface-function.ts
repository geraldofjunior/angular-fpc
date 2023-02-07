import { Complexity } from 'src/app/enums/complexity';
import { FunctionType } from '../function-type';

export class ExternalInterfaceFunction extends FunctionType {

  constructor() {
    super();
    super.dataTypeRange = {
      low: 20,
      high: 50
    };
    super.elementaryTypeRange = {
      low: 2,
      high: 5
    }
  }

  public calculateContribution(complexity: Complexity): number {
    switch(complexity) {
      case Complexity.LOW: return 5;
      case Complexity.MEDIUM: return 7;
      case Complexity.HIGH: return 10;
    }
  }

}
