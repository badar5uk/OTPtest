import { Component } from '@angular/core';
import { SignupformComponent } from './signupform/signupform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  imports: [SignupformComponent, ReactiveFormsModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = "OTP";
}
