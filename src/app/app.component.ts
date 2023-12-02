import { Component } from "@angular/core";
import { SplashScreen } from "@capacitor/splash-screen";
import { PushNotifications } from "@capacitor/push-notifications";
import { Storage } from "@ionic/storage-angular";
import { StatusBar } from "@capacitor/status-bar";
import { NavController } from "@ionic/angular";
import { PushNotificationService } from "./services/push-notification.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(private storage: Storage, private router: NavController, private pushNotificationService: PushNotificationService) {
    this.init();
  }

  ionViewWillEnter() {

  }

  async init() {
    await this.storage.create();
    // await this.initNotification();
  }
  async initNotification() {
    let permStatus = await PushNotifications.checkPermissions();
    if (permStatus.receive == "granted") {
      await this.pushNotificationService.init();
    }

  }

  ionViewDidEnter() {
    SplashScreen.show({
      showDuration: 3500,
      autoHide: true,
    });
  }


}
