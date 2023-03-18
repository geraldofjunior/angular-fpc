import { SideMenuComponent } from './../side-menu/side-menu.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  @ViewChild(SideMenuComponent, { static: true })
  sideMenu!: SideMenuComponent;

  toggleSidenav() {
    this.sideMenu.isExpanded = !this.sideMenu.isExpanded;
  }

}
