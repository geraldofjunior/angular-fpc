import { ProjectService } from 'src/app/services/project/project.service';
import { ExternalQuery } from './../../entities/counted-function/transaction/external-query';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CountedFunction } from 'src/app/entities/counted-function/counted-function';
import { ExternalInterfaceFunction } from 'src/app/entities/counted-function/data/external-interface-function';
import { InternalLogicalFile } from 'src/app/entities/counted-function/data/internal-logical-file';
import { IFunctionType } from 'src/app/entities/counted-function/i-function-type';
import { ExternalInput } from 'src/app/entities/counted-function/transaction/external-input';
import { ExternalOutput } from 'src/app/entities/counted-function/transaction/external-output';

@Component({
  selector: 'app-calculator-function',
  templateUrl: './calculator-function.component.html',
  styleUrls: ['./calculator-function.component.css']
})
export class CalculatorFunctionComponent implements OnInit {
  public functionForm = new FormGroup({
    name: new FormControl<string>("", Validators.required),
    functionType: new FormControl<string>("", Validators.required),
    dataTypes: new FormControl<number>(0),
    elementaryTypes: new FormControl<number>(0),
    complexity: new FormControl<string>(""),
    contribution: new FormControl<number>(0)
  });
  public loadedData: CountedFunction;
  public isEdit = false;

  public ngOnInit() {
    if (this.loadedData.getName() === "") return;
    this.functionForm = new FormGroup({
      name: new FormControl<string>(this.loadedData.getName(), Validators.required),
      functionType: new FormControl<string>(this.loadedData.getFunctionTypeName(), Validators.required),
      dataTypes: new FormControl<number>(this.loadedData.getDataTypes()),
      elementaryTypes: new FormControl<number>(this.loadedData.getElementaryTypes()),
      complexity: new FormControl<string>(this.loadedData.getComplexityName()),
      contribution: new FormControl<number>(this.loadedData.getContribution())
    });
    this.isEdit = true;
  }

  constructor(
    public dialogRef: MatDialogRef<CalculatorFunctionComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData = new CountedFunction(),
    private projectManager: ProjectService
  ) {
    this.loadedData = dialogData;
  }

  public onClickOutside(): void {
    this.dialogRef.close();
  }

  public save() {
    if (this.isEdit)
      this.editFunction();
    else
      this.addFunction();
  }

  public addFunction(): void {
    if (!this.functionForm.valid) return;
    const addedFunction = this.createFunction();
    this.projectManager.addFunction(addedFunction);
    this.dialogRef.close();
  }

  public editFunction(): void {
    if (!this.functionForm.valid) return;
    const functionName = this.loadedData.getName();
    const newData = this.createFunction();
    this.projectManager.editFunction(functionName, newData);
    this.dialogRef.close();
  }

  private createFunction(): CountedFunction {
    return new CountedFunction(
      this.convertToFunctionType(this.functionForm.value.functionType?.toString()),
      this.functionForm.value.name?.toString())
          .setDataTypes(this.functionForm.value.dataTypes || 0)
          .setElementaryTypes(this.functionForm.value.elementaryTypes || 0);
  }

  private convertToFunctionType(typeEntered = ""): IFunctionType {
    switch (typeEntered) {
      case "Internal Logical File": return new InternalLogicalFile();
      case "External Interface Function": return new ExternalInterfaceFunction();
      case "External Input": return new ExternalInput();
      case "External Output": return new ExternalOutput();
      case "External Query":
      default: return new ExternalQuery();
    }
  }

}
