import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import * as jwt_decode from 'jwt-decode';


@Injectable()
export class AuthentificationGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (localStorage.getItem('USER_TOKEN')) {
      const decoded = jwt_decode(localStorage.getItem('USER_TOKEN'));
      if (decoded.exp > new Date().getTime() / 1000) {
        console.log('valid token');
        return true;
      } else {
        console.log('invalid token, let\'s log in');
        localStorage.clear();
        this.router.navigate(['login']);
        return (false);
      }
    } else {
      console.log('invalid token, let\'s log in');
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }
}
