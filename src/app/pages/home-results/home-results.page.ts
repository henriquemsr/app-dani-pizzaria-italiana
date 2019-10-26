import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  MenuController,
  LoadingController,
  ToastController,
  PopoverController,
  ModalController } from '@ionic/angular';

import {
  RestaurantService,
  CartService,
  TranslateProvider } from '../../providers';

import { CartPage } from './../modal/cart/cart.page';
import { SearchFilterPage } from '../../pages/modal/search-filter/search-filter.page';

import { NotificationsComponent } from './../../components/notifications/notifications.component';

import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger
} from '@angular/animations';


@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.page.html',
  styleUrls: ['./home-results.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(100px,0,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('500ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class HomeResultsPage {

  restaurants: Array<any>;
  searchKey = '';
  yourLocation = '463 Beacon Street Guest House';

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public service: RestaurantService,
    private cartService: CartService,
    private translate: TranslateProvider
  ) {

  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
    this.findAll();
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

  async openRestaurantListPage() {
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateForward('restaurant-list/');
    });
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartPage
    });
    return await modal.present();
  }

  async alertLocation() {
    const changeLocation = await this.alertCtrl.create({
      header: 'Change Location',
      message: 'Type your Address to change restaurant list in that area.',
      inputs: [
        {
          name: 'location',
          placeholder: 'Enter your new Location',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Change',
          handler: async (data) => {
            console.log('Change clicked', data);
            this.yourLocation = data.location;
            const toast = await this.toastCtrl.create({
              message: 'Location was change successfully',
              duration: 3000,
              position: 'top',
              closeButtonText: 'OK',
              showCloseButton: true
            });

            toast.present();
          }
        }
      ]
    });
    changeLocation.present();
  }

  async searchFilter () {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage
    });
    return await modal.present();
  }

  async notifications() {
    const popover = await this.popoverCtrl.create({
      component: NotificationsComponent,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

}
