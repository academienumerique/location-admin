import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // Gérer la redirection ou la logique appropriée ici, par exemple, rediriger vers la page de connexion.
      return false;
    }
  }
}
