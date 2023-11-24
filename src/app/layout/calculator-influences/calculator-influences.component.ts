import { Component, OnInit } from '@angular/core';
import { InfluenceFactor } from 'src/app/entities/adjustment-factor/influence-factor';
import { ProjectService } from 'src/app/services/project/project.service';

@Component({
  selector: 'app-calculator-influences',
  templateUrl: './calculator-influences.component.html',
  styleUrls: ['./calculator-influences.component.css']
})
export class CalculatorInfluencesComponent implements OnInit {
  public influences = new Array<InfluenceFactor>();
  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getInfluences().subscribe( influences => this.influences = influences );
  }

}
