import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsBoxComponent } from './goods-box.component';

describe('GoodsBoxComponent', () => {
  let component: GoodsBoxComponent;
  let fixture: ComponentFixture<GoodsBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
