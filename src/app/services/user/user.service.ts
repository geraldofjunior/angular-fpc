import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/entities/user/user';

const OFFICE_HOURS = 8;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userConfig = new User();

  public getConfig(): Observable<User> {
    return of(this.userConfig);
  }

  public updateUser(config: User) {
    this.userConfig.setHoursPerFP(config.getHoursPerFP())
        .setPricePerFP(config.getPricePerFP())
        .setFunctionPointsPerStoryPoint(config.getFunctionPointsPerStoryPoint());
  }

  public calculatePrice(functionPoints: number): Observable<number> {
    return of(functionPoints * this.userConfig.getPricePerFP());
  }

  public calculateTerm(functionPoints: number): Observable<number> {
    return of((functionPoints * this.userConfig.getHoursPerFP()) / OFFICE_HOURS);
  }

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
