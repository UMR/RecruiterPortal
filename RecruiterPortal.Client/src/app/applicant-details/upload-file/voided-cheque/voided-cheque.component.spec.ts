import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoidedChequeComponent } from './voided-cheque.component';

describe('VoidedChequeComponent', () => {
  let component: VoidedChequeComponent;
  let fixture: ComponentFixture<VoidedChequeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoidedChequeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoidedChequeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
