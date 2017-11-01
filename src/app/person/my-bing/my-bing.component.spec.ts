import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBingComponent } from './my-bing.component';

describe('MyBingComponent', () => {
  let component: MyBingComponent;
  let fixture: ComponentFixture<MyBingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyBingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
