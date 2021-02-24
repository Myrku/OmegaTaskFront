import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Token} from '../model/token';
import {JwtHelperService} from '@auth0/angular-jwt';
import {SERVER_API_URL} from '../app-injection-tokens';
import {User} from '../model/User';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

export const ACCESS_TOKEN_KEY = '';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, @Inject(SERVER_API_URL) private apiUrl: string,
              private jwtHelper: JwtHelperService, private router: Router) {
  }

  Login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/auth/sign-in`, user).pipe(
      tap(res => {
        localStorage.setItem(ACCESS_TOKEN_KEY, res.access_token);
        localStorage.setItem('role', res.role);
        this.router.navigate(['']);
      })
    );
  }

  Register(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/auth/sign-up`, user).pipe();
  }

  isAdmin(): boolean {
    const role = localStorage.getItem('role');
    return role === '1';
  }
  isAuth(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  Logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }
}
