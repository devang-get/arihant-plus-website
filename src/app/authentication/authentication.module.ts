import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from '../shared/pipes/PipesModule';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './authentication.service';

import { RegisterComponent } from './register/register.component';
import { NgxMaskModule } from 'ngx-mask';
import { CommonLeftportionComponent } from './common-leftportion/common-leftportion.component';
import { InputMaskModule } from 'racoon-mask-raw';
import { CommonBannerImageComponent } from './common-banner-image/common-banner-image.component';

@NgModule({
  declarations: [RegisterComponent, CommonLeftportionComponent, CommonBannerImageComponent],
  imports: [
    CommonModule,
    TranslateModule,
    NgbModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    InputMaskModule,
    AuthenticationRoutingModule,
    PipesModule,
  ],
  providers: [
    AuthenticationService
  ],
  exports: [CommonLeftportionComponent]
})
export class AuthenticationModule { }
