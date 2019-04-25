import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountP2Page } from './create-account-p2.page';

describe('CreateAccountP2Page', () => {
  let component: CreateAccountP2Page;
  let fixture: ComponentFixture<CreateAccountP2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountP2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountP2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
