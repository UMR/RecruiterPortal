import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SentBulkMailComponent } from './sent-bulk-mail.component';


describe('StatusComponent', () => {
    let component: SentBulkMailComponent;
    let fixture: ComponentFixture<SentBulkMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [SentBulkMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
      fixture = TestBed.createComponent(SentBulkMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
