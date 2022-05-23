import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

export interface SignUpData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface AuthData {
  accessToken: string;
  user: {
    name: string;
    surname: string;
    email: string;
    id: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public jwt = new JwtHelperService();
  public URL = 'http://localhost:4201';
  public authSubject = new BehaviorSubject<AuthData | null>(null);
  public user$ = this.authSubject.asObservable();
  public loggedUser$ = this.user$.pipe(map(user => !!user));
  public expirationCountdown: any;

  constructor(private router: Router, private http: HttpClient) {
    this.refreshToken();
  }

  public signin(data: { email: string; password: string }) {
    return this.http.post<AuthData>(`${this.URL}/login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.authSubject.next(data);
        sessionStorage.setItem('users', JSON.stringify(data));
        const expiration = this.jwt.getTokenExpirationDate(
          data.accessToken
        ) as Date;
        this.autoLogout(expiration);
      }),
      catchError(this.showErrors)
    );
  }

  public signup(data: SignUpData) {
    return this.http
      .post(`${this.URL}/register`, data)
      .pipe(catchError(this.showErrors));
  }

  public logout() {
    this.authSubject.next(null);
    localStorage.removeItem('user');
    if (this.expirationCountdown) {
      clearTimeout(this.expirationCountdown);
    }
  }

  public autoLogout(expiration: Date) {
    const expMs = expiration.getTime() - new Date().getTime();
    this.expirationCountdown = setTimeout(() => {
      this.logout();
    }, expMs);
  }

  public refreshToken() {
    const userStorage = sessionStorage.getItem('user');
    if (!userStorage) {
      return;
    }
    const user: AuthData = JSON.parse(userStorage);
    if (this.jwt.isTokenExpired(user.accessToken)) {
      console.log(user.accessToken);
      return;
    }
    this.authSubject.next(user);
    const expiration = this.jwt.getTokenExpirationDate(
      user.accessToken
    ) as Date;
    console.log(expiration);
    this.autoLogout(expiration);
  }

  public showErrors(err: any) {
    switch (err.error) {
      case 'Email and password are required':
        return throwError(() => new Error('Email and password are required'));
        break;
      case 'Email already exists':
        return throwError(() => new Error('Email already exists'));
        break;
      case 'Email format is invalid':
        return throwError(() => new Error('Email format is invalid'));
        break;
      case 'Cannot find user':
        return throwError(() => new Error('User not found'));
        break;
      default:
        return throwError(() => new Error('Bad Request'));
        break;
    }
  }
}
