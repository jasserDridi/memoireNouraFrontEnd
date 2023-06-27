import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBacKOfficeComponent } from './client-bac-koffice.component';

describe('ClientBacKOfficeComponent', () => {
  let component: ClientBacKOfficeComponent;
  let fixture: ComponentFixture<ClientBacKOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBacKOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientBacKOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
