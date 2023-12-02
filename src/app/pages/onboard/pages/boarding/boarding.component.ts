import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { NavController, Platform, ViewWillEnter } from "@ionic/angular";
import { AuthService } from "src/app/services/auth.service";
import { PushNotificationService } from "src/app/services/push-notification.service";
import { SplashService } from "src/app/services/splash.service";
import Swiper from "swiper";

@Component({
  selector: "app-boarding",
  templateUrl: "./boarding.component.html",
  styleUrls: ["./boarding.component.scss"],
})
export class BoardingComponent implements OnInit, AfterViewInit {
  @ViewChild("swiper")
  swiperRef: ElementRef | undefined;

  activeIndex: number = 0;
  constructor(
    private router: NavController,
    private splashService: SplashService,
    private plt: Platform,
    private authService: AuthService,
    private pushNotificationService: PushNotificationService
  ) { }
  ngAfterViewInit(): void { }

  ngOnInit() { }
  slideChange() {
    this.activeIndex = +this.swiperRef?.nativeElement.swiper.activeIndex;
  }
  slideNext() {
    if (this.activeIndex >= 2) {
      this.skip();
    }
    this.swiperRef?.nativeElement.swiper.slideNext();
  }

  async skip() {
    this.splashService.onboarded();
    if (this.plt.is("capacitor")) {
      let permResult = await this.pushNotificationService.checkPermissions();
      if (permResult.receive != 'granted') {
        this.router.navigateForward(["/auth/notification"]);
        return;
      }
    }
    this.router.navigateForward(["/home"]);
  }
 async login() {

    if (AuthService.isloged) this.skip();
    else {
      this.splashService.onboarded();
      if (this.plt.is("capacitor")) {
        let permResult = await this.pushNotificationService.checkPermissions();
        if (permResult.receive != 'granted') {
          this.router.navigateForward(["/auth/notification"]);
          return;
        }
      }
      this.router.navigateForward(["/home"]);
    }
  }
}
