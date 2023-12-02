import { Component, OnInit } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { MyCourseService } from 'src/app/services/my-course.service';
import { SplashService } from 'src/app/services/splash.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  loginError: boolean = false;
  constructor(private router: NavController,
    private authService: AuthService,
    private splashService: SplashService,
    private courseService: CourseService,
    private myCourseService: MyCourseService,
    private teacherService: TeacherService) {

  }

  ngOnInit() {

  }

  async ionViewWillEnter() {
    this.loginError = false;

    if (AuthService.token) {
      try {
        this.loginError = false;

        await this.authService.getMe();
      } catch (error) {

        this.loginError = true;
      }
    }
    // if (this.splashService.IsSplashed && AuthService.isloged) this.router.navigateForward(['/home'])
    this.Init();
  }
  async Init() {

    try {
      await this.courseService.getCourses();
    } catch (error) { }

    try {
      await this.myCourseService.getMyCourses();
    } catch (error) { }
    try {
      await this.courseService.getCategories();
    } catch (error) { }

    try {

      await this.courseService.getPopularCourses();
    } catch (error) { }
    try {
      await this.teacherService.getTheacher();
    } catch (error) { }

    try {
      let rememberMe = localStorage.getItem("rememberMe") ?? false;
      if (rememberMe) {
        let status = JSON.parse(rememberMe)
        if (!status) {
          localStorage.removeItem("auth");
        }
      } else{
        localStorage.removeItem("auth");
      }
    } catch (e) { }

    this.splashService.IsSplashed = true;
    if (this.splashService.IsOnboarded()) {
      if (!this.loginError)
        this.router.navigateForward(['/home'])
    }
    else
      this.router.navigateForward(['/onboard/boarding'])
  }


}
