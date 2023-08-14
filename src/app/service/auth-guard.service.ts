import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

/**
 *  Route is only open when user is authenticate or base on some condition.
 *  Check condition in if condition.
 **/
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router) { }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      //check some condition
      const token = localStorage.getItem('access-token');
      console.log('token token', token);
      if (!token)  {
        console.log('in if condition');
        this._router.navigateByUrl('/login');
        return false;
      }
     return true;
    }
}
