import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PlaceholderUser } from '../../models/placeholder-user.model';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  isFormSubmitted: boolean = false;
  getUsers$!: Observable<Array<User>>;
  getPlaceholderUsers$!: Observable<Array<PlaceholderUser>>;

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getUsers$ = this.getUsers();
    this.getPlaceholderUsers$ = this.getPlaceholderUsers();
  }

  get controls() {
    return this.loginForm.controls;
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      password: ['', { validators: [Validators.required] }]
    });
  }

  onSubmit(): void {
    this.isFormSubmitted = true;
    if(this.loginForm.status === 'VALID') {
      this.userService.insert(this.loginForm.value);
      this.isFormSubmitted = false;
      this.loginForm.reset();
    }
  }

  getUsers(): Observable<Array<User>> {
    return this.userService.getAll();
  }

  getPlaceholderUsers(): Observable<Array<PlaceholderUser>> {
    return this.userService.getAllPlaceholder();
  }
}
