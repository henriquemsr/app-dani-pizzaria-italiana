import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import restaurants from './mock-restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  favoriteCounter = 0;
  favorites: Array<any> = [];
  restaurants: Array<any> = restaurants;
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


  findAll() {
    return Promise.resolve(restaurants);
  }

  getRestaurants() {
    return this.restaurants;
  }

  findById(id) {
    return Promise.resolve(restaurants[id - 1]);
  }

  getItem(id) {
    for (let i = 0; i < this.restaurants.length; i++) {
      if (this.restaurants[i].id === parseInt(id)) {
        return this.restaurants[i];
      }
    }
    return null;
  }

  findByName(searchKey: string) {
    const key: string = searchKey.toUpperCase();
    return Promise.resolve(restaurants.filter((restaurant: any) =>
      (restaurant.title + ' ' + restaurant.address + ' ' + restaurant.city + ' ' +
        restaurant.description).toUpperCase().indexOf(key) > -1));
  }

  getFavorites() {
    return Promise.resolve(this.favorites);
  }

  favorite(restaurant) {
    this.favoriteCounter = this.favoriteCounter + 1;
    this.favorites.push({ id: this.favoriteCounter, restaurant: restaurant });
    return Promise.resolve();
  }

  unfavorite(favorite) {
    const index = this.favorites.indexOf(favorite);
    if (index > -1) {
      this.favorites.splice(index, 1);
    }
    return Promise.resolve();
  }
}
