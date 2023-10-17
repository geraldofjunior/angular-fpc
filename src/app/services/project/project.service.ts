import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
 }
