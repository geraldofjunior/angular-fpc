import { MainComponent } from './layout/main/main.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CalculatorFunctionComponent} from "./layout/calculator-function/calculator-function.component";
import {CalculatorProjectComponent} from "./layout/calculator-project/calculator-project.component";

const routes: Routes = [
  {
    path: 'home',
    component: CalculatorProjectComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: "function",
    component:CalculatorFunctionComponent
  },
  {
    path: "project",
    component:CalculatorProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
