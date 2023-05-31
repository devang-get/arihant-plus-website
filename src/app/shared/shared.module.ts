import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ControlMessagesComponent } from './control-messages/control-messages.component';
import { TemplateErrorMessagesComponent } from './template-error-messages/template-error-messages.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DownloadComponent } from './download/download.component';
import { PricingCardComponent } from './pricing-card/pricing-card.component';
import { TestimonialComponent } from './testimonial/testimonial.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ControlMessagesComponent,
    TemplateErrorMessagesComponent,
    DownloadComponent,
    PricingCardComponent,
    TestimonialComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    ControlMessagesComponent,
    TemplateErrorMessagesComponent,
    DownloadComponent,
    TestimonialComponent,
    PricingCardComponent,
  ],
  providers: [
    ControlMessagesComponent
  ]
})
export class SharedModule { }
