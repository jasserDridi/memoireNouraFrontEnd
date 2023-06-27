import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCoursComponent } from './home-cours.component';

describe('HomeCoursComponent', () => {
  let component: HomeCoursComponent;
  let fixture: ComponentFixture<HomeCoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
