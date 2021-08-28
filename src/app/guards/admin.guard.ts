import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router : Router, private token: TokenStorageService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

      const role = this.token.getUser().roles;
      const admin = "ROLE_ADMIN";
      let result = '';

      for (let i = 0; i < role.length; i++) {
        if(role[i] === admin) {
          return true;

        } else {
          this.router.navigate(['notfound']);
          return false;
        }
      }

      if (result === admin) {
        return true;
      } else {
        this.router.navigate(['notfound']);
        return false;
      }
    }
  }
