import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterHistoryComponent } from './recruiter-history.component';

describe('RecruiterHistoryComponent', () => {
  let component: RecruiterHistoryComponent;
  let fixture: ComponentFixture<RecruiterHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruiterHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruiterHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
