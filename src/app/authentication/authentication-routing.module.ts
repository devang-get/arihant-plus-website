import { NgModule, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Routes, RouterModule, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { GlobalService } from '../services/global.service';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [

  {
    // canActivate: [RouteGuard],
    path: '',
    component: RegisterComponent,
    data: {
      title: 'Register'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }



