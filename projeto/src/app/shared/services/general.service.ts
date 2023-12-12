import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginInterface } from '../interfaces/login';
import { RegisterInterface } from '../interfaces/register';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  private apiUrl = '';
  constructor(protected httpClient: HttpClient) { }

  login(data: LoginInterface): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.httpClient.post(url, data);
  }

  cadastrar(data: RegisterInterface): Observable<any> {
    const url = `${this.apiUrl}/cadastrar`;
    return this.httpClient.post(url, data);
  }
}

