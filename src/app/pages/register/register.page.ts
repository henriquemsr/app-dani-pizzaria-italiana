import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController, AlertController } from '@ionic/angular';
import { UserService } from 'src/app/providers/users/user.service';
import { ENDPOINT } from 'src/app/providers/endpoints';
import { ServiceLoginService } from 'src/app/providers/login/service-login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;
  load = false;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public servUser: UserService,
    public loginService: ServiceLoginService,
    private formBuilder: FormBuilder,
    public alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.createFormRegister();
  }

  createFormRegister() {
    this.onRegisterForm = this.formBuilder.group({
      fullName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      telefone: [null, Validators.required]
    });

  }

  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      subHeader: 'Dados divergentes',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  signUp() {

    this.load = true;

    let objSave = {
      nome: this.onRegisterForm.get("fullName").value,
      email: this.onRegisterForm.get("email").value,
      password: this.onRegisterForm.get("password").value,
      telefone: this.onRegisterForm.get("telefone").value,
      perfil: 1
    }
    console.log(objSave);

    this.servUser.httpPost(ENDPOINT.REGISTER, objSave, false).subscribe(
      res => {
        console.log(res);
        if (res.body['error'] === true) {
          this.presentAlert(res.body['data']);
        } else {
          /*
          ###############
          LOGA NO SISTEMA
          ###############
           */
          let loginData = {
            email: this.onRegisterForm.get("email").value,
            password: this.onRegisterForm.get("password").value,

          }
          this.loginService.httpPost(ENDPOINT.LOGIN, loginData, false).subscribe(
            res => {
              console.log(res);
              if (res.body['error'] === !true) {
                localStorage.setItem("token", res.body['token']);
                localStorage.setItem("idUser", res.body['id']);
                this.navCtrl.navigateRoot('/home-location');
              } else {
                this.presentAlert(res.body['data']);
              }
              this.load = false;
            },
            err => {
              console.log(err);
              this.presentAlert(err.errror.Message);

            }
          );

        }
      },
      err => {
        console.log(err);
        this.presentAlert(err.errror.Message);
      }
    );
  }

  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}
