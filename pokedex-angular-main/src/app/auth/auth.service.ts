import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  /**
   * Realiza o login do usuário
   */
  public login(payload: { email: string; password: string }) {

    return this.http
      .post<{ token: string }>(`${this.url}/sign`, payload)
      .pipe(

        tap((res) => {

          // Salva o token
          localStorage.setItem('access_token', res.token);

          // Redireciona para a Home
          this.router.navigate(['/home']);

        }),

        catchError((e) => {

          if (e.error?.message) {
            return throwError(() => e.error.message);
          }

          return throwError(() =>
            'Erro ao realizar login. Tente novamente.'
          );

        })

      );

  }

  /**
   * Remove o token e volta para o Login
   */
  public logout(): void {

    localStorage.removeItem('access_token');

    this.router.navigate(['/login']);

  }

  /**
   * Retorna o token salvo
   */
  public getToken(): string | null {

    return localStorage.getItem('access_token');

  }

  /**
   * Verifica se o usuário está autenticado
   */
  public isAuthenticated(): boolean {

    const token = this.getToken();

    if (!token) {
      return false;
    }

    const jwtHelper = new JwtHelperService();

    return !jwtHelper.isTokenExpired(token);

  }

  /**
   * Retorna os dados do usuário armazenados no JWT
   */
  public getUser() {

    const token = this.getToken();

    if (!token) {
      return null;
    }

    const jwtHelper = new JwtHelperService();

    return jwtHelper.decodeToken(token).data;

  }

}