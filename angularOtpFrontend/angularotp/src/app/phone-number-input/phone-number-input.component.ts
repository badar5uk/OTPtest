import { Countries } from './../../../../node_modules/libphonenumber-js/types.d';
import { Component, OnInit,Input,forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { getData } from 'country-list';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

@Component({
  selector: 'app-phone-number-input',
  imports: [],
  templateUrl: './phone-number-input.component.html',
  styleUrl: './phone-number-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneNumberInputComponent),
      multi: true
    }
  ]
})
export class PhoneNumberInputComponent implements ControlValueAccessor, OnInit{
  countriesList: any[] = [];
  selectedCountry: CountryCode = 'OM';
  phoneNumber: string = '';
  fullPhoneNumber: string = '';

   // Allow the input to be used in reactive forms
   onChange: any = () => {};
   onTouched: any = () => {};
 
   ngOnInit() {
     // Get country list and format for dropdown
     this.countriesList = getData().map((country: any) => ({
      code: country.code,
      name: country.name
     }));
 
     // Sort countries alphabetically
     this.countriesList.sort((a, b) => a.name.localeCompare(b.name));
   }
 
   onCountryChange() {
     this.updateValue();
   }
 
   onPhoneNumberChange() {
     this.updateValue();
   }
 
   updateValue() {
     try {
       const phoneNumber = parsePhoneNumberFromString(this.phoneNumber, this.selectedCountry);
       this.fullPhoneNumber = phoneNumber ? phoneNumber.formatInternational() : '';
     } catch (e) {
       this.fullPhoneNumber = '';
     }
     this.onChange(this.fullPhoneNumber);
     this.onTouched();
   }
 
   // ControlValueAccessor methods
   writeValue(value: string): void {
     if (value) {
       try {
         const phoneNumber = parsePhoneNumberFromString(value);
         if (phoneNumber) {
           this.selectedCountry = phoneNumber.country || 'US';
           this.phoneNumber = phoneNumber.nationalNumber;
           this.fullPhoneNumber = value;
         }
       } catch (e) {
         console.error('Error parsing phone number', e);
       }
     }
   }
 
   registerOnChange(fn: any): void {
     this.onChange = fn;
   }
 
   registerOnTouched(fn: any): void {
     this.onTouched = fn;
   }

   getCountryCallingCode(countryCode: string): string {
    // This is a simplified version - in a real app you might want a more complete solution
    const callingCodes: {[key: string]: string} = {
      US: '1',
      GB: '44',
      FR: '33',
      DE: '49',
      OM: '968'
      // Add more country codes as needed
    };
    return callingCodes[countryCode] || '1';
  }
}
