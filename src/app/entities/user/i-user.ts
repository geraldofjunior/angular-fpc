export interface IUser {
  setPricePerFP(price: number): any;
  setHoursPerFP(hours: number): any;

  getPricePerFP(): number;
  getHoursPerFP(): number;
}
