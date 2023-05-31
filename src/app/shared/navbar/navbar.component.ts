import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GlobalService } from 'src/app/services/global.service';
import { SharedVarService } from 'src/app/services/sharedVar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookiesService } from "@ngx-utils/cookies";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() scrolToTargetEvent = new EventEmitter<string>();
  // @ViewChild('logoutapp') logoutApplicationModal: any;
  public isLoggedIn: any = false;
  getUserInfo: any;
  public flag: boolean;
  contentData: any;
  logoutPopupText: any;
  constructor(
    public translate: TranslateService,
    public global: GlobalService,
    private serviceVarService: SharedVarService,
    private cookie: CookiesService,
    private modalService: NgbModal,
  ) {
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void { }

  onChangeLanguage(language) {
    this.cookie.put('language', language);
    this.global.setLanguage(true);
  }

}
