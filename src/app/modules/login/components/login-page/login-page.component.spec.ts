import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { SquareMetersPipe } from "../../pipes/square-meters-pipe";
import { LoginPageComponent } from "./login-page.component";

const VALID_EMAIL = 'email@email.com';
const INVALID_EMAIL = 'email_email.com';

const VALID_PASSWORD = '123';

const EMAIL_CONTROL_NAME = 'email';
const PASSWORD_CONTROL_NAME = 'password';

describe('LoginPageComponent', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let loginPage: LoginPageComponent;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [LoginPageComponent, SquareMetersPipe],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    loginPage = fixture.componentInstance;
  });

  it('should create the LoginPageComponent', () => {
    expect(loginPage).toBeTruthy();
  });

  it('controls should exist', () => {
    fixture.detectChanges();

    expect(loginPage.controls).toBeTruthy();
  });

  it('should return invalid form: password missing', () => {
    fixture.detectChanges();

    const email = loginPage.loginForm.controls[EMAIL_CONTROL_NAME];
    email.setValue(VALID_EMAIL);

    expect(loginPage.loginForm.invalid).toBeTrue();
  });

  it('should return invalid form: email missing', () => {
    fixture.detectChanges();

    const password = loginPage.loginForm.controls[PASSWORD_CONTROL_NAME];
    password.setValue(VALID_PASSWORD);

    expect(loginPage.loginForm.invalid).toBeTrue();
  });

  it('should return invalid form: invalid email', () => {
    fixture.detectChanges();

    const email = loginPage.loginForm.controls[EMAIL_CONTROL_NAME];
    email.setValue(INVALID_EMAIL);
    const password = loginPage.loginForm.controls[PASSWORD_CONTROL_NAME];
    password.setValue(VALID_PASSWORD);

    expect(loginPage.loginForm.invalid).toBeTrue();
  });

  it('should return valid form', () => {
    fixture.detectChanges();

    const email = loginPage.loginForm.controls[EMAIL_CONTROL_NAME];
    email.setValue(VALID_EMAIL);
    const password = loginPage.loginForm.controls[PASSWORD_CONTROL_NAME];
    password.setValue(VALID_PASSWORD);

    expect(loginPage.loginForm.valid).toBeTrue();
  });

  it('isFormSubmitted should be false before sending the form', () => {
    expect(loginPage.isFormSubmitted).toBeFalse();
  });

  it('isFormSubmitted should be true after sending the form', () => {
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button'));
    submitButton.nativeElement.click();

    expect(loginPage.isFormSubmitted).toBeTrue();
  });
});
