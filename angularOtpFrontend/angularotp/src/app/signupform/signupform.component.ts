import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, timer } from 'rxjs';

@Component({
  selector: 'app-signupform',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signupform.component.html',
  styleUrl: './signupform.component.css'
})
export class SignupformComponent {

  loginForm: FormGroup;
  signupForm: FormGroup;
  isLogin: boolean = true;
  countdown: number = 60;  // Countdown timer for 1 minute
  countdownObservable: Observable<number> | null = null;
  isTimerActive: boolean = false; // Flag to show if the timer is active
  timerInterval: any;

  constructor(private formbuilder: FormBuilder){
    this.loginForm = this.formbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.signupForm = this.formbuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
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
      fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem(`token`, data.token);
          if (data.status != 200) {
            alert('Login successful');
            window.location.href = "index.html";
          }
          else {
            alert('User or password incorrect');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred during login.');
        });
      }
    }
  startCountdown() {
    this.isTimerActive = true;
    this.countdown = 60; // Reset to 60 seconds
    this.countdownObservable = timer(0, 1000); // Emits every 1 second

    // Start the countdown and update the time left
    this.timerInterval = this.countdownObservable.subscribe(
      (elapsedTime) => {
        this.countdown = 60 - elapsedTime;
        if (this.countdown <= 0) {
          this.timerInterval.unsubscribe();
        }
      }
    );
  }
}
