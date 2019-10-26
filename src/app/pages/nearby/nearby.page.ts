import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { RestaurantService, TranslateProvider } from '../../providers';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.page.html',
  styleUrls: ['./nearby.page.scss'],
})
export class NearbyPage {
  agmStyles = environment.agmStyles;
  nearRestaurants: Array<any>;

  constructor(
    public navCtrl: NavController,
    public service: RestaurantService,
    private translate: TranslateProvider
  ) {
    this.findAll();
  }

  findAll() {
    this.service.findAll()
        .then(data => this.nearRestaurants = data)
        .catch(error => alert(error));
  }

}
