import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsLineComponent } from './cards-line.component';

describe('CardsLineComponent', () => {
  let component: CardsLineComponent;
  let fixture: ComponentFixture<CardsLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
