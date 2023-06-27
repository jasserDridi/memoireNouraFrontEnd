import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestatireHomePageComponent } from './prestatire-home-page.component';

describe('PrestatireHomePageComponent', () => {
  let component: PrestatireHomePageComponent;
  let fixture: ComponentFixture<PrestatireHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestatireHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestatireHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
