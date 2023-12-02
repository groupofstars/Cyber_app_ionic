import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { NavController, Platform } from "@ionic/angular";
import { PushNotificationService } from "src/app/services/push-notification.service";

@Component({
  selector: "app-enable-notification",
  templateUrl: "./enable-notification.component.html",
  styleUrls: ["./enable-notification.component.scss"],
})
export class EnableNotificationComponent implements OnInit {
  constructor(
    private router: NavController,
    private notificationService: PushNotificationService,
    private platform: Platform,
    private pushNotificationService: PushNotificationService
  ) { }
  ngAfterViewInit(): void {
    this.router.navigateForward(["/home"]);

    // if (this.platform.is("capacitor")) {
    //   this.notificationService.init();
    // }
  }
  ionViewWillEnter() {
    this.router.navigateForward(["/home"]);
  }


  ngOnInit() { }

  skip() {
    this.router.navigateForward(["/home"]);
  }
  async allow() {
    await this.pushNotificationService.registerNotifications();

    let permStatus = await this.pushNotificationService.checkPermissions();

    if (permStatus.receive == "granted") {
      await this.pushNotificationService.init();
    }
    this.router.navigateForward(["/home"]);

  }
}
