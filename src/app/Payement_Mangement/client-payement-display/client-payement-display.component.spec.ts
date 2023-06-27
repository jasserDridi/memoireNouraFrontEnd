import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPayementDisplayComponent } from './client-payement-display.component';

describe('ClientPayementDisplayComponent', () => {
  let component: ClientPayementDisplayComponent;
  let fixture: ComponentFixture<ClientPayementDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPayementDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientPayementDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
