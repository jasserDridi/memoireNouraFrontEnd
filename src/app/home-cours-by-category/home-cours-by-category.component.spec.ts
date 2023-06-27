import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCoursByCategoryComponent } from './home-cours-by-category.component';

describe('HomeCoursByCategoryComponent', () => {
  let component: HomeCoursByCategoryComponent;
  let fixture: ComponentFixture<HomeCoursByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCoursByCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeCoursByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
