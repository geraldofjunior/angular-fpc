import { ExternalQuery } from './../../entities/counted-function/transaction/external-query';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
  functionForm = new FormGroup({
    name: new FormControl<string>("", Validators.required),
    functionType: new FormControl<string>("", Validators.required),
    dataTypes: new FormControl<number>(0),
    elementaryTypes: new FormControl<number>(0),
    complexity: new FormControl<string>(""),
    contribution: new FormControl<number>(0)
  });

  ngOnInit(): void {
    return;
  }

  addFunction(): void {
    if (!this.functionForm.valid) return;
    const addedFunction = this.createFunction();
    // TODO: send this object to service

    alert("Function added. \n\n Values: \n name: " + addedFunction.getName());
    return;
  }

  calculateFunction() {
    alert("Calculating...");
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
      case "ILF": return new InternalLogicalFile();
      case "EIF": return new ExternalInterfaceFunction();
      case "EI":  return new ExternalInput();
      case "EO":  return new ExternalOutput();
    }
    return new ExternalQuery();
  }

}
