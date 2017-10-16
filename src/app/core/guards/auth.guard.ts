import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Injectable, OnDestroy } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';



@Injectable()
export class CanActivateViaAuthGuard implements CanActivate, OnDestroy{
  isAuthenticated: boolean;
  subscription: Subscription;

  constructor(
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, ) {
    let isAuthenticated =  localStorage.getItem('token') ? true: false;
    this.isAuthenticated = isAuthenticated;
    if (!isAuthenticated) {
      this.router.navigate(
        ['/auth/login'],
        { queryParams: { returnUrl: '' }}
      );
    }
    
    return this.isAuthenticated;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
