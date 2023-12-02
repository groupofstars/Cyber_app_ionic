import { Component } from '@angular/core';
import { NavController, ViewDidEnter } from '@ionic/angular';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tabs = [
    {
      icon: 'home-outline',
      title: 'Home',
      route: ''
    },
    {
      icon: 'search-outline',
      title: 'Search',
      route: 'courses'
    },
    {
      icon: 'document-text-outline',
      title: 'My Course',
      route: 'my-course'
    },
    {
      icon: 'chatbubble-ellipses-outline',
      title: 'Chat',
      route: 'chats'
    },
    {
      icon: 'person-outline',
      title: 'Profile',
      route: 'profile'
    }
  ];
  activeTabe: any;
  constructor(private navCtrl: NavController) { }
  ionViewDidEnter(): void {
    this.activeTabe = this.tabs[0];
  }

  authServ = AuthService;
  route(tab: any) {
    let path = tab.route.length > 0 ? "home/" + tab.route : "home";
    this.activeTabe = tab;
    this.navCtrl.navigateForward([path]);
  }
  handleRefresh(e: any) {
    setTimeout(() => {
      // Any calls to load data go here
      e.target.complete();
    }, 2000);
  }
}
