import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CakeOrderComponent } from './cake-order.component';

describe('CakeOrderComponent', () => {
  let component: CakeOrderComponent;
  let fixture: ComponentFixture<CakeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CakeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CakeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
