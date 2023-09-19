import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailTemplateTypeComponent } from './mail-template-type.component';

describe('MailTemplateTypeComponent', () => {
  let component: MailTemplateTypeComponent;
  let fixture: ComponentFixture<MailTemplateTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailTemplateTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailTemplateTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
