import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  AuthState,
  ProfileResponse
} from './auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_BASE = 'http://localhost:8080';

  private authState = signal<AuthState | null>(null);

  constructor(private http: HttpClient) {
    this.loadAuthFromStorage();
  }


  login(request: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${this.API_BASE}/api/auth/login`, request)
      .pipe(
        tap((response) => {
          const expiresAt =
            Date.now() + response.expiresIn * 1000;

          const state: AuthState = {
            token: response.token,
            tokenType: response.tokenType,
            expiresAt,
            roles: response.roles,
            userId: -1,
          };

          this.saveAuthState(state);
          this.fetchAndStoreUserId();
        })
      );
  }

  register(request: RegisterRequest) {
    return this.http.post<RegisterResponse>(
      `${this.API_BASE}/api/auth/register`,
      request
    );
  }

  private fetchAndStoreUserId() {
    const token = this.getToken();
    if (!token) return;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<any>(`${this.API_BASE}/api/auth/validate`, { headers })
      .subscribe((claims) => {
        const current = this.authState();
        if (!current) return;

        const updated: AuthState = {
          ...current,
          userId: claims.userId,
        };

        this.saveAuthState(updated);
      });
  }

  isLoggedIn(): boolean {
    const state = this.authState();
    return !!state && state.expiresAt > Date.now();
  }

  getToken(): string | null {
    return this.authState()?.token ?? null;
  }

  getUserId(): number | null {
    return this.authState()?.userId ?? null;
  }

  getRoles(): string[] {
    return this.authState()?.roles ?? [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  logout() {
    this.authState.set(null);
    localStorage.removeItem('auth_state');
  }

  
  private saveAuthState(state: AuthState) {
    this.authState.set(state);
    localStorage.setItem('auth_state', JSON.stringify(state));
  }

  private loadAuthFromStorage() {
    const raw = localStorage.getItem('auth_state');
    if (!raw) return;

    const state: AuthState = JSON.parse(raw);
    this.authState.set(state);
  }

  getProfile() {
  return this.http.get<ProfileResponse>(
    `${this.API_BASE}/api/auth/profile`
  );
}

}
