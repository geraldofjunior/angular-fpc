import { AdjustmentFactor } from './../adjustment-factor/adjustment-factor';
import { CountedFunction } from '../counted-function/counted-function';
import { ProjectType } from './../../enums/project-type';
import { InfluenceType } from 'src/app/enums/influence-type';
import { InfluenceFactor } from '../adjustment-factor/influence-factor';

const OFFICE_HOURS = 8;

export class CountedProject {
  private functions: Array<CountedFunction> = new Array<CountedFunction>();
  private adjustmentFactors: AdjustmentFactor = new AdjustmentFactor();
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

  public setProjectType(projectType: number): CountedProject {
    if (projectType < 0 || projectType > 2) return this;
    this.projectType = projectType as ProjectType;
    return this;
  }
  public getProjectType(): ProjectType {
    return this.projectType;
  }

  public addFunction(newFunction: CountedFunction): CountedProject {
    if (this.functions.find(obj => obj.getName() === newFunction.getName())) return this;
    this.functions.push(newFunction);
    return this;
  }
  public findFunction(functionName: string): CountedFunction | undefined {
    const found = this.functions.find(item => item.getName() === functionName);
    return found;
  }
  private findFunctionIndex(functionName: string): number {
    const found = this.functions.findIndex(item => item.getName() === functionName);
    return found;
  }
  public updateFunction(functionName: string, newData: CountedFunction): CountedProject {
    const index = this.findFunctionIndex(functionName);
    if  (index < 0) return this;

    this.functions[index] = newData;
    return this;
  }
  public getFunction(id: number): CountedFunction {
    if (id < 0 || id >= this.functions.length) throw new Error("Invalid ID");
    return this.functions[id];
  }
  public searchFunction(functionName: string): CountedFunction {
    if(!functionName) throw new Error("Looking for no function");
    const functionFound = this.findFunction(functionName);
    if (!functionFound) throw new Error("Function not found");
    return functionFound;
  }
  public removeFunction(functionName: string): CountedProject {
    const index = this.findFunctionIndex(functionName);
    if  (index < 0) return this;

    this.functions.splice(index, 1);
    return this;
  }
  public getAllFunctions(): CountedFunction[] { return this.functions; }

  public updateAdjustmentFactor(type: InfluenceType, value: number): CountedProject {
    this.adjustmentFactors.updateInfluence(type, value);
    return this;
  }

  public getAllInfluences(): InfluenceFactor[] {
    return this.adjustmentFactors.getAllInfluenceFactors();
  }

  public calculatePoints() {
    let grossPoints = 0;
    this.functions.forEach((currentFunction: CountedFunction) => {
      grossPoints += currentFunction.getContribution();
    });

    return grossPoints * this.adjustmentFactors.calculate();
  }

  public calculateProjectTerm(hoursPerPoint: number) {
    const functionPoints = this.calculatePoints();
    return (functionPoints * hoursPerPoint) / OFFICE_HOURS;
  }

  public calculateProjectPrice(costPerPoint: number) {
    const functionPoints = this.calculatePoints();
    return functionPoints * costPerPoint;
  }

  public calculateScrumPoints(hoursPerPoint: number) {
    const days = this.calculateProjectTerm(hoursPerPoint);
    if (days <= 0.5) return 1;
    if (days <= 1) return 2;
    if (days <= 2) return 3;
    if (days <= 5) return 5;
    if (days <= 10) return 8;
    const points = [5, 8];
    let nextCheckpoint = 15;
    let scrumPoints = 13;
    while (days > nextCheckpoint) {
      scrumPoints = points[0] + points[1];
      points[0] = points[1];
      points[1] = scrumPoints;
      nextCheckpoint += 15;
    }
    return scrumPoints;
  }

}
