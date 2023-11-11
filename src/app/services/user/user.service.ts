import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from 'src/app/entities/user/user';

const OFFICE_HOURS = 8;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userConfig = new User();
  private userSubject = new BehaviorSubject<User>(this.userConfig);
  private priceSubject = new BehaviorSubject<number>(this.userConfig.getPricePerFP());
  private termSubject = new BehaviorSubject<number>(this.userConfig.getHoursPerFP());
  //private item$ = this.userConfigObservable.asObservable();

  public getConfig(): Observable<User> {
    return of(this.userConfig);
  }

  public updateUser(config: User) {
    this.userConfig
        .setHoursPerFP(config.getHoursPerFP())
        .setPricePerFP(config.getPricePerFP());
    this.priceSubject.next(this.userConfig.getPricePerFP());
    this.termSubject.next(this.userConfig.getHoursPerFP());
    this.userSubject.next(this.userConfig);
  }

  public updatePrice(newPrice: number): void {
    this.userConfig.setPricePerFP(newPrice);
    this.priceSubject.next(this.userConfig.getPricePerFP());
  }

  public updateTerm(newTerm: number): void {
    this.userConfig.setHoursPerFP(newTerm);
    this.termSubject.next(this.userConfig.getHoursPerFP());
  }

  public getPrice(): Observable<number> {
    return of(this.userConfig.getPricePerFP());
  }

  public getTerm(): Observable<number> {
    return of(this.userConfig.getHoursPerFP());
  }

  /**
   * @deprecated The method should not be used
   */
  public calculatePrice(functionPoints: number): Observable<number> {
    return of(functionPoints * this.userConfig.getPricePerFP());
  }

  /**
   * @deprecated The method should not be used
   */
  public calculateTerm(functionPoints: number): number {
    return (functionPoints * this.userConfig.getHoursPerFP()) / OFFICE_HOURS;
  }

  /**
   * @deprecated The method should not be used
   */
  public calculateScrumPoints(functionPoints: number) {
    const days = (functionPoints * this.userConfig.getHoursPerFP()) / OFFICE_HOURS;
    if (days <= 0.5) return 1;
    if (days <= 1) return 2;
    if (days <= 2) return 3;
    if (days <= 5) return 5;
    if (days <= 10) return 8;

    const points = [5, 8];
    let nextCheckpoint = 15;
    let scrumPoints = 13;
    while (days > nextCheckpoint) {
      scrumPoints = points[0] + points[1];
      points[0] = points[1];
      points[1] = scrumPoints;
      nextCheckpoint += 15;
    }
    return scrumPoints;
  }
}
