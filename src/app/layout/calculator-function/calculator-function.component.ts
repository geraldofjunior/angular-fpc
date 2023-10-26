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

const DEFAULT_TYPE = "ILF";

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
    @Inject(MAT_DIALOG_DATA) public dialogData = new CountedFunction(new InternalLogicalFile()),
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
    // TODO: send this object to service

    alert("Function added. \n\n Values: \n name: " + addedFunction.getName());
    this.dialogRef.close();
  }

  public editFunction(): void {
    const functionName = this.loadedData.getName();
    const newData = new CountedFunction(this.convertToFunctionType(this.functionForm.value.functionType || ""), this.functionForm.value.name || "")
          .setDataTypes(this.functionForm.value.dataTypes || 0)
          .setElementaryTypes(this.functionForm.value.elementaryTypes || 0);
    this.projectManager.editFunction(functionName, newData);
    this.dialogRef.close();
  }

  private createFunction(): CountedFunction {
    const functionName = this.functionForm.value.name ? this.functionForm.value.name : "";
    const functionType = this.functionForm.value.functionType ? this.functionForm.value.functionType : DEFAULT_TYPE;
    const functionObject = new CountedFunction(this.convertToFunctionType(functionType), functionName);
    const dataTypes = this.functionForm.value.dataTypes ? this.functionForm.value.dataTypes : 0;
    const elementTypes = this.functionForm.value.elementaryTypes ? this.functionForm.value.elementaryTypes : 0;
    functionObject.setDataTypes(dataTypes);
    functionObject.setElementaryTypes(elementTypes);
    return functionObject;
  }

  private convertToFunctionType(typeEntered: string): IFunctionType {
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
