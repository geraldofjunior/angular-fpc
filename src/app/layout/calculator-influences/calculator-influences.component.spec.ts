import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorInfluencesComponent } from './calculator-influences.component';

describe('CalculatorInfluencesComponent', () => {
  let component: CalculatorInfluencesComponent;
  let fixture: ComponentFixture<CalculatorInfluencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculatorInfluencesComponent]
    });
    fixture = TestBed.createComponent(CalculatorInfluencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
