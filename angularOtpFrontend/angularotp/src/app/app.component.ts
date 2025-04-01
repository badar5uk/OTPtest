import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupformComponent } from './signupform/signupform.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SignupformComponent, ReactiveFormsModule, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = "OTP";
}
