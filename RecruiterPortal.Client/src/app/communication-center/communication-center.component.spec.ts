import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunicationCenterComponent } from './communication-center.component';

describe('CommunicationCenterComponent', () => {
  let component: CommunicationCenterComponent;
  let fixture: ComponentFixture<CommunicationCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunicationCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunicationCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
