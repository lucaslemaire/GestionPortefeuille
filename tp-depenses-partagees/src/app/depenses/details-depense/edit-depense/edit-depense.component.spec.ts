import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDepenseComponent } from './edit-depense.component';

describe('EditDepenseComponent', () => {
  let component: EditDepenseComponent;
  let fixture: ComponentFixture<EditDepenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDepenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
