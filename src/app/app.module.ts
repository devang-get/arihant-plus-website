import { TranslationService } from './services/translation.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserCookiesModule } from '@ngx-utils/cookies/browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';

import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from './shared/shared.module';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS, HttpParams } from '@angular/common/http';

import { ValidationService } from './services/validation.service';
import { GlobalService } from './services/global.service';

import { environment } from '../environments/environment';
import { HttpinterceptorService } from './services/httpinterceptor.service';
import { SharedVarService } from './services/sharedVar.service';
import { ErrorComponent } from './static-pages/error/error.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PricingComponent } from './pages/pricing/pricing.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

/** For Translation */
export function createTranslateLoader(http: HttpClient) {
  // http['params'] = new HttpParams().set('hideLoader', 'true');
  return new TranslateHttpLoader(http, `${environment.languageParamUrl}i18n/`, '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CommonLayoutComponent,
    ErrorComponent,
    ContactComponent,
    PricingComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslationService,
        // useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    BrowserCookiesModule.forRoot(),
    AppRoutingModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({ timeOut: 4000, positionClass: 'toast-top-right', preventDuplicates: true }),
    SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true },
    ValidationService,
    GlobalService,
    SharedVarService,
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
