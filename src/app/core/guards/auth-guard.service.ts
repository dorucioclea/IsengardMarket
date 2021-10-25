import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuardMaintenance implements CanActivate {

  constructor(
    private authService: AuthService, private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.inMaintenance()) {
      this.router.navigate(['/landing']);
      return false;
    } else {
      return true;
    }
  }

}