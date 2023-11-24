import { InfluenceType } from "src/app/enums/influence-type";
import { InfluenceFactor } from "./influence-factor";

export class AdjustmentFactor {
  private influenceFactor: Array<InfluenceFactor>;

  constructor() {
    this.influenceFactor = new Array<InfluenceFactor>();
    this.addInfluences();
  }

  private addInfluence(type: InfluenceType, value: number): void {
    if (this.findAnInfluence(type) !== -1) return;

    const newFactor = new InfluenceFactor(type, value);
    this.influenceFactor.push(newFactor);
  }

  public getAllInfluenceFactors(): InfluenceFactor[] {
    return this.influenceFactor;
  }

  public updateInfluence(type: InfluenceType, newValue: number): void {
    if (newValue < 0 && newValue > 5) return;
    const toUpdate = this.findAnInfluence(type);
    this.influenceFactor[toUpdate].setInfluenceValue(newValue);
  }

  public calculate(): number {
    if (this.influenceFactor.length === 0)
      return 1;

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

  private addInfluences() {
    for (const type in InfluenceType) {
      this.addInfluence(type as InfluenceType, 0);
    }
  }
}
