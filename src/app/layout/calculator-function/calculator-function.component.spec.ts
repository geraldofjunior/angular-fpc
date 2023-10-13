import { ComponentFixture, TestBed } from '@angular/core/testing';

import {CalculatorFunctionComponent} from './calculator-function.component';

describe('CalculatorFunctionComponent', () => {
  let component: CalculatorFunctionComponent;
  let fixture: ComponentFixture<CalculatorFunctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculatorFunctionComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculatorFunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
