import { IUser } from './i-user';

export class User implements IUser{
  private pricePerFP: number;
  private hoursPerFP: number;
  private FPPerStoryPoint: number;

  public constructor(pricePerFP = 0, hoursPerFP = 0, functionPointsPerStoryPoint = 0) {
    this.pricePerFP = pricePerFP;
    this.hoursPerFP = hoursPerFP;
    this.FPPerStoryPoint = functionPointsPerStoryPoint;
  }

  public setPricePerFP(price: number): void { this.pricePerFP = price; }
  public setHoursPerFP(hours: number): void { this.hoursPerFP = hours; }
  public setFunctionPointsPerStoryPoint(FPperSP: number): void { this.FPPerStoryPoint = FPperSP; }


  public getPricePerFP(): number { return this.pricePerFP; }
  public getHoursPerFP(): number { return this.hoursPerFP; }
  public getFunctionPointsPerStoryPoint(): number { return this.FPPerStoryPoint; }

}
