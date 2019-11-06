import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  orderCounter = 0;
  orders: Array<object> = [];

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


  saveOrder(order, total, orderNumber) {
    this.orderCounter = this.orderCounter + 1;
    this.orders.push({ id: this.orderCounter, order: order, total: total, onumber: orderNumber });
    return Promise.resolve();
  }

  getOrders() {
    return Promise.resolve(this.orders);
  }

  postOrder(endpoint: string, param, requireToken = true) {
    let headers = new HttpHeaders();
    if (requireToken) {
      headers = this.createAuthHeader(headers);
    }
    return this.http.post(endpoint, param, { headers, observe: 'response' });
  }
}
