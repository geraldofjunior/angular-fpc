import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { IUser } from 'src/app/entities/user/i-user';
import { User } from 'src/app/entities/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  private currentConfig: IUser = new User();

  public userConfigForm = this.formBuilder.group({
    pricePerFP: new FormControl(this.currentConfig.getPricePerFP()),
    hoursPerFP: new FormControl(this.currentConfig.getHoursPerFP())
  });

  public isExpanded = false;

  public save() {
    const newConfig = new User();
    const formValues = this.userConfigForm.value;

    newConfig.setHoursPerFP(formValues.hoursPerFP ? formValues.hoursPerFP : 0);
    newConfig.setPricePerFP(formValues.pricePerFP ? formValues.pricePerFP : 0);

    this.currentConfig = newConfig;
    this.userService.saveConfig(newConfig);
  }

  ngOnInit(): void {
    this.userService.getConfig().then(userDataObservable =>
      userDataObservable.subscribe(
        userData => this.currentConfig = userData));
  }
}

