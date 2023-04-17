import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/entities/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private databaseService: DatabaseService) { }

  public getConfig(): Observable<User> {
    return of(new User());
  }
}
