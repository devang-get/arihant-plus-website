import { Component, ElementRef, Input, OnInit, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from 'src/app/services/global.service';
import { CookiesService } from "@ngx-utils/cookies";
import { NgbDatepicker, NgbDatepickerConfig, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmation-dialoge.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedVarService } from 'src/app/services/sharedVar.service';


declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChild('dp') dp: NgbDatepicker;
  @ViewChild("myinput") myInputField: ElementRef;
  env = environment;

  public registerform: FormGroup;
  code: string;
  rmcode: string;
  eye_img: any = 'assets/images/eye-close.svg';
  commonConfigFlow: any;
  contentData: any;
  loginInformationText: any;
  faqUrl = `${environment.faqUrl}`;
  referenceSourceQueryParam: any;
  isAvailableRMCODE: boolean;
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public validate: ValidationService,
    private cookieService: CookiesService,
    public authenticationService: AuthenticationService,
    config: NgbDatepickerConfig,
    public global: GlobalService,
    private sharedVarService: SharedVarService,
    private confirmationDialogService: ConfirmationDialogService,
    private translate: TranslateService
  ) {
    const currentDate = new Date();
    config.minDate = { year: 1947, month: 1, day: 1 };
    config.maxDate = { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() };
    config.outsideDays = 'hidden';

    this.sharedVarService.getSiteContentData().subscribe((res: any) => {
      this.contentData = res;
    });
  }


  formControlValueChanged() {
    this.registerform.get('pan_username').valueChanges.subscribe(
      (mode: string) => {
        // console.log(mode);
      });
  }

  removeRmCode() {
    this.rmcode = '';
    this.cookieService.remove('rmcode');
  }

  ngOnInit(): void {
    // console.log(this.translate.instant('greeting', { name: 'John' }));

    if (this.cookieService.get('rmcode')) {
      this.rmcode = this.cookieService.get('rmcode');
    }
    this.global.globalLoaderMessage();
    const deleteCookieArray = ['email', 'user_token', 'user_mobile', 'user_auth_token'];
    this.global.deleteMultiCookies(deleteCookieArray);
    window.localStorage.removeItem('rmcode');
    this.route.queryParams.subscribe(params => {
      if (params['rmcode']) {
        this.rmcode = params['rmcode'];
        this.cookieService.put('rmcode', this.rmcode, { expires: this.global.getCookieExpiredRMTime() });
        // window.localStorage.setItem('rmcode', this.rmcode);
      }
      if (params['code']) {
        this.code = params['code'];
      }
      if (params['referencesource']) {
        this.referenceSourceQueryParam = params['referencesource'];
      }
      window.localStorage.setItem('mfapp', '0');
      if (params['mfapp'] === true || params['mfapp'] === 'true') {
        window.localStorage.setItem('mfapp', '1');
      }
    });


    this.setMobileValidateTheForm();

  }


  ngAfterViewInit() {
    setTimeout(() => {
      if (this.myInputField) {
        this.myInputField.nativeElement.focus();
      }
    }, 1000);
  }


  get password() { return this.registerform.get('password'); }

  current_password(value) {
    const input = document.getElementById(value);
    if (input.getAttribute('type') === 'password') {
      input.setAttribute('type', 'text');
      (<HTMLInputElement>document.getElementById(value + 'img')).setAttribute('src', 'assets/images/eye-close.svg');
    } else {
      input.setAttribute('type', 'password');
      (<HTMLInputElement>document.getElementById(value + 'img')).setAttribute('src', 'assets/images/eye.svg');
    }
  }



  /**
   * Set Mobile validation form for mobile OTP login type
   */
  setMobileValidateTheForm() {
    this.registerform = this.fb.group({
      mobilenumber: ['', Validators.compose([ValidationService.mobileNumberCustomeValidator, Validators.maxLength(10), ValidationService.mobileNumberCustomeValidator])]
    });
  }

  onSubmit() {

    if (this.registerform.valid) {
      const obj = {};
      let paramObj: any = {};
      if (this.rmcode) {
        paramObj['rmcode'] = this.rmcode;
      } else if (this.cookieService.get('rmcode')) {
        this.rmcode = this.cookieService.get('rmcode');
        paramObj['rmcode'] = this.rmcode;
      }
      if (this.referenceSourceQueryParam) {
        paramObj['referencesource'] = this.referenceSourceQueryParam;
      }
      if (this.code) {
        obj['code'] = this.code;
      }
      paramObj['mobile_number'] = this.registerform.value.mobilenumber;
      paramObj['referencesource'] = 'arihantplus';

      // console.log('paramObj', paramObj);
      this.authenticationService.commonLoginApi(paramObj).subscribe((res: any) => {
        if (res.success) {
          if (res.result) {
            const url = `https://signup.arihantplus.com/mobile-verify?params=${res?.result}`;
            window.location.href = url;
          }
        } else {

        }
      }, error => {

      });

    } else {
      this.validate.validateAllFormFields(this.registerform);
      this.global.errorToastr(this.translate.instant('PLEASE_FILL_ALL_REQUIRED_FIELDS'));
    }
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  whatsAppLink() {
    const url = `https://api.whatsapp.com/send?phone=917314217003`;
    window.open(url, '_blank');
    // window.location.href = 'https://api.whatsapp.com/send?phone=917314217003';
  }
}
