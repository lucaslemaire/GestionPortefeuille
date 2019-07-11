import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDepensesComponent } from './liste-depenses.component';

describe('ListeDepensesComponent', () => {
  let component: ListeDepensesComponent;
  let fixture: ComponentFixture<ListeDepensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeDepensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeDepensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
