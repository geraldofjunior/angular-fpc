import { Complexity } from 'src/app/enums/complexity';

export interface IFunctionType {
  calculateComplexity(elementaryTypes: number, dataTypes: number): Complexity;
  calculateContribution(complexity: Complexity): number;
}
