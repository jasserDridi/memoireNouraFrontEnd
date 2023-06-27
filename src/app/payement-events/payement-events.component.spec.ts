import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayementEventsComponent } from './payement-events.component';

describe('PayementEventsComponent', () => {
  let component: PayementEventsComponent;
  let fixture: ComponentFixture<PayementEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayementEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayementEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
