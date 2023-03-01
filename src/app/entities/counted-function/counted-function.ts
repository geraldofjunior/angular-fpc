import { Complexity } from 'src/app/enums/complexity';
import { AdjustmentFactor } from '../adjustment-factor/adjustment-factor';
import { IAdjustmentFactor } from '../adjustment-factor/i-adjustment-factor';
import { IFunctionType } from './i-function-type';
// The context class
export class CountedFunction {

  private functionType: IFunctionType;
  public adjustmentFactors: IAdjustmentFactor;
  private name: string;
  private dataTypes?: number;
  private elementaryTypes?: number;
  private complexity?: Complexity;
  private contribution?: number;

  constructor(functionType: IFunctionType, name: string) {
    this.functionType = functionType;
    this.adjustmentFactors = new AdjustmentFactor();
    this.name = name;
  }

  public setName(newName: string): void {
    this.name = newName;
  }

  public setDataTypes(types: number): void {
    this.dataTypes = types < 0 ? 0 : types;
    this.calculate();
  }

  public setElementaryTypes(types: number): void {
    this.elementaryTypes = types < 0 ? 0 : types;
    this.calculate();
  }

  private calculate(): void {
    if (this.elementaryTypes !== undefined && this.dataTypes !== undefined) {
      this.complexity = this.functionType.calculateComplexity(this.elementaryTypes, this.dataTypes)
      this.contribution = this.functionType.calculateContribution(this.complexity);
    } else {
      this.complexity = Complexity.LOW;
      this.contribution = 0;
    }
  }

  public getComplexity(): Complexity {
    if (this.complexity === undefined) this.calculate();
    return this.complexity!;
  }

  public getContribution(): number {
    if (this.contribution === undefined) this.calculate();
    return this.contribution!;
  }

  public getName(): string {
    return this.name;
  }
}
