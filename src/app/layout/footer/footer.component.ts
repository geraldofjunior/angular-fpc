import { ProjectService } from 'src/app/services/project/project.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {
  points = 0;
  days = 0;
  price = 0;

  private pointSubscription!: Subscription;
  private termSubscription!:  Subscription;
  private priceSubscription!: Subscription;

  constructor(private projectService: ProjectService) {}

  public ngOnInit(): void {
    this.pointSubscription = this.projectService.getPoints().subscribe( value => this.points = value );
    this.termSubscription = this.projectService.getDays().subscribe( value => this.days = value );
    this.priceSubscription = this.projectService.getPrice().subscribe( value => this.price = value );
  }

  public ngOnDestroy(): void {
    this.pointSubscription.unsubscribe();
    this.termSubscription.unsubscribe();
    this.priceSubscription.unsubscribe();
  }

}
