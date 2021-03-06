import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
 
  
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('auth', this.authService.authenticated)
      if(!this.authService.authenticated) return true; //&& this.authService.authState.emailVerified

    console.log('no access');
    this.router.navigate(['/home'])

    return false;
  }
}