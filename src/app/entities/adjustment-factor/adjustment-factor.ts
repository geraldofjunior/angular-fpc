import { InfluenceType } from "src/app/enums/influence-type";
import { IAdjustmentFactor } from "./i-adjustment-factor";
import { InfluenceFactor } from "./influence-factor";

export class AdjustmentFactor implements IAdjustmentFactor{
  private influenceFactor: Array<InfluenceFactor>;

  constructor() {
    this.influenceFactor = new Array<InfluenceFactor>();
  }

  public addInfluence(type: InfluenceType, value: number): void {
    if (this.findAnInfluence(type) !== -1) return;

    let newFactor = new InfluenceFactor(type, value);
    this.influenceFactor.push(newFactor);
  }

  public removeInfluence(type: InfluenceType): void {
    const toRemove = this.findAnInfluence(type);
    if (toRemove === -1) return;

    this.influenceFactor.splice(toRemove, 1);
  }

  public updateInfluence(type: InfluenceType, newValue: number): void {
    const toUpdate = this.findAnInfluence(type);
    this.influenceFactor[toUpdate].setInfluenceValue(newValue);
  }

  public calculate(): number {
    if (this.influenceFactor.length === 0)
      return 0;

    let sum = 0;

    this.influenceFactor.forEach(factor => {
      sum += factor.getInfluenceValue();
    });

    return (sum * 0.01) + 0.65;
  }

  private findAnInfluence(type: InfluenceType): number {
    return this.influenceFactor.findIndex( factor => {
      if (factor.getInfluenceType() === type)
        return true;
      return false;
    });
  }
}
