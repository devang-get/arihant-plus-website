import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { AuthenticationService } from '../authentication/authentication.service';
import { GlobalService } from '../services/global.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CookiesService } from "@ngx-utils/cookies";
import { SharedVarService } from "../services/sharedVar.service";

@Injectable()
export class RouteGuard implements CanActivate { // without login not redirect to inner pages
  userLoginId: any;
  commonConfigFlow: any;
  constructor(private router: Router,
    private cookies: CookiesService,
    private global: GlobalService,
    private authenticationService: AuthenticationService,
    private sharedVarService: SharedVarService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const userData = JSON.parse(localStorage.getItem('userData'));
    const token = this.getCookie();
    if (!token) {
      return true;
    }
    const emailToken = route?.params?.emailToken;
    const currentRoute = route?.routeConfig?.path;
    if (currentRoute.match('mobile-verify') || currentRoute.match('register-mobile-number') || currentRoute.match('email-verify') || currentRoute.match('register-email') || currentRoute.match('register-pan-dob') || currentRoute.match('photograph')) {
      const token = this.getCookie();
      if (token) {
        // this.loggedIn = true;
        this.sharedVarService.setValue(true);
      }
      if (!token) {
        await this.getSharedConfigFlow();
        await this.getAuthStepInfo();
        await this.getSiteContent();
        return false;
      }
      // this.authenticationService.emailVerification(emailToken).subscribe((res: any) => {
      //   if (res.success) {
      //     this.global.successToastr(res.message);
      //   } else {
      //     this.global.errorToastr(res.message);
      //   }
      //   this.router.navigate(['/']);
      // }, (error: HttpErrorResponse) => {
      //   if (error.status === 400) {
      //     this.router.navigate(['/']);
      //   }
      // });

      return true;
    }
    //  else if (!currentRoute) {
    //   const deleteCookieArray = ['user_auth_token', 'user_token'];
    //   this.global.deleteMultiCookies(deleteCookieArray);
    //   return true;
    // }
    // const userData: any = this.getDataLocally('userData');
    // if (!userData || !userData.token) {
    //   return true;
    // }

    // this.router.navigate(['welcome']);

    await this.getSharedConfigFlow();
    await this.getAuthStepInfo();
    await this.getSiteContent();
    // this.global.onActivate();
    // this.sharedVarService.setActivePageInfoValue('welcome');
    // this.router.navigate(['/welcome']);
    return false;
  }

  getCookie() {
    return this.cookies.get('user_auth_token');
  }

  getSharedConfigFlow() {

    this.sharedVarService.getConfigFlowData().subscribe((res: any) => {
      if (res) {
        this.commonConfigFlow = res;
      } else {
        this.global.setConfigFlow();
      }
    });
  }

  getAuthStepInfo() {
    this.sharedVarService.getConfigStepData().subscribe((res: any) => {
      if (res) {
        this.getCheckConfigInfo(res);
      } else {
        this.getAuthStepInfoCheck();
      }
    });
  }

  getAuthStepInfoCheck() {
    this.global.configInfo().subscribe((res: any) => {
      if (res.success) {
        if (res?.result?.config_info) {
          this.getCheckConfigInfo(res?.result?.config_info);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        this.global.deleteMultiCookies(['user_token', 'user_mobile', 'otpMaxTime', 'user_auth_token']);
        this.router.navigate(['/']);
      }
    }, error => {
      this.global.deleteMultiCookies(['user_token', 'user_mobile', 'otpMaxTime', 'user_auth_token']);
      this.router.navigate(['/']);
    });
  }

  /**
   * Get set up content
   */
  getSiteContent() {
    // const obj = { 'login_type': 'Mobile_OTP' };
    this.global.getSiteContent().subscribe((res: any) => {
      if (res.success) {
        this.sharedVarService.setSiteContentData(res.result);
      }
    }, error => {
    })
  }

  /**
   * Get check config info of steps
   */
  getCheckConfigInfo(config_info: any) {
    this.sharedVarService.setConfigStepData(config_info);
    if (!config_info.step_2) {
      if (this.commonConfigFlow.step2 === 'email') {
        this.router.navigate(['register-email']);
      } else if (this.commonConfigFlow.step2 === 'pan_dob') {
        this.router.navigate(['register-pan-dob']);
      } else if (this.commonConfigFlow.step2 === 'mobile') {
        this.router.navigate(['register-mobile-number']);
      } else if (this.commonConfigFlow.step2 === 'otp') {
        this.router.navigate(['mobile-verify']);
      } else {
        this.router.navigate(['welcome']);
      }
    } else if (!config_info.step_3) {
      if (this.commonConfigFlow.step3 === 'email') {
        this.router.navigate(['register-email']);
      } else if (this.commonConfigFlow.step3 === 'pan_dob') {
        this.router.navigate(['register-pan-dob']);
      } else if (this.commonConfigFlow.step3 === 'mobile') {
        this.router.navigate(['register-mobile-number']);
      } else if (this.commonConfigFlow.step3 === 'otp') {
        this.router.navigate(['mobile-verify']);
      } else {
        this.router.navigate(['welcome']);
      }
    } else if (!config_info.step_4) {
      if (this.commonConfigFlow.step4 === 'email') {
        this.router.navigate(['register-email']);
      } else if (this.commonConfigFlow.step4 === 'pan_dob') {
        this.router.navigate(['register-pan-dob']);
      } else if (this.commonConfigFlow.step4 === 'mobile') {
        this.router.navigate(['register-mobile-number']);
      } else if (this.commonConfigFlow.step4 === 'otp') {
        this.router.navigate(['mobile-verify']);
      } else {
        this.router.navigate(['welcome']);
      }
    } else {
      this.router.navigate(['welcome']);
    }
  }


  getDataLocally(key: string) {
    const userData: any = localStorage.getItem(key);
    // const userData: any = this.cookies.get(key);
    return userData ? JSON.parse(userData) : '';
  }
}