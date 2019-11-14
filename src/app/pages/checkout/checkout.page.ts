import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import {
  OrdersService,
  CartService,
  UserService,
  TranslateProvider
} from '../../providers';
import { ENDPOINT } from 'src/app/providers/endpoints';
import { AddressPage } from './../modal/address/address.page';


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
  address: any[];

  constructor(
    public navCtrl: NavController,
    public ordersService: OrdersService,
    public userService: UserService,
    public cartService: CartService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private storage: Storage,
  ) { }

  ionViewWillEnter() {
    this.getOrders();
  }

  async openAddress() {
    const modal = await this.modalCtrl.create({
      component: AddressPage
    });
    return await modal.present();
  }

  getAdrress() {
    this.userService.httpGet(`${ENDPOINT.ADDRESS}/${localStorage.getItem("idUser")}`, null).subscribe(
      res => {
        console.log(res);
        this.address = res.body['data'];
      },
      err => {
        console.log(err);
      }
    );
  }

  getOrders() {
    this.cartService.getOrders().then(orders => {
      this.getAdrress();
      this.checkoutData = orders;
      this.checkoutData.forEach((val, i) => {
        this.totalVal = this.totalVal + (val.order.valor * val.qtd);
      });

      this.storage.set('order-' + this.orderNumber, this.checkoutData);
    });
  }

  sendPay = false;

  methodPayLocalMoney = false;
  methodPayLocalCard = false;
  changeMon = false;
  noChangeMon = false;
  inputCoins = false;
  vlTyped: number = null;
  changeMoney(n) {
    if (n === 0) {// botão não
      this.changeMon = false;
      this.noChangeMon = true;
      this.sendPay = true;
      this.inputCoins = false;
    } else {// botão sim
      this.changeMon = true;
      this.inputCoins = true;
      this.noChangeMon = false;
      this.sendPay = false;
      this.vlTyped = null;
    }
  }
  changeTyping() {
    console.log(this.vlTyped);
    if (this.vlTyped > 0) {
      this.sendPay = true;
    }
  }
  chooseMethodPayLocal(n) {
    switch (n) {
      case 1://pagamento em dinheiro no local
        this.methodPayLocalMoney = true;
        this.methodPayLocalCard = false;
        this.sendPay = false;
        this.changeMon = false;
        this.noChangeMon = false;
        this.inputCoins = false;
        this.vlTyped = null;
        break;
      case 2://pagamento com cartão no local
        this.methodPayLocalCard = true;
        this.methodPayLocalMoney = false;
        this.sendPay = true;
        this.changeMon = false;
        this.noChangeMon = false;
        this.inputCoins = false;
        this.vlTyped = null;
        break;

    }
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
