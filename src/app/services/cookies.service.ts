import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(private router:Router) { }

  //Get JWT token from cookies (or local storage)
  getToken(): string | null {
    return document.cookie
    .split(';')
    .find(row => row.startsWith('jwt_token'))
    ?.split('=')[1] || null;
  }


  // Check if the token is epired using angular-jwt
  isTokenExpired(token: string): boolean {
    const helper = new JwtHelperService();
    return helper.isTokenExpired(token);
  }

  //Clear JWT ang logout
    logout():void {
      document.cookie = 'jwt_token=; Max-Age=0; path=/;';
      this.router.navigate(['signin']);
    }
}
