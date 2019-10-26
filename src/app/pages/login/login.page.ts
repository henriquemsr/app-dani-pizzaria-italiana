import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { TranslateProvider } from '../../providers';
import { ServiceLoginService } from 'src/app/providers/login/service-login.service';
import { ENDPOINT } from 'src/app/providers/endpoints';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private translate: TranslateProvider,
    private formBuilder: FormBuilder,
    public loginService: ServiceLoginService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {

    this.onLoginForm = this.formBuilder.group({
      'email': [null, [Validators.required]],
      'password': [null, [Validators.required]]
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: this.translate.get('app.pages.login.label.forgot'),
      message: this.translate.get('app.pages.login.text.forgot'),
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: this.translate.get('app.label.email')
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirm',
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000
            });

            loader.present();
            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: this.translate.get('app.pages.login.text.sended'),
                duration: 3000,
                position: 'bottom'
              });

              toast.present();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }
  typing() {
    this.showMsgError = false;
  }
  msgError: string;
  showMsgError = false;
  goToHome() {
    let loginData = {
      email: this.onLoginForm.get("email").value,
      password: this.onLoginForm.get("password").value,
    }
    this.loginService.httpPost(ENDPOINT.LOGIN, loginData, false).subscribe(
      res => {
        console.log(res);
        if (res.body['error'] === !true) {
          localStorage.setItem("token", res.body['token'])
          this.navCtrl.navigateRoot('/home-location');
        } else {
          this.showMsgError = true;
          console.log(res.body['data']);
          this.msgError = res.body['data'];
        }
      },
      err => {
        console.log(err);
        //vou mostrar um modal que deu erro

      }
    );
  }

}
