import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string;
  constructor(
    private http: HttpClient,
  ) {
    this.token = localStorage.getItem("token");
  }
  createAuthHeader(headers: HttpHeaders) {
    headers = headers.append('Authorization', `Bearer ${this.token}`);
    return headers;
  }

  httpGet(endpoint: string, param, requireToken = true) {
    let headers = new HttpHeaders();
    if (requireToken) {
      headers = this.createAuthHeader(headers);
    }
    const routeParam = param ? endpoint + param : endpoint;
    return this.http.get(routeParam, { headers, observe: 'response' });
  }
}
