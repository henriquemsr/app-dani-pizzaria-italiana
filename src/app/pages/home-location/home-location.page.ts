import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { TranslateProvider } from '../../providers';

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
  selector: 'app-home-location',
  templateUrl: './home-location.page.html',
  styleUrls: ['./home-location.page.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('300ms', [animate('600ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class HomeLocationPage {

  setlocation: String;
  items: string[];
  showItems: Boolean = false;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private translate: TranslateProvider
  ) {
    this.menuCtrl.enable(false);
  }

  initializeItems() {
    this.items = [
      'La Belle Place - Rio de Janeiro',
      'Marshall Hotel - Marshall Islands',
      'Maksoud Plaza - São Paulo',
      'Hotel Copacabana - Rio de Janeiro',
      'Pousada Marés do amanhã - Maragogi'
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.showItems = true;
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.showItems = false;
    }
  }

  editprofile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  settings() {
    this.navCtrl.navigateForward('settings');
  }

  logout() {
    this.navCtrl.navigateRoot('login');
  }

  messages() {
    this.navCtrl.navigateForward('messages');
  }

  goToHomeResults() {
    this.navCtrl.navigateRoot('restaurant-detail/1');
  }

}
