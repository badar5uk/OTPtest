import { NgFor } from '@angular/common';
import { Countries } from './../../../../node_modules/libphonenumber-js/types.d';
import { Component, OnInit,Input,forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { getData } from 'country-list';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

@Component({
  selector: 'app-phone-number-input',
  imports: [NgFor],
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
      AF: '93', // Afghanistan
      AL: '355', // Albania
      DZ: '213', // Algeria
      AD: '376', // Andorra
      AO: '244', // Angola
      AG: '1', // Antigua and Barbuda
      AR: '54', // Argentina
      AM: '374', // Armenia
      AU: '61', // Australia
      AT: '43', // Austria
      AZ: '994', // Azerbaijan
      BS: '1', // Bahamas
      BH: '973', // Bahrain
      BD: '880', // Bangladesh
      BB: '1', // Barbados
      BY: '375', // Belarus
      BE: '32', // Belgium
      BZ: '501', // Belize
      BJ: '229', // Benin
      BT: '975', // Bhutan
      BO: '591', // Bolivia
      BA: '387', // Bosnia and Herzegovina
      BW: '267', // Botswana
      BR: '55', // Brazil
      BN: '673', // Brunei
      BG: '359', // Bulgaria
      BF: '226', // Burkina Faso
      BI: '257', // Burundi
      CV: '238', // Cabo Verde
      KH: '855', // Cambodia
      CM: '237', // Cameroon
      CA: '1', // Canada
      CF: '236', // Central African Republic
      TD: '235', // Chad
      CL: '56', // Chile
      CN: '86', // China
      CO: '57', // Colombia
      KM: '269', // Comoros
      CD: '243', // Congo (DRC)
      CG: '242', // Congo (Republic)
      CR: '506', // Costa Rica
      CI: '225', // Côte d'Ivoire
      HR: '385', // Croatia
      CU: '53', // Cuba
      CY: '357', // Cyprus
      CZ: '420', // Czech Republic
      DK: '45', // Denmark
      DJ: '253', // Djibouti
      DM: '1', // Dominica
      DO: '1', // Dominican Republic
      EC: '593', // Ecuador
      EG: '20', // Egypt
      SV: '503', // El Salvador
      GQ: '240', // Equatorial Guinea
      ER: '291', // Eritrea
      EE: '372', // Estonia
      SZ: '268', // Eswatini
      ET: '251', // Ethiopia
      FJ: '679', // Fiji
      FI: '358', // Finland
      FR: '33', // France
      GA: '241', // Gabon
      GM: '220', // Gambia
      GE: '995', // Georgia
      DE: '49', // Germany
      GH: '233', // Ghana
      GR: '30', // Greece
      GD: '1', // Grenada
      GT: '502', // Guatemala
      GN: '224', // Guinea
      GW: '245', // Guinea-Bissau
      GY: '592', // Guyana
      HT: '509', // Haiti
      HN: '504', // Honduras
      HU: '36', // Hungary
      IS: '354', // Iceland
      IN: '91', // India
      ID: '62', // Indonesia
      IR: '98', // Iran
      IQ: '964', // Iraq
      IE: '353', // Ireland
      IL: '972', // Israel
      IT: '39', // Italy
      JM: '1', // Jamaica
      JP: '81', // Japan
      JO: '962', // Jordan
      KZ: '7', // Kazakhstan
      KE: '254', // Kenya
      KI: '686', // Kiribati
      KW: '965', // Kuwait
      KG: '996', // Kyrgyzstan
      LA: '856', // Laos
      LV: '371', // Latvia
      LB: '961', // Lebanon
      LS: '266', // Lesotho
      LR: '231', // Liberia
      LY: '218', // Libya
      LI: '423', // Liechtenstein
      LT: '370', // Lithuania
      LU: '352', // Luxembourg
      MG: '261', // Madagascar
      MW: '265', // Malawi
      MY: '60', // Malaysia
      MV: '960', // Maldives
      ML: '223', // Mali
      MT: '356', // Malta
      MH: '692', // Marshall Islands
      MR: '222', // Mauritania
      MU: '230', // Mauritius
      MX: '52', // Mexico
      FM: '691', // Micronesia
      MD: '373', // Moldova
      MC: '377', // Monaco
      MN: '976', // Mongolia
      ME: '382', // Montenegro
      MA: '212', // Morocco
      MZ: '258', // Mozambique
      MM: '95', // Myanmar
      NA: '264', // Namibia
      NR: '674', // Nauru
      NP: '977', // Nepal
      NL: '31', // Netherlands
      NZ: '64', // New Zealand
      NI: '505', // Nicaragua
      NE: '227', // Niger
      NG: '234', // Nigeria
      KP: '850', // North Korea
      NO: '47', // Norway
      OM: '968', // Oman
      PK: '92', // Pakistan
      PW: '680', // Palau
      PA: '507', // Panama
      PG: '675', // Papua New Guinea
      PY: '595', // Paraguay
      PE: '51', // Peru
      PH: '63', // Philippines
      PL: '48', // Poland
      PT: '351', // Portugal
      QA: '974', // Qatar
      RO: '40', // Romania
      RU: '7', // Russia
      RW: '250', // Rwanda
      KN: '1', // Saint Kitts and Nevis
      LC: '1', // Saint Lucia
      VC: '1', // Saint Vincent and the Grenadines
      WS: '685', // Samoa
      SM: '378', // San Marino
      ST: '239', // São Tomé and Príncipe
      SA: '966', // Saudi Arabia
      SN: '221', // Senegal
      RS: '381', // Serbia
      SC: '248', // Seychelles
      SL: '232', // Sierra Leone
      SG: '65', // Singapore
      SK: '421', // Slovakia
      SI: '386', // Slovenia
      SB: '677', // Solomon Islands
      SO: '252', // Somalia
      ZA: '27', // South Africa
      KR: '82', // South Korea
      SS: '211', // South Sudan
      ES: '34', // Spain
      LK: '94', // Sri Lanka
      SD: '249', // Sudan
      SR: '597', // Suriname
      SE: '46', // Sweden
      CH: '41', // Switzerland
      SY: '963', // Syria
      TJ: '992', // Tajikistan
      TZ: '255', // Tanzania
      TH: '66', // Thailand
      TL: '670', // Timor-Leste
      TG: '228', // Togo
      TO: '676', // Tonga
      TT: '1', // Trinidad and Tobago
      TN: '216', // Tunisia
      TR: '90', // Turkey
      TM: '993', // Turkmenistan
      TV: '688', // Tuvalu
      UG: '256', // Uganda
      UA: '380', // Ukraine
      AE: '971', // UAE
      GB: '44', // United Kingdom
      US: '1', // United States
      UY: '598', // Uruguay
      UZ: '998', // Uzbekistan
      VU: '678', // Vanuatu
      VA: '379', // Vatican City
      VE: '58', // Venezuela
      VN: '84', // Vietnam
      YE: '967', // Yemen
      ZM: '260', // Zambia
      ZW: '263'  // Zimbabwe
      // Add more country codes as needed
    };
    return callingCodes[countryCode] || '1';
  }
}
