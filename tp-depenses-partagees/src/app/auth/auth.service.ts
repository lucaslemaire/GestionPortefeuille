import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {User} from './user.model';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HandleError, HttpErrorHandlerService} from '../shared/http-error-handler.service';

// Setup headers
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: User;
  private readonly apiUrl = environment.apiUrl;
  private registerUrl = this.apiUrl + 'register';
  private loginUrl = this.apiUrl + 'login';
  private handleError: HandleError;

  constructor(private  http: HttpClient, private errorHandler: HttpErrorHandlerService, private  router: Router) {
    this.handleError = errorHandler.createHandleError('Service Authentification');

  }

  onRegister(user: User): Observable<{} | User> {
    const request = JSON.stringify(
      {
        nom: user.nom, prenom: user.prenom, email: user.email, password:
        user.password, avatar: 'une image'
      }
    );
    return this.http.post(this.registerUrl, request, httpOptions)
      .pipe(
        map((response: User) => {
          // Reception du jeton
          const token: string = response['access_token'];
          // Si il y a un jeton
          if (token) {
            this.setToken(token);
            this.getUser().subscribe();
          }
          return response;
        }),
        catchError(this.handleError('onRegister', {}))
      );
  }

  onLogin(user: User): Observable<{} | User> {
    const request = JSON.stringify({email: user.email, password: user.password}
    );
    return this.http.post(this.loginUrl, request, httpOptions)
      .pipe(
        map((response: User) => {
          // Reception du jeton
          const token: string = response['access_token'];
          // Si il y a un jeton
          if (token) {
            this.setToken(token);
            this.getUser().subscribe();
          }
          return response;
        }),
        catchError(this.handleError('onLogin', {}))
      );
  }

  onLogout(): Observable<any> {
    return this.http.post(this.apiUrl + 'logout', httpOptions)
      .pipe(
        tap(() => {
          console.log('remove token');
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }));
  }

  setToken(token: string): void {
    return localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getUser(): Observable<User> {
    return this.http.get(this.apiUrl + 'me').pipe(
      tap((user: User) => {
        this.currentUser = user;
      })
    );
  }

  isAuthenticated(): boolean {
    // get the token
    const token: string = this.getToken();
    if (token) {
      return true;
    }
    return false;
  }
}
