import { Injectable } from '@angular/core';
import { DatabaseService } from '../database/database.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/entities/user/user';
import { IUser } from 'src/app/entities/user/i-user';

/* A quick note here: the ID of the current user will always be 1.

   It's because this calculator doesn't support multiple users. It's intentional. I see no need to create a extra form with a
   extra complexity for a calculator that will be ran locally to begin with. That's why I also decided to use localForage to
   persist data, since I see no need to keep data on a server. That also helps to make this calculator cheaper to develop. But,
   in case of need, it's just write another provider and configure the system to use it.
*/

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private databaseService: DatabaseService) { }

  public async getConfig(): Promise<Observable<IUser>> {
    return of(await this.databaseService.read("user", { id: "1" }));
  }

  public saveConfig(data: IUser): void {
    this.databaseService.write('user', data, '1');
  }
}
