import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonLayoutComponent } from './layouts/common-layout/common-layout.component';
import { AuthGuard } from './guard/auth.guard';
import { ErrorComponent } from './static-pages/error/error.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PricingComponent } from './pages/pricing/pricing.component';


const routes: Routes = [
  {
    path: '', component: CommonLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
      },
      {
        path: 'error',
        component: ErrorComponent,
        data: { title: 'Error' }
      },
      { path: '', redirectTo: '/', pathMatch: 'full' }
    ]
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'pricing',
    component: PricingComponent,
  },
  { path: '**', redirectTo: 'error' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
