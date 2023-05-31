import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedVarService } from './sharedVar.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CookiesService } from "@ngx-utils/cookies";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseUrl = environment.baseUrl + 'api/';
  isLogin = false;
  isLoading = false;
  language: any = this.cookie.get('browserLanguage') || 'en';
  changableImages: any;
  eye_img: any = 'assets/images/eye-close.svg';
  companyLogoUrl: any = environment.logo_url;
  // companyLogoUrlWT: any = environment.logo_url_wt;
  live_register_page: any = environment.login_redirect_page;
  explore_web_url: any = environment.explore_web_url;
  mutualfund_web_url: any = environment.mutualfund_web_url;
  aboutus_web_url: any = environment.aboutus_web_url;
  home_url: any = environment.home_url;
  goals_url: any = environment.goals_url;
  calculators_url: any = environment.calculators_url;
  culture_url: any = environment.culture_url;
  career_url: any = environment.career_url;
  googleSignUpUrl: any = environment.googleSignUpUrl;
  facebookSignupUrl: any = environment.facebookSignupUrl;
  appleSignUpUrl: any = environment.appleSignupUrl;
  blogUrl: any = environment.blogUrl;
  faqUrl: any = environment.faq_url;
  nfoUrl: any = environment.nfo_url;
  commonConfigFlow: any;
  loaderText = 'Good things take time.. Hold on..';
  clientLogin: any = environment.clientLogin;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private cookie: CookiesService,
    private sharedVarService: SharedVarService,
  ) {
    this.sharedVarService.getConfigFlowData().subscribe((res: any) => {
      if (res) {
        this.commonConfigFlow = res;
      }
    })
  }

  /** set language */
  setLanguage(showToaster: boolean = true) {
    const language = this.cookie.get('language');
    this.language = language;
    // this.translate.use(this.language).subscribe(() => {
    //   if (showToaster) {
    //     this.toastr.success(this.translate.instant('LANG_CHANGE_SUCC'));
    //   }
    // });
  }

  globalLoaderMessage(text: any = '') {
    this.loaderText = 'Good things take time.. Hold on..';
    if (text) {
      this.loaderText = text;
    }
  }

  globalLoader(isLoading: boolean = false) {
    this.isLoading = isLoading;
  }

  /**
   * Delete multiple cookie as per passed array
   */
  deleteMultiCookies(cookieParams: any) {
    cookieParams.map((item: any) => {
      this.cookie.remove(item);
    });
  }
  /**
   * get expired time or set expired time
   */
  getCookieExpiredTime() {
    const date = new Date();
    date.setTime(date.getTime() + (10 * 60 * 1000)); // for 10 minute
    // const time = date.getTime() + (60 * 60 * 1); // in hours
    return date;
  }

  getCookieExpiredAuthTokenTime() {
    const date = new Date();
    date.setTime(date.getTime() + (8 * 60 * 60 * 1000)); // for Hours
    return date;
  }

  getCookieExpiredRMTime() {
    const date = new Date();
    date.setTime(date.getTime() + (3 * 8760 * 60 * 60 * 1000)); // for Hours
    return date;
  }

  /**
   * password text or password as per eye icon toggle
   * @param value 
   */
  current_password(value: any = '') {
    const input = document.getElementById(value);
    if (input.getAttribute('type') === 'password') {
      input.setAttribute('type', 'text');
      return (<HTMLInputElement>document.getElementById(value + 'img')).setAttribute('src', 'assets/images/eye.svg');
    } else {
      input.setAttribute('type', 'password');
      return (<HTMLInputElement>document.getElementById(value + 'img')).setAttribute('src', 'assets/images/eye-close.svg');
    }
  }

  /**
   * Success Toastr
   */
  successToastr(message: any, title: any = 'Success') {
    this.toastr.success(message, title);
  }

  /**
   * Warning Toastr
   */
  warningToastr(message: any, title: any = 'Warning') {
    this.toastr.warning(message, title);
  }

  /**
   * Error Toastr
   */
  errorToastr(message: any, title: any = 'Error') {
    this.toastr.error(message, title);
  }



  /**
   * Scroll up at zero level of window
   */
  onActivate() {
    window.scroll(0, 0);
  }



  /**
   * Common validation of auth fields
   */
  commonValidation(data: any = '', hideLoader: boolean = false): Observable<any> {
    let options = {}
    if (hideLoader) {
      const params = new HttpParams().set('hideLoader', 'true');
      options = { params: params };
      options['reportProgress'] = true;
      options['observe'] = 'events';
    }
    data['login_type'] = environment.login_type; // login_type = Mobile_OTP, Email_Password, Pan_DOB
    return this.http.post<any>(`${environment.baseUrl}api/commonValidation`, data, options);
  }

  getBrokerPlans(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}api/getBrokerPlans`);
  }

  getBrokeragePlanList(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrlOfUser}api/getBrokeragePlanList`);
  }





}
