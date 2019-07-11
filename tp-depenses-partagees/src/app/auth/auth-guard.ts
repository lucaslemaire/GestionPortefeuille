import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private  router: Router,
              private  auth: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      // renvoie true si l'utilisateur est connecté
      return true;
    }
    // Les utilisateurs non connectés sont redirigés vers la page de connexion (en préservant la route d'origine dans returnUrl)
    this.router.navigate(['/login'], {
      queryParams: {
        returnUrl:
        state.url
      }
    });
  }
}
