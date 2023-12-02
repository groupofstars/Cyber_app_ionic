import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AskQuestion, ICourseInfo, ICourseLesson, ICourseSection, ILive, } from 'src/app/model/infoData.model';
import { Teacher } from 'src/app/model/teacher-model';
import { IUser } from 'src/app/model/user.model';
import { LoginComponent } from 'src/app/pages/authentication/pages/login/login.component';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { LoginGuardService } from 'src/app/services/login-guard.service';
import { MyCourseService } from 'src/app/services/my-course.service';

@Component({
  selector: 'couse-description',
  templateUrl: './couse-description.component.html',
  styleUrls: ['./couse-description.component.scss'],
  providers: [DatePipe]
})
export class CouseDescriptionComponent implements OnInit {
  favorite: boolean = false;
  learnMore: boolean = false;
  seeMore: any = {};
  info: ICourseInfo = {};
  get isLoged(): boolean { return AuthService.isloged; }
  isTeacher = AuthService.isTeacher;

  constructor(private navCtrl: NavController,
    private courseService: CourseService,
    private myCourseService: MyCourseService,
    private activatedRouter: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private authServ: AuthService,
    private alertController: AlertController,
    private authService: AuthService
  ) {

  }

  ionViewWillEnter() {
    this.learnMore = false;
    this.seeMore = {};
    this.info = {};
    this.getInfo();
  }

  async getInfo() {
    try {
      const id = this.activatedRouter.snapshot.paramMap.get("id");
      if (id != null)
        this.info = await this.courseService.getCourseDetail(+id);
    } catch (error) {

    }
  }

  ngOnInit() { }

  setLearnMor() {
    this.learnMore = true;
  }
  setSeeMore(id: number | string) { this.seeMore[id] = true; }
  toggleSeeMore(id: number | string) { this.seeMore[id] = !this.seeMore[id]; }
  async startNow() {
    if (this.isLoged) {
      const isEnrolled = await this.courseService.isEnrolled(this.info?.id);
      if (!isEnrolled) {
        var errorpb = await this.loadingCtrl.create({
          spinner: null,
          message: 'Please enroll the course first.',
          backdropDismiss: true,
          showBackdrop: true,
          animated: true,
          duration: 3000
        });
        errorpb.present();
        return;
      }
      await this.authService.classAttendance(this.info.id, new Date())
      window.open(this.info.live?.url);
    } else {
      this.navCtrl.navigateForward(["auth/login"]);
    }
  }
  async enroolNow() {
    if (!this.isLoged) { this.navCtrl.navigateForward(["auth/login"]); }

    if (!this.isTeacher) {
      const enrollLoading = await this.loadingCtrl.create({
        message: 'Please wait Enrolling',
        animated: true,
      });
      const errorLoading = await this.alertController.create({
        message: 'You have already enrolled',
        animated: true,
      });
      try {
        enrollLoading.present();
        await this.myCourseService.enrollNow(this.info.id ?? -1);
      } catch (error) {
  
        const er: HttpErrorResponse = error as HttpErrorResponse;
        if (er.error.status == 409) {
          errorLoading.present();
        }
      } finally {
        enrollLoading.dismiss();
      }
    }
  }

  goRecords(index: number) {
    if (this.isLoged) {
      this.navCtrl.navigateForward(["home/course-play-list", this.info.id, index]);
    }
  }
  goCouresInfo() {
    this.navCtrl.navigateForward(["home/course-info"]);
  }
  goTeacher(teacher: Teacher) {
    this.navCtrl.navigateForward(["home/teacher-profile", teacher.id]);
  }
  goStudent() {
    this.navCtrl.navigateForward(["home/other-profile"]);
  }

  back() {
    this.navCtrl.back();
  }

  addFavorite() {
    this.favorite = !this.favorite;
  }


}
