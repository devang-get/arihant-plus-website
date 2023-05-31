import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../shared/models/user';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedVarService } from '../services/sharedVar.service';
import { CookiesService } from "@ngx-utils/cookies";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl = environment.baseUrl + 'api/';
  baseUrlOfUser = environment.baseUrlOfUser + 'api/';

  passwordStrength: any;
  passwordErrors: any;
  passwordMaintain = [
    { 'id': 1, 'message': 'Must contain at least 8 letters.' },
    { 'id': 2, 'message': 'Must contain at least one lowercase character(a-z).' },
    { 'id': 3, 'message': 'Must contain at least one uppercase character(A-Z).' },
    { 'id': 4, 'message': 'Must contain at least one special character(eg $).' },
    { 'id': 5, 'message': 'Must contain at least one digit(0-9).' },
  ];
  timeUp: Boolean;
  timerOfOtp: any;
  timerShow: any;

  constructor(
    private http: HttpClient,
    private cookieService: CookiesService,
    private sharedVarService: SharedVarService) {
  }

  /**
   * For login username, email-id
   * @param username
   * @param password  
   */
  register(credentials: User): Observable<any> {
    return this.http.post<any>(this.baseUrl + `checkUsername`, credentials);
  }

  /**
   * For resend otp while login/register
   * @param OTP  
   */
  resendOTP(mobileNumber: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + `resendOtp`, mobileNumber);
  }

  /**
   * Initialize password
   */
  initializePassword() {
    this.passwordMaintain.map((item: any) => {
      item['valid_password_type'] = false;
    });
    this.passwordStrength = '';
  }

  /**
   * Validate password
   * @param event 
   */
  strength(event: any) {
    const password = event.target.value;
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    if (strongRegex.test(password)) {
      this.passwordStrength = 'strong';
    }
    // else if (mediumRegex.test(password)) {
    //   this.passwordStrength = 'medium';
    // } 
    else if (password !== '') {
      this.passwordStrength = 'weak';
    } else {
      this.passwordStrength = '';
    }

    const lowerCaseRegex = new RegExp("^(?=.*[a-z])");
    const upperCaseRegex = new RegExp("^(?=.*[A-Z])");
    var p = password,
      passwordErrors = [];
    if (p.length < 8) {
      passwordErrors.push(1);
    }
    if (!lowerCaseRegex.test(password)) {
      passwordErrors.push(2);
    }
    if (!upperCaseRegex.test(password)) {
      passwordErrors.push(3);
    }
    if (p.search(/[*@!#$%&()^~{}]+/) < 0) {
      passwordErrors.push(4);
    }
    if (p.search(/[0-9]/) < 0) {
      passwordErrors.push(5);
    }
    if (password) {
      this.passwordMaintain.map((item: any) => {
        item['valid_password_type'] = true;
      });
    } else {
      this.passwordMaintain.map((item: any) => {
        item['valid_password_type'] = false;
      });
    }
    if ((passwordErrors.length > 0) && (password)) {
      this.passwordErrors = passwordErrors;
      this.passwordMaintain.map((item: any) => {
        if (passwordErrors.includes(Number(item.id))) {
          item['valid_password_type'] = false;
        }
      });
    } else {
      this.passwordErrors = [];
    }
  }

  destroyTimer() {
    this.timeUp = false;
    this.sharedVarService.setTimerInfoValue(this.timeUp);
    this.sharedVarService.setTimerValue('');
    this.timerShow = '';
    clearInterval(this.timerOfOtp);
  }

  /**
   * Timer Set up for OTP
   */
  timerOtp() {
    this.timeUp = false;
    this.sharedVarService.setTimerInfoValue(this.timeUp);
    this.sharedVarService.setTimerValue('');
    /***************** TIMER OF OTP:START *******************/
    // Set the date we're counting down to
    var oldDateObj = new Date();
    var newDateObj: any = new Date();
    if (this.cookieService.get('otpMaxTime')) {
      newDateObj = this.cookieService.get('otpMaxTime');
      let countDownDate: any = newDateObj;
      // console.log('this.timerShow', this.timerShow, this.timerOfOtp);
      this.timerShow = '';
      this.timerOfOtp = 0;

      // Update the count down every 1 second
      this.timerOfOtp = setInterval(() => {
        var now = new Date().getTime(); // Get today's date and time
        let distance = countDownDate - now;
        // console.log('distance', distance);
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds: any = Math.floor((distance % (1000 * 60)) / 1000);

        seconds = ("0" + seconds).slice(-2);
        this.timerShow = " " + minutes + " : " + seconds;

        this.sharedVarService.setTimerValue(this.timerShow);
        if (distance < 0) {
          this.timerShow = "";
          this.cookieService.remove('otpMaxTime');
          this.timeUp = true;
          this.sharedVarService.setTimerInfoValue(this.timeUp);
          this.sharedVarService.setTimerValue(this.timerShow);
          clearInterval(this.timerOfOtp);
          return false;
        }
      }, 1000);
    } else {
      this.timeUp = true;
      this.sharedVarService.setTimerInfoValue(this.timeUp);
    }
    /***************** TIMER OF OTP:STOP *******************/
  }

  /**
  * For register mobile number, email-id
  * @param mobilenumber
  */
  commonLoginApi(credentials: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}encryptData`, credentials);
  }
}
