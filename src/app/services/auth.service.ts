import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, LoginResponse } from '../models/homeservices';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://localhost:7025/api/auth';

  constructor(private http: HttpClient) {}

  login(dto: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, dto);
  }

  logout() {
    localStorage.clear();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
registerClient(user: any) {
  return this.http.post('https://localhost:7025/api/user', user);
}
sendPasswordRecoveryEmail(email: string) {
  return this.http.post(`https://localhost:7025/api/Auth/send-recovery-email`, { email });
}
resetPassword(email: string, token: string, newPassword: string) {
  let params = new HttpParams();
       if (email) params = params.set('email', email);
       if (token) params = params.set('token', token);
       if (newPassword) params = params.set('newPassword', newPassword);
  return this.http.post<any>('https://localhost:7025/api/Auth/reset-password', {email, token, newPassword});
}

}