import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BackendService } from '../_services/backend.service';

@Injectable({
  providedIn: 'root'
})
export class HrGuard implements CanActivate {

  constructor(private _backendService: BackendService, private _router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    //fetching current employee
    return this._backendService.getCurrentEmployee().pipe(
      map((employee: any) => employee.role === "HR" ? true : false),
      tap(is_hr => {
        //checking if current employee is hr
        //if not then redirect to dashboard
        if (!is_hr) {
          this._router.navigate(['/dashboard']);
        }
      })
    );
  }

}
