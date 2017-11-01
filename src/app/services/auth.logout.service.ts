import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
@Injectable()
export class AuthLogout implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        if (localStorage.getItem('userInfo')) {

            this.router.navigate(['/home']);

            return false;

        } else {
            return true;
        }

    }
}