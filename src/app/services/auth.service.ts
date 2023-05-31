import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import 'rxjs/add/operator/map';
import { BehaviorSubject, Observable } from 'rxjs';
import { SharedVarService } from './sharedVar.service';
import { GlobalService } from './global.service';
import { CookiesService } from "@ngx-utils/cookies";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  currentUser = '';
  userData: any = [];

  constructor(
    private router: Router,
    private cookies: CookiesService,
    private authenticationService: AuthenticationService,
    private sharedVarService: SharedVarService,
    public global: GlobalService,
    private translate: TranslateService
  ) {
    // this.isTokenExpired();
  }

  // Check token valid or not
  async isTokenExpired() {
    const token = this.cookies.get('user_auth_token');

  }

  /**
   * Logout user and cleat storage
   */
  logout() {
    this.global.deleteMultiCookies(['user', 'user_mobile', 'login_user_token', 'user_token', 'user_auth_token', 'mfapp']);
    this.loggedIn = false;
    this.sharedVarService.setValue(false);
    this.sharedVarService.setLoggedUserInfoValue('');
    this.sharedVarService.setStepsInfo('');
    this.global.successToastr(this.translate.instant('logout_message'), 'Goodbye!');
    let rmcode = '';
    if (window.localStorage.getItem('rmcode')) {
      rmcode = window.localStorage.getItem('rmcode');
    }
    if (rmcode) {
      this.router.navigate([`/`], { queryParams: { 'rmcode': rmcode } });
    } else {
      this.router.navigate([`/`]);
    }
  }
  // decode token
  decodeUserFromToken(token) {
    // return this.jwtHelper.decodeToken(token);
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser = decodedUser;
    this.sharedVarService.setLoggedUserInfoValue(decodedUser);
  }





}
