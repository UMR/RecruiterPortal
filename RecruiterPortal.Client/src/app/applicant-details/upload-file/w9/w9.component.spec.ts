import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { W9Component } from './w9.component';

describe('W9Component', () => {
  let component: W9Component;
  let fixture: ComponentFixture<W9Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ W9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(W9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
