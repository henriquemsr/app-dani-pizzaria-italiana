import { Component } from '@angular/core';
import { NavController, ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

import {
  DishService,
  CartService,
  TranslateProvider
} from '../../providers';

import { ImagePage } from './../modal/image/image.page';
import { CartPage } from './../modal/cart/cart.page';
import { ENDPOINT } from 'src/app/providers/endpoints';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.page.html',
  styleUrls: ['./dish-detail.page.scss'],
})
export class DishDetailPage {
  dishID: any;
  dish: any;
  qtd = 1;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    public route: ActivatedRoute,
    public router: Router,
    private cartService: CartService,
    private dishService: DishService
  ) {
    this.dishID = this.route.snapshot.paramMap.get('id');
    this.getItem(this.dishID);
    // this.dish = this.dishService.getItem(this.dishID) ?
    //   this.dishService.getItem(this.dishID) :
    //   this.dishService.findAll()[0];

  }

  item: any;
  getItem(id) {
    this.dishService.httpGet(`${ENDPOINT.ITEMS_RESTAURANT}/${id}`, null).subscribe(
      res => {
        this.item = res.body['data'][0];
        console.log(this.item);

      },
      err => {
        console.log(err);
      }
    );
  }
  // minus adult when click minus button
  minusQtd() {
    this.qtd--;
  }
  // plus adult when click plus button
  plusQtd() {
    this.qtd++;
  }

  addcart(dish, qtd) {
    this.cartService.addtoCart(dish, qtd).then(async () => {
      const toast = await this.toastCtrl.create({
        message: 'o item foi adicionado ao carrinho',
        duration: 2000,
        position: 'top',
        color: 'light',
        closeButtonText: 'OK',
        showCloseButton: true
      });

      toast.present();
    });
  }

  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartPage
    });
    return await modal.present();
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image }
    });
    return await modal.present();
  }

}
