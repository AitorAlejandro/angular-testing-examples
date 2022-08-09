import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SquareMetersPipe } from './pipes/square-meters-pipe';

@NgModule({
  declarations: [LoginPageComponent, SquareMetersPipe],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [FormBuilder]
})
export class LoginModule { }
