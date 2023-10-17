export class User {
  private pricePerFP: number;
  private hoursPerFP: number;
  private FPPerStoryPoint: number;

  public constructor(pricePerFP = 0, hoursPerFP = 0, functionPointsPerStoryPoint = 0) {
    this.pricePerFP = pricePerFP;
    this.hoursPerFP = hoursPerFP;
    this.FPPerStoryPoint = functionPointsPerStoryPoint;
  }

  public setPricePerFP(price: number): User { this.pricePerFP = price; return this; }
  public setHoursPerFP(hours: number): User { this.hoursPerFP = hours; return this; }
  public setFunctionPointsPerStoryPoint(FPperSP: number): User { this.FPPerStoryPoint = FPperSP; return this; }


  public getPricePerFP(): number { return this.pricePerFP; }
  public getHoursPerFP(): number { return this.hoursPerFP; }
  public getFunctionPointsPerStoryPoint(): number { return this.FPPerStoryPoint; }

}
