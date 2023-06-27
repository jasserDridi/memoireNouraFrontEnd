import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientqrCodeComponent } from './clientqr-code.component';

describe('ClientqrCodeComponent', () => {
  let component: ClientqrCodeComponent;
  let fixture: ComponentFixture<ClientqrCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientqrCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientqrCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
