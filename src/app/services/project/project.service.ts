import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CountedFunction } from 'src/app/entities/counted-function/counted-function';
import { ExternalQuery } from 'src/app/entities/counted-function/transaction/external-query';
import { CountedProject } from 'src/app/entities/counted-project/counted-project';
import { ProjectType } from 'src/app/enums/project-type';

const DEFAULTS = {
  NAME: "Default Function",
  TYPE: ProjectType.DEVELOPMENT,
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private project = new CountedProject(DEFAULTS.TYPE, DEFAULTS.NAME);

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
}
