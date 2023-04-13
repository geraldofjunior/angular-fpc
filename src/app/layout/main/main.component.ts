import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  public isSideMenuOpen: boolean = false;

  toggleSidenav(menu: MatSidenav) {
    this.isSideMenuOpen = !this.isSideMenuOpen;
    this.isSideMenuOpen ? menu.open() : menu.close();
  }

}
