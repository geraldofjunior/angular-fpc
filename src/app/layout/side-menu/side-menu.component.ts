import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  constructor(private userService: UserService) { }

  private currentConfig = new User();
  public userConfigForm = new FormGroup({
    pricePerFP: new FormControl<number>(1, Validators.required),
    hoursPerFp: new FormControl<number>(1, Validators.required)
  })

  public isExpanded = false;

  public save(): void {
    if (!this.userConfigForm.valid) return;
    const newConfig = new User();
    newConfig.setHoursPerFP(this.userConfigForm.value.hoursPerFp || 1)
             .setPricePerFP(this.userConfigForm.value.pricePerFP || 1);
    this.userService.updateUser(newConfig);
  }

  ngOnInit(): void {
    this.userService.getConfig().subscribe(value => {
      this.currentConfig = value;
      this.userConfigForm.value.hoursPerFp = this.currentConfig.getHoursPerFP();
      this.userConfigForm.value.pricePerFP = this.currentConfig.getPricePerFP();
    });
  }
}
