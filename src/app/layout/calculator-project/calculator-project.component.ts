import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CountedFunction } from 'src/app/entities/counted-function/counted-function';
import { InternalLogicalFile } from 'src/app/entities/counted-function/data/internal-logical-file';
import { CountedProject } from 'src/app/entities/counted-project/counted-project';
import { ProjectService } from 'src/app/services/project/project.service';
import { CalculatorFunctionComponent } from '../calculator-function/calculator-function.component';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-calculator-project',
  templateUrl: './calculator-project.component.html',
  styleUrls: ['./calculator-project.component.css']
})
export class CalculatorProjectComponent implements OnInit {

  private projectData!: CountedProject;
  public projectForm!: FormGroup;
  public functionList = new Array<CountedFunction>();
  public points: number;
  public days: number;
  public price: number;

  constructor(private service: ProjectService,
              private configService: UserService,
              public functionDialog: MatDialog) {
    this.points = 0;
    this.days = 0;
    this.price = 0;
  }

  public ngOnInit(): void {
    this.service.getProjectData().subscribe( data => this.projectData = data );
    this.service.getAllFunctions().subscribe( functions => this.functionList = functions );
    this.service.getPoints().subscribe( calculated => this.points = calculated );
    this.configService.calculatePrice(this.points).subscribe( data => this.price = data);
    this.configService.calculateTerm(this.points).subscribe( data => this.days = data );

    this.createDummyData();
    this.service.saveProjectData(this.projectData);

    this.projectForm = new FormGroup({
      projectName: new FormControl<string>(this.projectData.getProjectName() || "", Validators.required),
      projectType: new FormControl<string>(this.projectData.getProjectType().toString() || "", Validators.required)
    });
  }

  public save(): void {
    if (this.projectForm.invalid) return;
    this.projectData.setProjectName(this.projectForm.value.projectName ? this.projectForm.value.projectName : "");
    this.projectData.setProjectType(this.projectForm.value.projectType ? this.projectForm.value.projectType : "");
    this.service.saveProjectData(this.projectData);
  }

  public refreshList(): void {
    this.functionList = this.projectData.getAllFunctions();
  }

  private updateFunctionList(): void {
    this.functionList = this.projectData.getAllFunctions();
    this.points = this.projectData.calculatePoints();
  }

  private updateData(): void {
    this.points = this.projectData.calculatePoints();
  }

  public deleteFunction(functionToBeDeleted: CountedFunction): void {
    this.projectData.removeFunction(functionToBeDeleted.getName());
    this.service.saveProjectData(this.projectData);
    this.updateFunctionList();
  }

  public editFunction(functionToBeUpdated: CountedFunction) {
    this.functionDialog.open(CalculatorFunctionComponent, {
      width: '434px',
      data: functionToBeUpdated
    }).afterClosed().subscribe( () => this.points = this.projectData.calculatePoints() );
  }

  public addFunction(): void {
    this.functionDialog.open(CalculatorFunctionComponent, {
      width: '434px',
      data: new CountedFunction()
    }).afterClosed().subscribe( () => this.points = this.projectData.calculatePoints() );
  }

  private createDummyData() {
    for(let i = 1; i <= 5; i++) {
      const dummyFunction = new CountedFunction(new InternalLogicalFile(), "Dummy function No. " + i );
      dummyFunction.setDataTypes(i*5).setElementaryTypes(i);
      this.functionList.push(dummyFunction);
      this.projectData.addFunction(dummyFunction);
      this.points += dummyFunction.getContribution();
    }
  }
}
