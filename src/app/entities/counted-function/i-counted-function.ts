import { Complexity } from './../../enums/complexity';

export interface ICountedFunction {
  calculateComplexity(elementaryTypes: number, dataTypes: number): Complexity;
  calculateContribution(complexity: Complexity): number;
}
