import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userInfo: this.formBuilder.group({
        name: this.formBuilder.control(null, [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        surname: this.formBuilder.control(null, [
          Validators.required,
          Validators.pattern('[a-zA-Z ]*'),
        ]),
        email: this.formBuilder.control(null, [
          Validators.required,
          Validators.email,
        ]),
        password: this.formBuilder.control(null, [
          Validators.required,
          Validators.pattern('[a-zA-Z0-9 ]*'),
          Validators.minLength(6)
        ]),
      }),
    });
  }

  async signup(form: any) {
    try {
      await this.authService.signup(form.value.userInfo).toPromise();
      this.router.navigate(['signin'])
      form.reset();
    } catch (error: any) {
      console.error(error);
    }
  }

  getNameSurnameErrors(name: string, error: string) {
    return this.form.get(name)?.errors![error];
  }

  getEmailErrors(email: string, error: string) {
    return this.form.get(email)?.errors![error];
  }

  getPasswordErrors(password: string, error: string) {
    return this.form.get(password)?.errors![error];
  }

  checkNameSurname(name: string) {
    return this.form.get(name);
  }

  checkEmail(email: string) {
    return this.form.get(email);
  }

  checkPassword(password: string) {
    return this.form.get(password);
  }
}
