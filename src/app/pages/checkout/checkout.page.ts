import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import {
  OrdersService,
  CartService,
  TranslateProvider
} from '../../providers';
import { ENDPOINT } from 'src/app/providers/endpoints';

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
  ) { }

  ionViewWillEnter() {
    this.getOrders();
  }

  getOrders() {
    this.cartService.getOrders().then(orders => {
      this.checkoutData = orders;
      this.checkoutData.forEach((val, i) => {
        this.totalVal = this.totalVal + (val.order.valor * val.qtd);
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
        message: 'Seu pedido foi realizado com sucesso!',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();

      let orderSave = [];
      for (const order of this.checkoutData) {
        orderSave = [...orderSave,
        {
          id_produto: order.order.id,
          id_usuario: localStorage.getItem("idUser"),
          qtd: order.qtd,
          obs: "chumbado",
          numero_pedido: this.orderNumber,
          status: 1,
          total: Number(this.totalVal).toFixed(2),
          desconto: 0,
          taxa: 0
        }
        ];
      }
      console.log(orderSave);
      let save = JSON.stringify(orderSave);
      console.log(save);
      this.ordersService.postOrder(ENDPOINT.ORDER, { dadosPedido: save }).subscribe(
        res => {
          console.log(res);



          // let orderSaveProd = [];
          // for (const order of this.checkoutData) {
          //   orderSaveProd = [...orderSaveProd,
          //   {
          //     numero_pedido: this.orderNumber,
          //     id_produto: order.order.id,
          //     id_usuario: localStorage.getItem("idUser"),
          //     qtd: order.qtd,
          //     obs: "chumbado",
          //     status: 1,
          //     total: Number(this.totalVal).toFixed(2),
          //     desconto: 0,
          //     taxa: 0
          //   }
          //   ];
          // }
          // console.log(orderSaveProd);
          // let save = JSON.stringify(orderSaveProd);
          // console.log(save);



          // this.ordersService.postOrder(ENDPOINT.ORDER_PROD, { dadosPedido: save }).subscribe(
          //   res => {
          //     console.log(res);
          //   },
          //   err => {
          //     console.log(err);
          //   }
          // );

        },
        err => {
          console.log(err);
        }
      );
    });
    // end
  }

}
