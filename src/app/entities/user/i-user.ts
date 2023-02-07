export interface IUser {
  setPricePerFP(price: number): any;
  setHoursPerFP(hours: number): any;
  setFunctionPointsPerStoryPoint(FPperSP: number): any

  getPricePerFP(): number;
  getHoursPerFP(): number;
  getFunctionPointsPerStoryPoint(): number;
}
