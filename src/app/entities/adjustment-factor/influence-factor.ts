import { InfluenceType } from "src/app/enums/influence-type";

export class InfluenceFactor {
    private influenceType!: InfluenceType;
    private influenceValue!: number;
    private influenceName!: string;

    constructor(influenceType: InfluenceType, influenceValue: number) {
      this.setInfluenceType(influenceType);
      this.setInfluenceValue(influenceValue);
    }

    public getInfluenceType  = (): InfluenceType => this.influenceType;
    public getInfluenceName  = (): string => this.influenceName;
    public getInfluenceValue = ():number => this.influenceValue;

    public setInfluenceValue = (newValue: number): InfluenceFactor => {
      if (newValue > 5) this.influenceValue = 5;
      else if (newValue < 0) this.influenceValue = 0;
      else this.influenceValue = newValue;
      return this;
    }

    public setInfluenceType(newType: InfluenceType): InfluenceFactor {
      this.influenceType = newType;
      this.setInfluenceName(newType);
      return this;
    }

    private setInfluenceName(newType: InfluenceType): void {
      const index = Object.keys(InfluenceType).findIndex( current => current === newType.toString());
      this.influenceName = Object.values(InfluenceType)[index];
    }
}
