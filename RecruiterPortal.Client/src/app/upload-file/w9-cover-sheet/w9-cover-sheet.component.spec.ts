import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { W9CoverSheetComponent } from './w9-cover-sheet.component';

describe('W9CoverSheetComponent', () => {
  let component: W9CoverSheetComponent;
  let fixture: ComponentFixture<W9CoverSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ W9CoverSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(W9CoverSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
