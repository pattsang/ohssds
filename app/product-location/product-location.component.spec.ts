import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLocationComponent } from './product-location.component';

describe('ProductLocationComponent', () => {
  let component: ProductLocationComponent;
  let fixture: ComponentFixture<ProductLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
