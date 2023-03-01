import { InfluenceType } from "src/app/enums/influence-type";

export interface IAdjustmentFactor {
  addInfluence(type: InfluenceType, value: number): void;
  removeInfluence(type: InfluenceType): void;
  updateInfluence(type: InfluenceType, newValue: number): void;
  calculate(): number;
}
