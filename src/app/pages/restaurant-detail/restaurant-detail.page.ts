import { Component } from '@angular/core';
import { NavController, ActionSheetController, ModalController, ToastController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import { CartPage } from './../modal/cart/cart.page';
import { ImagePage } from './../modal/image/image.page';

import {
  RestaurantService,
  DishService,
  CartService,
  TranslateProvider
} from '../../providers';

import { environment } from '../../../environments/environment';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';
import { ENDPOINT } from 'src/app/providers/endpoints';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.page.html',
  styleUrls: ['./restaurant-detail.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('600ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class RestaurantDetailPage {

  restaurantID: any;
  restaurant: any;
  restaurantopts: String = 'menu';
  dishes: Array<any>;
  items: any;

  constructor(
    public asCtrl: ActionSheetController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public route: ActivatedRoute,
    public router: Router,
    private translate: TranslateProvider,
    private cartService: CartService,
    private restaurantService: RestaurantService,
    private dishService: DishService,
    public menuCtrl: MenuController,
  ) {
    // this.restaurantID = this.route.snapshot.paramMap.get('id');
    this.restaurantID = 1;

    this.restaurantService.getItem(this.restaurantID)
    // this.restaurant = this.restaurantService.getItem(this.restaurantID) ?
    // this.restaurantService.getItem(this.restaurantID) :
    //this.restaurantService.getRestaurants()[0];
    this.getItems();
  }
  
  getItems() {
    this.restaurantService.httpGet(ENDPOINT.ITEMS_RESTAURANT, null).subscribe(
      res => {
        this.items = res.body['data'].rows;
        console.log(this.items);

      },
      err => {
        console.log(err);
      }
    );
  }

  ionViewWillEnter() {
    this.dishes = this.dishService.findAll();
    this.menuCtrl.enable(true);
  }

  // openDishDetail(dish) {
  //   this.navCtrl.push('page-dish-detail', {
  //     'id': dish.id
  //   });
  // }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }


  // favorite(restaurant) {
  //   this.restaurantService.favorite(restaurant)
  //       .then(async res => {
  //           const toast = await this.toastCtrl.create({
  //             showCloseButton: true,
  //               message: 'Restaurant added to your favorites',
  //               duration: 2000,
  //               position: 'bottom'
  //           });

  //           toast.present();
  //       });
  // }

  // async share() {
  //   const actionSheet = await this.asCtrl.create({
  //     header: 'Share Restaurant on:',
  //     buttons: [{
  //       text: 'Facebook',
  //       role: 'facebook',
  //       icon: 'logo-facebook',
  //       handler: () => {
  //         console.log('Facebook clicked');
  //       }
  //     }, {
  //       text: 'Twitter',
  //       icon: 'logo-twitter',
  //       handler: () => {
  //         console.log('Twitter clicked');
  //       }
  //     }, {
  //       text: 'Google+',
  //       icon: 'logo-googleplus',
  //       handler: () => {
  //         console.log('Google+ clicked');
  //       }
  //     }, {
  //       text: 'Instagram',
  //       icon: 'logo-instagram',
  //       handler: () => {
  //         console.log('Instagram clicked');
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  // }

  range(n: Array<any>) {
    return new Array(n);
  }

  avgRating() {
    let average = 0;

    this.restaurant.reviews.forEach((val: any, key: any) => {
      average += val.rating;
    });

    return average / this.restaurant.reviews.length;
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartPage
    });
    return await modal.present();
  }

}
