import { Component } from '@angular/core';

@Component({
  selector: 'app-otp',
  imports: [],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {

  countdown() {
    var seconds = 59;
    function tick() {
      var counter = (document.getElementById("counter") as HTMLFormElement);
      seconds--;
      counter.innerHTML =
        "0:" + (seconds < 10 ? "0" : "") + String(seconds);
      if (seconds > 0) {
        setTimeout(tick, 1000);
      } else {
        (document.getElementById("verifiBtn") as HTMLFormElement).innerHTML = `
            <div class="Btn" id="ResendBtn">
                <button type="submit">Resend</button>
            </div>
        `;
        (document.getElementById("counter") as HTMLFormElement).innerHTML = "";
      }
    }
    tick();
  }
}
