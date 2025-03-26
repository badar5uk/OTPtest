import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-signupform',
  imports: [ReactiveFormsModule],
  templateUrl: './signupform.component.html',
  styleUrl: './signupform.component.css'
})
export class SignupformComponent {

  loginForm: FormGroup;
  signupForm: FormGroup;
  isLogin: boolean = true;

  constructor(private formbuilder: FormBuilder){
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.signupForm = this.formbuilder.group({
      username: [],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmpassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  // to switch between log in and sign up
  toggleForm() {
    this.isLogin = !this.isLogin;
  }

  // Password match validation for signup form
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

   // Login form submission
   onLogin() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Login Data:', formData);
      // Add your login logic here
    } else {
      console.log('Login Form is invalid');
    }
  }

  // Signup form submission
  onSignup() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      console.log('Signup Data:', formData);
      // Add your signup logic here
    } else {
      console.log('Signup Form is invalid');
    }
  }
}
