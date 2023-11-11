import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CountedFunction } from 'src/app/entities/counted-function/counted-function';
import { ExternalQuery } from 'src/app/entities/counted-function/transaction/external-query';
import { CountedProject } from 'src/app/entities/counted-project/counted-project';
import { ProjectType } from 'src/app/enums/project-type';
import { UserService } from '../user/user.service';
import { User } from 'src/app/entities/user/user';

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
  private configuratedTerm = 0;

  constructor(private userService: UserService) {
    this.userService.getConfig().subscribe( currentConfig => this.userConfig = currentConfig );
    this.userService.getTerm().subscribe( newValue => this.configuratedTerm = newValue );
  }

  public getProjectData(): Observable<CountedProject> {
    return of(this.project);
  }

  public saveProjectData(newData: CountedProject): void {
    this.project = newData;

  }

  public addFunction(newFunction: CountedFunction): void {
    this.project.addFunction(newFunction);
  }

  public editFunction(functionName: string, newData: CountedFunction): void {
    this.project.updateFunction(functionName, newData);
  }

  public deleteFunction(functionName: string): void {
    this.project.removeFunction(functionName);
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
    return of(this.project.getAllFunctions());
  }

  public getPoints(): Observable<number> {
    return of(this.project.calculatePoints());
  }

  public getDays(): Observable<number> {
    const functionPoints = this.project.calculatePoints();
    return of((functionPoints * this.configuratedTerm) / DEFAULTS.OFFICE_HOURS);
  }

  public getPrice(): Observable<number> {
    const functionPoints = this.project.calculatePoints();
    return of(functionPoints * this.userConfig.getPricePerFP());
  }

  private updateDays() {
    this.configuratedTerm
  }

  public getScrumPoints(): Observable<number> {
    let scrumPoints = 0;
    const functionPoints = this.project.calculatePoints();
    const days = (functionPoints * this.userConfig.getHoursPerFP()) / DEFAULTS.OFFICE_HOURS;
    if (days <= 0.5) return of(1);
    if (days <= 1) return of(2);
    if (days <= 2) return of(3);
    if (days <= 5) return of(5);
    if (days <= 10) return of(8);
    const points = [5, 8];
    let nextCheckpoint = 15;
    scrumPoints = 13;
    while (days > nextCheckpoint) {
      scrumPoints = points[0] + points[1];
      points[0] = points[1];
      points[1] = scrumPoints;
      nextCheckpoint += 15;
    }
    return of(scrumPoints);
  }
}
