import { Complexity } from './../../enums/complexity';

export interface ICountedFunction {
  setName(newName: string): void;
  setDataTypes(types: number): void;
  setElementaryTypes(types: number): void;
  getComplexity(): Complexity;
  getContribution(): number;
  getName(): string;
}
