import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualsPage } from './manuals.page';

describe('ManualsPage', () => {
  let component: ManualsPage;
  let fixture: ComponentFixture<ManualsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
