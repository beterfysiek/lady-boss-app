import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsPage } from './signals.page';

describe('SignalsPage', () => {
  let component: SignalsPage;
  let fixture: ComponentFixture<SignalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
