import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  constructor(private fb: FormBuilder, private userService: UserService) { }

  private currentConfig: User = new User();

  public userConfigForm = this.fb.group({
    pricePerFP: ['', Validators.required],
    hoursPerFP: ['', Validators.required]
  });

  public isExpanded = false;

  public save() {
    //const newConfig = new User();
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
}

