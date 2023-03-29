import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { CalculatorProjectComponent } from './calculator-project/calculator-project.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    MainComponent,
    SideMenuComponent,
    CalculatorProjectComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ]
})
export class LayoutModule { }


/*
<mat-toolbar color="primary">
  <button mat-icon-button (click)="toggleMenu(sidenav)">
    <mat-icon>menu</mat-icon>
  </button>
  <span>Header</span>
</mat-toolbar>

<mat-sidenav-container class="sidenav-container">
  <mat-sidenav #sidenav [mode]="'over'" [opened]="false" class="mat-elevation-z2">
    <mat-nav-list>
      <a mat-list-item href="#">Menu Item 1</a>
      <a mat-list-item href="#">Menu Item 2</a>
      <a mat-list-item href="#">Menu Item 3</a>
    </mat-nav-list>
  </mat-sidenav>

  <mat-sidenav-content>
    <div class="page-content">
      <p>Main content goes here</p>
    </div>

    <mat-toolbar class="footer" color="primary">
      <span>Footer</span>
    </mat-toolbar>
  </mat-sidenav-content>
</mat-sidenav-container>
*/
