import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CountedFunction } from 'src/app/entities/counted-function/counted-function';
import { ExternalQuery } from 'src/app/entities/counted-function/transaction/external-query';
import { CountedProject } from 'src/app/entities/counted-project/counted-project';
import { ProjectType } from 'src/app/enums/project-type';
import { UserService } from '../user/user.service';
import { User } from 'src/app/entities/user/user';
import { AdjustmentFactor } from 'src/app/entities/adjustment-factor/adjustment-factor';
import { InfluenceFactor } from 'src/app/entities/adjustment-factor/influence-factor';
import { InfluenceType } from 'src/app/enums/influence-type';

const DEFAULTS = {
  NAME: "Default Function",
  TYPE: ProjectType.DEVELOPMENT,
  OFFICE_HOURS: 8
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private project = new CountedProject(DEFAULTS.TYPE, DEFAULTS.NAME);
  private userConfig!: User;
  private functionSubject: BehaviorSubject<CountedFunction[]>;
  private pointsSubject:BehaviorSubject<number>;
  private daysSubject: BehaviorSubject<number>;
  private priceSubject: BehaviorSubject<number>;
  private influenceSubject: BehaviorSubject<InfluenceFactor[]>

  constructor(private userService: UserService) {
    this.functionSubject = new BehaviorSubject<CountedFunction[]>(this.project.getAllFunctions());
    this.pointsSubject = new BehaviorSubject<number>(this.project.calculatePoints());
    this.daysSubject = new BehaviorSubject<number>(this.project.calculateProjectTerm(1));
    this.priceSubject = new BehaviorSubject<number>(this.project.calculateProjectPrice(1));
    this.influenceSubject = new BehaviorSubject<InfluenceFactor[]>(this.project.getAllInfluences());

    this.userService.getConfig().subscribe( currentConfig => {
      this.userConfig = currentConfig;
      this.notifyAll();
    } );
  }

  public getProjectData(): Observable<CountedProject> {
    return of(this.project);
  }

  public saveProjectData(newData: CountedProject): void {
    this.project = newData;
    this.notifyAll();
  }

  public addFunction(newFunction: CountedFunction): void {
    this.project.addFunction(newFunction);
    this.notifyAll();
  }

  public editFunction(functionName: string, newData: CountedFunction): void {
    this.project.updateFunction(functionName, newData);
    this.notifyAll();
  }

  public deleteFunction(functionName: string): void {
    this.project.removeFunction(functionName);
    this.notifyAll();
  }

  public getFunction(functionName: string): CountedFunction {
    let functionFound: CountedFunction;
    try {
      functionFound = this.project.findFunction(functionName) || new CountedFunction(new ExternalQuery());
    } catch (error) {
      return new CountedFunction(new ExternalQuery());
    }
    return functionFound;
  }

  public getAllFunctions(): Observable<Array<CountedFunction>> {
    return this.functionSubject.asObservable();
  }

  public getPoints(): Observable<number> {
    return this.pointsSubject.asObservable();
  }

  public getDays(): Observable<number> {
   return this.daysSubject.asObservable();
  }

  public getPrice(): Observable<number> {
    return this.priceSubject.asObservable();
  }

  public getInfluences(): Observable<InfluenceFactor[]> {
    return this.influenceSubject.asObservable();
  }

  public updateInfluence(influenceType: InfluenceType, newValue: number): void {
    this.project.updateAdjustmentFactor(influenceType, newValue);
    this.notifyAll();
  }

  private notifyAll(): void {
    this.functionSubject.next(this.project.getAllFunctions());
    this.pointsSubject.next(this.project.calculatePoints());
    this.daysSubject.next(this.project.calculateProjectTerm(this.userConfig.getHoursPerFP()));
    this.priceSubject.next(this.project.calculateProjectPrice(this.userConfig.getPricePerFP()));
    this.influenceSubject.next(this.project.getAllInfluences());
  }
}
