import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/entities/user/user';

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
}
