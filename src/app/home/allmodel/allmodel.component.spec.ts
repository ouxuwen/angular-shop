import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllmodelComponent } from './allmodel.component';

describe('AllmodelComponent', () => {
  let component: AllmodelComponent;
  let fixture: ComponentFixture<AllmodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllmodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllmodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
