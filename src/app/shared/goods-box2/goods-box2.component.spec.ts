import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsBox2Component } from './goods-box2.component';

describe('GoodsBox2Component', () => {
  let component: GoodsBox2Component;
  let fixture: ComponentFixture<GoodsBox2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsBox2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsBox2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
