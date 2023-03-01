import { InfluenceType } from "src/app/enums/influence-type";

export class InfluenceFactor {
    private influenceType: InfluenceType;
    private influenceValue: number;

    constructor(influenceType: InfluenceType, influenceValue: number) {
      this.influenceType = influenceType;
      this.influenceValue = influenceValue;
    }

    public getInfluenceType = ():InfluenceType => this.influenceType;
    public getInfluenceValue = ():number => this.influenceValue;

    public setInfluenceValue = (newValue: number): void => {
      if (newValue > 5) this.influenceValue = 5;
      else if (newValue < 1) this.influenceValue = 1;
      else this.influenceValue = newValue;
    }
}
