import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLoginFormComponent } from './email-login-form.component';

describe('LoginFormComponent', () => {
  let component: EmailLoginFormComponent;
  let fixture: ComponentFixture<EmailLoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailLoginFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
