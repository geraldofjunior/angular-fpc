import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountedFunction } from 'src/app/entities/counted-function/counted-function';
import { InternalLogicalFile } from 'src/app/entities/counted-function/data/internal-logical-file';
import { CountedProject } from 'src/app/entities/counted-project/counted-project';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-calculator-project',
  templateUrl: './calculator-project.component.html',
  styleUrls: ['./calculator-project.component.css']
})
export class CalculatorProjectComponent implements OnInit {

  private projectData!: CountedProject;
  public functionList = new Array<CountedFunction>();
  public points: number;
  public days: number;

  constructor(private service: ProjectService) {
    this.points = 0;
    this.days = 0;
  }

  public projectForm = new FormGroup({
    projectName: new FormControl<string>("", Validators.required),
    projectType: new FormControl<string>("", Validators.required)
  });

  public save(): void {
    if (this.projectForm.invalid) return;
    this.projectData.setProjectName(this.projectForm.value.projectName ? this.projectForm.value.projectName : "");
    this.projectData.setProjectType(this.projectForm.value.projectType ? this.projectForm.value.projectType : "");
    this.service.saveProjectData(this.projectData);
  }

  public refreshList(): void {
    this.functionList = this.projectData.getAllFunctions();
  }

  public ngOnInit(): void {
    this.service.getProjectData().subscribe(data => {
      this.projectData = data;
      this.projectForm.value.projectName = this.projectData.getProjectName();
      this.projectForm.value.projectType = this.projectData.getProjectType();
    });

    // Create some dummy objects to be modelled
    for(let i = 1; i <= 5; i++) {
      const dummyFunction = new CountedFunction(new InternalLogicalFile(), "Dummy function No. " + i );
      dummyFunction.setDataTypes(i*5).setElementaryTypes(i);
      this.functionList.push(dummyFunction);
      this.projectData.addFunction(dummyFunction);
      this.points += dummyFunction.getContribution();
    }
    this.days = this.points / 8;
    this.service.saveProjectData(this.projectData);
  }

  private updateFunctionList() {
    this.functionList = this.projectData.getAllFunctions();
    this.points = this.projectData.calculatePoints();
    this.days = this.points / 8;
  }

  public deleteFunction(functionToBeDeleted: CountedFunction) {
    return;
  }

  public editFunction(functionToBeUpdated: CountedFunction) {
    // TODO: show form and send data to fill it
  }
}
