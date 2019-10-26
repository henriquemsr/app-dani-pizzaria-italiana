import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginService {
  token: string;
  constructor(
    private http: HttpClient,
  ) { }

  createAuthHeader(headers: HttpHeaders) {
    headers = headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }

  httpPost(endpoint: string, param, requireToken = true) {
    let headers = new HttpHeaders();
    if (requireToken) {
      headers = this.createAuthHeader(headers);
    }
    return this.http.post(endpoint, param, { headers, observe: 'response' });
  }

}
