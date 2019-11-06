import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateProvider } from './providers/translate/translate.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';

import { Pages } from './interfaces/pages';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;
  public language: string = 'pt';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateProvider,
    private translateService: TranslateService,
    public navCtrl: NavController
  ) {
    this.appPages = [
      // {
      //   title: 'Home Results',
      //   url: '/home-results',
      //   direct: 'root',
      //   icon: 'home'
      // },
      // {
      //   title: 'Home Location',
      //   url: '/home-location',
      //   direct: 'root',
      //   icon: 'home'
      // },
      // {
      //   title: 'Messages',
      //   url: '/messages',
      //   direct: 'forward',
      //   icon: 'mail'
      // },
      // {
      //   title: 'Restaurant List',
      //   url: '/restaurant-list/ ',
      //   direct: 'forward',
      //   icon: 'home'
      // },
      {
        title: 'Lista de Pedidos',
        url: '/dish-list',
        direct: 'forward',
        icon: 'pizza'
      },
      // {
      //   title: 'Nearby',
      //   url: '/nearby',
      //   direct: 'forward',
      //   icon: 'compass'
      // },
      // {
      //   title: 'By Category',
      //   url: '/bycategory',
      //   direct: 'forward',
      //   icon: 'albums'
      // },
      {
        title: 'Continuar comprando',
        url: '/restaurant-detail/1',
        direct: 'forward',
        icon: 'ios-basket'
      },
      {
        title: 'Últimos pedidos',
        url: '/latest-orders',
        direct: 'forward',
        icon: 'list-box'
      },
      {
        title: 'Favorites',
        url: '/favorites',
        direct: 'forward',
        icon: 'heart'
      },
      // {
      //   title: 'About',
      //   url: '/about',
      //   direct: 'forward',
      //   icon: 'information-circle-outline'
      // },
      // {
      //   title: 'Support',
      //   url: '/support',
      //   direct: 'forward',
      //   icon: 'help-buoy'
      // },
      // {
      //   title: 'App Settings',
      //   url: '/settings',
      //   direct: 'forward',
      //   icon: 'cog'
      // },
      // {
      //   title: 'Walkthrough',
      //   url: '/',
      //   direct: 'forward',
      //   icon: 'photos'
      // }
    ];

    this.initializeApp();
  }

  changeLanguage() {
    this.language === 'pt' ? this.language = 'en' : this.language = 'pt';
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
      // this.splashScreen.hide();
      // Set language of the app.
      this.translateService.setDefaultLang(this.language);
      this.translateService.use(this.language);
      this.translateService.getTranslation(this.language).subscribe(translations => {
        this.translate.setTranslations(translations);
      });
    }).catch(() => {
      // Set language of the app.
      this.translateService.setDefaultLang(this.language);
      this.translateService.use(this.language);
      this.translateService.getTranslation(this.language).subscribe(translations => {
        this.translate.setTranslations(translations);
      });
    });
  }

  goToEditProgile() {
    this.navCtrl.navigateForward('edit-profile');
  }

  logout() {
    this.navCtrl.navigateRoot('login');
  }
}
