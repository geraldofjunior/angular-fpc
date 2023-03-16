import { AdjustmentFactor } from './../adjustment-factor/adjustment-factor';
import { IAdjustmentFactor } from '../adjustment-factor/i-adjustment-factor';
import { ICountedFunction } from '../counted-function/i-counted-function';
import { ProjectType } from './../../enums/project-type';
import { InfluenceType } from 'src/app/enums/influence-type';

export class CountedProject {
  private functions: Array<ICountedFunction> = new Array<ICountedFunction>();
  private adjustmentFactors: IAdjustmentFactor = new AdjustmentFactor();

  constructor(private projectType: ProjectType, projectName: string) {}

  public addFunction(newFunction: ICountedFunction):void { this.functions.push(newFunction); }
  public findFunction(functionName: string): ICountedFunction | undefined {
    return this.functions.find( (currentFunction) => { currentFunction.getName() === functionName } )
  }
  private findFunctionIndex(functionName: string): number {
    return this.functions.findIndex( (currentFunction) => { currentFunction.getName() === functionName } )
  }
  public updateFunction(functionName: string, newData: ICountedFunction): void {
    const index = this.findFunctionIndex(functionName);
    if  (index < 0) return;

    this.functions[index] = newData;
  }
  public removeFunction(functionName: string): void {
    const index = this.findFunctionIndex(functionName);
    if  (index < 0) return;

    this.functions.splice(index, 1);
  }
  public getFunctions(): Array<ICountedFunction> { return this.functions; }

  public addAdjustmentFactor(type: InfluenceType, value: number): void { this.adjustmentFactors.addInfluence(type, value); }
  public updateAdjustmentFactor(type: InfluenceType, value: number): void { this.adjustmentFactors.updateInfluence(type, value); }
  public removeAdjustmentFactor(type: InfluenceType): void { this.adjustmentFactors.removeInfluence(type); }

  // It calculates the function points before adjustment valuess is taken into account.
  public calculatePoints() {
    let grossPoints = 0;
    this.functions.forEach((currentFunction: ICountedFunction) => { grossPoints += currentFunction.getContribution(); });

    return grossPoints * this.adjustmentFactors.calculate();
  }


}
