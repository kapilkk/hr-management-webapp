import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, TimeoutError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    //token for the logged in user
    const token = localStorage.getItem('jwt');
    //console.log("AUTH GUARD:", token);

    //checking if token is available
    if (token == null) {
      this._router.navigate(['/auth/login']);
      return false;
    }

    return true;
  }

}
