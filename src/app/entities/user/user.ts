import { IUser } from './i-user';

export class User implements IUser{
  private pricePerFP: number;
  private hoursPerFP: number;
  private FPPerStoryPoint: number;

  public constructor(pricePerFP: number = 0, hoursPerFP: number = 0, functionPointsPerStoryPoint: number = 0) {
    this.pricePerFP = pricePerFP;
    this.hoursPerFP = hoursPerFP;
    this.FPPerStoryPoint = functionPointsPerStoryPoint;
  }

  public setPricePerFP(price: number): any { this.pricePerFP = price; return this; }
  public setHoursPerFP(hours: number): any { this.hoursPerFP = hours; return this; }
  public setFunctionPointsPerStoryPoint(FPperSP: number): any { this.FPPerStoryPoint = FPperSP; return this; }


  public getPricePerFP(): number { return this.pricePerFP; }
  public getHoursPerFP(): number { return this.hoursPerFP; }
  public getFunctionPointsPerStoryPoint(): number { return this.FPPerStoryPoint; }

}
