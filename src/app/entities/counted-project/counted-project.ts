import { AdjustmentFactor } from './../adjustment-factor/adjustment-factor';
import { IAdjustmentFactor } from '../adjustment-factor/i-adjustment-factor';
import { CountedFunction } from '../counted-function/counted-function';
import { ProjectType } from './../../enums/project-type';
import { InfluenceType } from 'src/app/enums/influence-type';

export class CountedProject {
  public setProjectType(projectType: string): CountedProject {
    switch (projectType) {
      case "APP": this.projectType = ProjectType.APPLICATION; break;
      case "DEV": this.projectType = ProjectType.DEVELOPMENT; break;
      case "ENH": this.projectType = ProjectType.ENHANCMENT;  break;
    }
    return this;
  }
  public getProjectType(): string {
    return this.projectName;
  }
  private functions: Array<CountedFunction> = new Array<CountedFunction>();
  private adjustmentFactors: IAdjustmentFactor = new AdjustmentFactor();
  private projectName: string;

  constructor(private projectType: ProjectType, projectName: string) {
    this.projectName = projectName;
    this.projectType = projectType;
  }

  public getProjectName(): string { return this.projectName; }
  public setProjectName(newName: string): CountedProject {
    this.projectName = newName;
    return this;
  }

  public addFunction(newFunction: CountedFunction): CountedProject {
    // Prevents duplicated names
    if (this.functions.find(obj => obj.getName() === newFunction.getName())) return this;
    this.functions.push(newFunction);
    return this;
  }
  public findFunction(functionName: string): CountedFunction | undefined {
    return this.functions.find(
      (currentFunction) => {
        currentFunction.getName() === functionName
      }
    );
  }
  private findFunctionIndex(functionName: string): number {
    return this.functions.findIndex(
      (currentFunction) => {
        currentFunction.getName() === functionName
      }
    );
  }
  public updateFunction(functionName: string, newData: CountedFunction): CountedProject {
    const index = this.findFunctionIndex(functionName);
    if  (index < 0) return this;

    this.functions[index] = newData;
    return this;
  }
  public removeFunction(functionName: string): CountedProject {
    const index = this.findFunctionIndex(functionName);
    if  (index < 0) return this;

    this.functions.splice(index, 1);
    return this;
  }
  public getAllFunctions(): Array<CountedFunction> { return this.functions; }

  public addAdjustmentFactor(type: InfluenceType, value: number): CountedProject { this.adjustmentFactors.addInfluence(type, value); return this; }
  public updateAdjustmentFactor(type: InfluenceType, value: number): CountedProject { this.adjustmentFactors.updateInfluence(type, value); return this; }
  public removeAdjustmentFactor(type: InfluenceType): CountedProject { this.adjustmentFactors.removeInfluence(type); return this; }

  // It calculates the function points before adjustment valuess is taken into account.
  public calculatePoints() {
    let grossPoints = 0;
    this.functions.forEach((currentFunction: CountedFunction) => { grossPoints += currentFunction.getContribution(); });

    return grossPoints * this.adjustmentFactors.calculate();
  }


}
