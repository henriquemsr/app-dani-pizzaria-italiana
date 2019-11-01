import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ToastController, ModalController } from '@ionic/angular';
import { TranslateProvider } from '../../providers';
import { UserService } from 'src/app/providers/users/user.service';
import { ENDPOINT } from 'src/app/providers/endpoints';
import { AddressPage } from '../modal/address/address.page';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {  
  user: any;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private translate: TranslateProvider,
    public modalCtrl: ModalController,
    public userService: UserService
  ) { }

  ngOnInit() {
    let id = localStorage.getItem("idUser");
    this.getUser(id);
  }

  async openAddres() {
    const modal = await this.modalCtrl.create({
      component: AddressPage
    });
    return await modal.present();
  }

  getUser(id) {
    this.userService.httpGet(`${ENDPOINT.USER}${id}`, null).subscribe(
      res => {
        console.log(res);
        this.user = res.body['data'][0];
        
      },
      err => {
        console.log(err);
      }
    );
  }

  async sendData() {
    // send booking info
    const loader = await this.loadingCtrl.create({
      duration: 2000
    });

    loader.present();
    loader.onWillDismiss().then(async l => {
      const toast = await this.toastCtrl.create({
        showCloseButton: true,
        cssClass: 'bg-profile',
        message: 'Your Data was Edited!',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      this.navCtrl.navigateForward('/home-location');
    });
    // end
  }

}
