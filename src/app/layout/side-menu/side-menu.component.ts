import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user/user';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {
  constructor(private fb: FormBuilder) { }

  public userConfigForm = this.fb.group({
    pricePerFP: ['', Validators.required],
    hoursPerFP: ['', Validators.required]
  });

  public isExpanded: boolean = false;

  public save() {
    const newConfig = new User();

  }
}

