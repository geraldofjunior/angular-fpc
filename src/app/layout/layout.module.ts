import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { CalculatorProjectComponent } from './calculator-project/calculator-project.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    MainComponent,
    SideMenuComponent,
    CalculatorProjectComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
