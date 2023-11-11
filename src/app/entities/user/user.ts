export class User {
  private pricePerFP: number;
  private hoursPerFP: number;

  public constructor(pricePerFP = 1, hoursPerFP = 1) {
    this.pricePerFP = pricePerFP;
    this.hoursPerFP = hoursPerFP;
  }

  public setPricePerFP(price: number): User { this.pricePerFP = price; return this; }
  public setHoursPerFP(hours: number): User { this.hoursPerFP = hours; return this; }


  public getPricePerFP(): number { return this.pricePerFP; }
  public getHoursPerFP(): number { return this.hoursPerFP; }

}
