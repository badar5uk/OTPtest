import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupformComponent } from './signupform/signupform.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,SignupformComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularotp';
}
