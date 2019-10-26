import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { RestaurantService, TranslateProvider } from '../../providers';
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';

import { environment } from '../../../environments/environment';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.page.html',
  styleUrls: ['./restaurant-list.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('200ms', [animate('600ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class RestaurantListPage {
  restaurants: Array<any>;
  searchKey: string;
  viewMode = 'list';
  proptype: any;
  label = '';
  from: String;
  agmStyles: any[] = environment.agmStyles;

  catList: Array<any> = [
    {
      label: 'All categories',
      value: ''
    },
    {
      label: 'Barbecue',
      value: 'Barbecue'
    },
    {
      label: 'Bistro',
      value: 'Bistro'
    },
    {
      label: 'Casual Dining',
      value: 'Casual Dining'
    },
    {
      label: 'Pizza',
      value: 'Pizza'
    },
    {
      label: 'Variable',
      value: 'Variable'
    },
    {
      label: 'Local Food',
      value: 'Local Food'
    },
    {
      label: 'Street Food',
      value: 'Street Food'
    },
    {
      label: 'Indian Food',
      value: 'Indian Food'
    },
    {
      label: 'Pasta',
      value: 'Pasta'
    },
    {
      label: 'Seafood',
      value: 'Seafood'
    }
  ];

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public service: RestaurantService,
    public toastCtrl: ToastController,
    public route: ActivatedRoute,
    public router: Router,
    private translate: TranslateProvider
  ) {
    this.findAll();
    this.proptype = (this.route.snapshot.paramMap.get('cat') || this.route.snapshot.paramMap.get('cat') === '') ?
    this.route.snapshot.paramMap.get('cat') : '';
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  onInput(event) {
    this.service.findByName(this.searchKey)
        .then(data => {
            this.restaurants = data;
        })
        .catch(error => alert(JSON.stringify(error)));
  }

  onCancel(event) {
    this.findAll();
  }

  findAll() {
    this.service.findAll()
          .then(data => this.restaurants = data)
          .catch(error => alert(error));

  }

  favorite(restaurant) {
    this.service.favorite(restaurant)
        .then(async res => {
            const toast = await this.toastCtrl.create({
              showCloseButton: true,
                message: 'Restaurant added to your favorites',
                duration: 2000,
                position: 'bottom'
            });

            toast.present();
        });
  }

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

}
