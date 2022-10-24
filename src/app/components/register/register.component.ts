import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    cgu: null,
    recaptcha: null,
  };
  errors: any = {
    username: {
      required: false,
      minlength: false,
      maxlength: false,
    },
    // email: null,
    // password: null,
    // cgu: null,
    // recaptcha: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { username, email, password } = this.form;

    this.authService.register(username, email, password).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.NavigateToLogin();
      },
      (err) => {
        console.error(err);
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  NavigateToLogin(): void {
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
