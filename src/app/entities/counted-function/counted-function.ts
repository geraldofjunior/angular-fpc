import { Complexity } from 'src/app/enums/complexity';
import { IFunctionType } from './i-function-type';

export class CountedFunction {

  private functionType: IFunctionType;
  private name: string;
  private dataTypes: number;
  private elementaryTypes: number;
  private complexity: Complexity;
  private contribution: number;

  constructor(functionType: IFunctionType, name = "") {
    this.functionType = functionType;
    this.name = name.toString();
    this.dataTypes = 0;
    this.elementaryTypes = 0;
    this.contribution = 0;
    this.complexity = Complexity.LOW;
  }

  public setName(newName: string): CountedFunction {
    this.name = newName;
    return this;
  }

  public setDataTypes(types: number): CountedFunction {
    this.dataTypes = types < 0 ? 0 : types;
    this.calculate();
    return this;
  }

  public setElementaryTypes(types: number): CountedFunction {
    this.elementaryTypes = types < 0 ? 0 : types;
    this.calculate();
    return this;
  }

  private calculate(): CountedFunction {
    this.complexity = this.functionType.calculateComplexity(this.elementaryTypes, this.dataTypes)
    this.contribution = this.functionType.calculateContribution(this.complexity);
    return this;
  }

  public getComplexity(): Complexity {
    if (this.complexity === undefined) this.calculate();
    return this.complexity || 0;
  }

  public getComplexityName(): string {
    if (this.complexity === undefined) this.calculate();
    switch (this.complexity) {
      case Complexity.LOW: return "Low";
      case Complexity.MEDIUM: return "Medium";
      case Complexity.HIGH: return "High";
      default: return "Unset";
    }
  }

  public getContribution(): number {
    if (this.contribution === undefined) this.calculate();
    return this.contribution || 0;
  }

  public getFunctionTypeName(): string {
    switch (this.functionType.constructor.name) {
      case "InternalLogicalFile": return "Internal Logical File";
      case "ExternalInterfaceFunction": return "External Interface Function";
      case "ExternalInput": return "External Input";
      case "ExternalOutput": return "External Output";
      case "ExternalQuery": return "External Query";
      default: return "Not set";
    }
  }

  public getName(): string {
    return this.name;
  }

  public getDataTypes(): number {
    return this.dataTypes;
  }

  public getElementaryTypes(): number {
    return this.elementaryTypes;
  }
}
