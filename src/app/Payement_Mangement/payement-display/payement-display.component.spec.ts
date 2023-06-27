import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementDisplayComponent } from './payement-display.component';

describe('PayementDisplayComponent', () => {
  let component: PayementDisplayComponent;
  let fixture: ComponentFixture<PayementDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayementDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayementDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
