import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { PhoneNumberInputComponent } from './phone-number-input/phone-number-input.component';

@NgModule({
  declarations: [], 
  imports: [
    BrowserModule,
    NgbModule,
    AppComponent,
    FormsModule,
    PhoneNumberInputComponent
    ],
  providers: [],
  bootstrap: [],  // Bootstrap the root component
})
export class AppModule {}
