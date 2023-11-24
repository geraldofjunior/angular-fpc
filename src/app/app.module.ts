// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Angular Material
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from "@angular/material/radio";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// Project components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './layout/header/header.component';
import { MainComponent } from './layout/main/main.component';
import { SideMenuComponent } from './layout/side-menu/side-menu.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CalculatorProjectComponent } from './layout/calculator-project/calculator-project.component';
import { CalculatorFunctionComponent } from "./layout/calculator-function/calculator-function.component";
import { CalculatorInfluencesComponent } from './layout/calculator-influences/calculator-influences.component'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SideMenuComponent,
    CalculatorProjectComponent,
    CalculatorFunctionComponent,
    HeaderComponent,
    FooterComponent,
    CalculatorInfluencesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
