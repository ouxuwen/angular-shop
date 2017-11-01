import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressBoxComponent } from './address-box.component';

describe('AddressBoxComponent', () => {
  let component: AddressBoxComponent;
  let fixture: ComponentFixture<AddressBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
