import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrestataireBackOfficeComponent } from './prestataire-back-office.component';

describe('PrestataireBackOfficeComponent', () => {
  let component: PrestataireBackOfficeComponent;
  let fixture: ComponentFixture<PrestataireBackOfficeComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrestataireBackOfficeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestataireBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
