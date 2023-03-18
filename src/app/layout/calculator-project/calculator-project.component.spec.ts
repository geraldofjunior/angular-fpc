import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorProjectComponent } from './calculator-project.component';

describe('CalculatorProjectComponent', () => {
  let component: CalculatorProjectComponent;
  let fixture: ComponentFixture<CalculatorProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculatorProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
