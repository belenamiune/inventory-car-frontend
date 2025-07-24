import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPayload, AuthResponse, RegisterPayload } from '../models/auth.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:4000/api/auth'; 

  constructor(private http: HttpClient) {}

  login(data: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, data);
  }

  register(data: RegisterPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
}
