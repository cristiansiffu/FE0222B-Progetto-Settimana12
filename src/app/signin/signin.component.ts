import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userInfo: this.formBuilder.group({
        email: this.formBuilder.control(null, [
          Validators.required,
          Validators.email,
        ]),
        password: this.formBuilder.control(null, [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9 ]*'),
        ]),
      }),
    });
  }
  async signin(form: any) {
    try {
      await this.authService.signin(form.value.userInfo).toPromise();
      this.router.navigate(['/movies'])
      form.reset();
    } catch (error: any) {
      console.error(error);
    }
  }

  getEmailErrors(email: string, error: string) {
    return this.form.get(email)?.errors![error];
  }

  getPasswordErrors(password: string, error: string) {
    return this.form.get(password)?.errors![error];
  }

  checkEmail(email: string) {
    return this.form.get(email);
  }

  checkPassword(password: string) {
    return this.form.get(password);
  }
}
