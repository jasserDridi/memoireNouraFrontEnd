import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationReadComponent } from './formation-read.component';

describe('FormationReadComponent', () => {
  let component: FormationReadComponent;
  let fixture: ComponentFixture<FormationReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
