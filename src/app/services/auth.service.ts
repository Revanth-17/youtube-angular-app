import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal(false);

  login(): void {
    // Redirect to backend OAuth2 login
    const redirectUri = encodeURIComponent('http://localhost:4200/dashboard'); // or your frontend URL
    window.location.href = `${environment.apiUrl}/oauth2/authorize?redirect_uri=${redirectUri}`;
    // window.location.href = `${environment.apiUrl}/oauth2/authorize`;
    this.isLoggedIn.set(true);
  }
}
