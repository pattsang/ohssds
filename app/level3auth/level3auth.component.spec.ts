/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Level3authComponent } from './level3auth.component';

describe('Level3authComponent', () => {
  let component: Level3authComponent;
  let fixture: ComponentFixture<Level3authComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Level3authComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Level3authComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
