import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { UserService } from 'src/app/providers';
import { ENDPOINT } from 'src/app/providers/endpoints';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
  address: any[];
  showAddress = false;
  singleAddress = {
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    cep: ""
  }
  constructor(
    public userService: UserService,
    private modalCtrl: ModalController,
    public loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.getAdrress();
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }

  getAdrress() {
    this.userService.httpGet(`${ENDPOINT.ADDRESS}/${localStorage.getItem("idUser")}`, null).subscribe(
      res => {
        console.log(res.body['data']);
        this.address = res.body['data'];
      },
      err => {
        console.log(err);
      }
    );
  }

  async activeAddrees(idAddress) {
    const loader = await this.loadingCtrl.create({
      message: 'alterando...',
      //duration: 1000
    });

    loader.present();

    this.userService.httpPut(`${ENDPOINT.ADDRESS}/active/${idAddress}/${localStorage.getItem("idUser")}`, null).subscribe(
      res => {
        console.log(res.body['data']);
        this.getAdrress();
        setTimeout(() => {
          loader.dismiss();
        }, 1000)

      },
      err => {
        console.log(err);
      }
    )

  };


  newAddress() {
    this.showAddress = true;
    this.singleAddress = {
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      estado: "",
      cep: ""
    }
  }
  goEditAddress(obj) {
    this.showAddress = true;
    this.singleAddress = {
      rua: obj.rua,
      numero: obj.numero,
      bairro: obj.bairro,
      cidade: obj.cidade,
      estado: obj.estado,
      cep: obj.cep
    }
  }


}
