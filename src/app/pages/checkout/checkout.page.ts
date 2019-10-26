import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import {
  OrdersService,
  CartService,
  TranslateProvider
} from '../../providers';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})

export class CheckoutPage {
  checkoutData: any;
  paymethods = 'creditcard';
  totalVal = 0;
  orderNumber: number = Math.floor(Math.random() * 10000);

  constructor(
    public navCtrl: NavController,
    public ordersService: OrdersService,
    public cartService: CartService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private storage: Storage,
  ) {}

  ionViewWillEnter() {
    this.getOrders();
  }

  getOrders() {
    this.cartService.getOrders().then(orders => {
      this.checkoutData = orders;
      this.checkoutData.forEach((val, i) => {
        this.totalVal = this.totalVal + (val.order.price * val.qtd);
      });

      this.storage.set('order-' + this.orderNumber, this.checkoutData);
    });
  }

  async makeBuy() {
    // send booking info
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: false,
        cssClass: 'bg-profile',
        message: 'Your order has been done successfully!',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();

      this.ordersService.saveOrder(this.checkoutData, this.totalVal, this.orderNumber).then(data => {
        setTimeout(() => {
          loader.dismiss();
          toast.present();
          this.cartService.cleanCart();
          // back to home page
          this.navCtrl.navigateForward('home-results');
        }, 3000);
      });
    });
    // end
  }

}
