import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDepenseComponent } from './about-depense.component';

describe('AboutDepenseComponent', () => {
  let component: AboutDepenseComponent;
  let fixture: ComponentFixture<AboutDepenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutDepenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
