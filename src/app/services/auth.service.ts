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

  constructor(private http: HttpClient, @Inject(SERVER_API_URL) private apiUrl: string, private jwtHelper: JwtHelperService, private router: Router) {
  }

  login(user: User): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/api/auth/sign-in`, user).pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
        this.router.navigate(['']);
      })
    );
  }

  isAuth(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }

  registerUser(username: string, email: string, password: string): void {

  }
}
