import { FormBuilder, FormGroup, Validators, FormControl, Validator, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  invalid_mobile_number: any;
  constructor(public translate: TranslateService) {
    this.invalid_mobile_number = this.translate.instant('invalid_mobile_number');
  }

  getValidatorErrorMessage(validatorName: string, validatorValue?: any, fieldName?: any, extra?: any) {
    if (!fieldName) {
      fieldName = 'This';
    }
    const config = {
      'only required': `Required`,
      'required': `${fieldName} is required`,
      'requiredOtp': `Your OTP should be a 6-digit number`,
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Oops, that’s an invalid email ID!',
      'invalidMobileNumber': 'Invalid mobile number',
      'invalidMobileNumberCustome': `${this.invalid_mobile_number}`,
      'invalidOTP': this.translate.instant('invalid_otp_error'),
      'invalidPAN': 'Invalid PAN Number',
      'Invaliddob': 'Please enter a valid date',
      'PINcode': 'Invalid PIN code',
      'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
      'minlength': `Minimum length ${validatorValue.requiredLength}`,
      'maxlength': `The ${fieldName} maximum length is ${validatorValue.requiredLength}`,
      'min': `Minimum length ${validatorValue.min}`,
      'max': `Maximum length ${validatorValue.max}`,
      'equalTo': `Confirm Account Number not matching`,
      'invalidAccountNumber': 'Invalid account number',
      'requiredOTPCustome': this.translate.instant('invalid_otp_error'),
      'customeMessage': `${extra}`,
      'leadingZeroNotAllow': this.translate.instant('leading_zeronot_allow_in_percentage')
    };

    return config[validatorName];
  }

  static requiredCustome(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'customeMessage': true };
  }

  static MatchAccountNumber(AC: AbstractControl) {
    const accountNumber = AC.get('accountNumber').value; // to get value in input tag
    const confirmAccountNumber = AC.get('confirmAccountNumber').value; // to get value in input tag        
    if (accountNumber !== confirmAccountNumber) {
      AC.get('confirmAccountNumber').setErrors({ equalTo: true });
    } else {
      AC.get('confirmAccountNumber').setErrors(null);
      return null;
    }
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return null;
      } else {
        return { 'invalidEmailAddress': true };
      }
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static emailCustomeValidator(control) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
        return null;
      } else {
        return { 'invalidEmailAddress': true };
      }
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static emailNomineeValidator(control) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (control.value.match(/[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/)) {
        return null;
      } else {
        return { 'invalidEmailAddress': true };
      }
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static mobileNumberValidator(control) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (control.value.match(/^(?=.*[0-9])[0-9]{10,10}$/)) {
        return null;
      } else {
        return { 'invalidMobileNumber': true };
      }
    } else {
      return { 'invalidMobileNumber': true };
    }
  }

  static mobileNumberCustomeValidator(control) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (control.value.match(/^(?=.*[0-9])[0-9]{10,10}$/)) {
        return null;
      } else {
        return { 'invalidMobileNumberCustome': true };
      }
    } else {
      return { 'invalidMobileNumberCustome': true };
    }
  }

  static accountNumberValidator(control) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (control.value.match(/^[0-9]{9,18}$/)) {
        return null;
      } else {
        return { 'invalidAccountNumber': true };
      }
    } else {
      return { 'invalidAccountNumber': true };
    }
  }

  static mobileOtpValidator(control) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (control.value.match(/^(?=.*[0-9])[0-9]{4,6}$/)) {
        return null;
      } else {
        return { 'invalidOTP': true };
      }
    } else {
      return { 'invalidOTP': true };
    }
  }


  static requiredOTPCustome(control) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (control.value.match(/^(?=.*[0-9])[0-9]{4,6}$/)) {
        return null;
      } else {
        return { 'requiredOTPCustome': true };
      }
    } else {
      return { 'requiredOTPCustome': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static panValidator(control) {
    if (control.value) {
      if (control.value.match(/[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}?$/)) {
        return null;
      } else {
        return { 'invalidPAN': true };
      }
    } else {
      return { 'invalidPAN': true };
    }
  }

  static percentageRegex(control) {
    if (control.value) {
      if (control.value.match(/^([1-9]|[0-9][0-9][0-9]?)$/gm)) {
        return null;
      } else {
        return { 'leadingZeroNotAllow': true };
      }
    } else {
      return { 'leadingZeroNotAllow': true };
    }
  }

  static dobValidator(control) {
    if (control.value) {
      if (control.value.match(/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]([0]?[1-9]|[1][0-2])[/]([0-9]{4}|[0-9]{4})$/)) {
        return null;
      } else {
        return { 'Invaliddob': true };
      }
    } else {
      return { 'Invaliddob': true };
    }
  }


  static onlyRequired(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'only required': true };
  }

  static onlyCheckboxRequired(control: FormControl) {
    if (control.value) {
      const isWhitespace = control.value.length === 0;
      const isValid = !isWhitespace;
      return isValid ? null : { 'only required': true };
    } else {
      return { 'only required': true };
    }
  }

  static required(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'required': true };
  }

  static requiredWithCustome(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'requiredCustome': true };
  }

  static pincodeValidator(control) {
    // RFC 2822 compliant regex
    if (control.value) {
      if (control.value.match(/^(?=.*[0-9])[0-9]{6,6}$/)) {
        return null;
      } else {
        return { 'PINcode': true };
      }
    } else {
      return { 'PINcode': true };
    }
  }

  // Validate all fields on submit
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
