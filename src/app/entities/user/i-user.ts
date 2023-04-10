export interface IUser {
  setPricePerFP(price: number): void;
  setHoursPerFP(hours: number): void;
  setFunctionPointsPerStoryPoint(FPperSP: number): void;

  getPricePerFP(): number;
  getHoursPerFP(): number;
  getFunctionPointsPerStoryPoint(): number;
}
