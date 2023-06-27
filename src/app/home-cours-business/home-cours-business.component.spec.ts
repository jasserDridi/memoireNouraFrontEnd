import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCoursBusinessComponent } from './home-cours-business.component';

describe('HomeCoursBusinessComponent', () => {
  let component: HomeCoursBusinessComponent;
  let fixture: ComponentFixture<HomeCoursBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCoursBusinessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCoursBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
