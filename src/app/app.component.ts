import { SharedVarService } from './services/sharedVar.service';
import { Component, Inject, PLATFORM_ID, ChangeDetectorRef, Input } from '@angular/core';
import { GlobalService } from './services/global.service';
import { isPlatformBrowser } from '@angular/common';
import { CookiesService } from "@ngx-utils/cookies";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ekyc';
  browserLanguage: any;
  language = 'en';
  isPlatformBrowser: boolean;
  loader: boolean;
  contentData: any;

  constructor(
    private cd: ChangeDetectorRef,
    public global: GlobalService,
    private cookie: CookiesService,
    private sharedVarService: SharedVarService,
    @Inject(PLATFORM_ID) private platform: Object
  ) {
    this.isPlatformBrowser = isPlatformBrowser(this.platform);
    const selectedLanguage = this.cookie.get('language');
    if (!selectedLanguage) {
      this.browserLanguage = this.browserLanguage || 'en';
      this.cookie.put('browserLanguage', this.browserLanguage);
    } else {
      this.global.setLanguage(false);
    }

  }

  showLoader() {
    this.loader = true;
  }

  hideLoader() {
    this.loader = false;
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  changeOfRoutes() {
    const element = document.getElementById('bodyId');
    const isClassAvailable = document.getElementById('navbarNavAltMarkup');
    if (element) {
      element.classList.remove('my-class');
    }
  }



}
