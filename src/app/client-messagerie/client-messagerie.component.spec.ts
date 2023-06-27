import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMessagerieComponent } from './client-messagerie.component';

describe('ClientMessagerieComponent', () => {
  let component: ClientMessagerieComponent;
  let fixture: ComponentFixture<ClientMessagerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientMessagerieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMessagerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
