import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilletesPage } from './billetes.page';

describe('BilletesPage', () => {
  let component: BilletesPage;
  let fixture: ComponentFixture<BilletesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilletesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilletesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
