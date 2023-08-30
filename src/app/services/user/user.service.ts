import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/entities/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public getConfig(): Observable<User> {
    return of(new User());
  }
}
