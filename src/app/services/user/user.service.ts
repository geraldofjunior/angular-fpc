import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/entities/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userConfig = new User();
  private userSubject = new BehaviorSubject<User>(this.userConfig);
  private priceSubject = new BehaviorSubject<number>(this.userConfig.getPricePerFP());
  private termSubject = new BehaviorSubject<number>(this.userConfig.getHoursPerFP());

  public getConfig(): Observable<User> {
    return this.userSubject.asObservable();
  }

  public updateUser(config: User): void {
    this.userConfig
        .setHoursPerFP(config.getHoursPerFP())
        .setPricePerFP(config.getPricePerFP());
    this.notifyAll();
  }

  public updatePrice(newPrice: number): void {
    this.userConfig.setPricePerFP(newPrice);
    this.notifyAll();
  }

  public updateTerm(newTerm: number): void {
    this.userConfig.setHoursPerFP(newTerm);
    this.notifyAll();
  }

  public getPrice(): Observable<number> {
    return this.priceSubject.asObservable();
  }

  public getDays(): Observable<number> {
    return this.termSubject.asObservable();
  }

  private notifyAll() : void {
    this.priceSubject.next(this.userConfig.getPricePerFP());
    this.termSubject.next(this.userConfig.getHoursPerFP());
    this.userSubject.next(this.userConfig);
  }
}
