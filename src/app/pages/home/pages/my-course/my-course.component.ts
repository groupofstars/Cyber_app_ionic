import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { IonContent, NavController } from "@ionic/angular";
import { ISliderData } from "src/app/model/slider.model";
import { CourseService } from "src/app/services/course.service";
import { MyCourseService } from "src/app/services/my-course.service";

@Component({
  selector: "app-my-course",
  templateUrl: "./my-course.component.html",
  styleUrls: ["./my-course.component.scss"],
})
export class MyCourseComponent {
  @ViewChild("swiper")
  swiperRef: ElementRef | undefined;
  type = ["all", "ongoing", "completed"];
  activeIndex: number = 0;
  data: any[] = [];
  isLoaded: boolean = false;
  @ViewChild("content") content!: IonContent;

  constructor(
    private nav: NavController,
    private courseServ: MyCourseService
  ) {}

  ionViewWillEnter() {
    this.getMyCourseData();
  }

  ionViewDidEnter() {
    this.content.scrollToTop();
  }

  async handleRefresh(event: any) {
    this.courseServ.reset();
    await this.getMyCourseData();
  }
  goCourse(id: number) {
    this.nav.navigateForward(["home/course-lessons", id]);
  }

  viewCertificate(event: any, item: any) {
    event.preventDefault();
    event.stopPropagation();
    this.nav.navigateForward("home/my-certificate/" + item.id);
  }

  slideChange() {
    this.activeIndex = +this.swiperRef?.nativeElement.swiper.activeIndex;
  }

  changeSwipe() {
    this.swiperRef?.nativeElement.swiper.slideTo(this.activeIndex);

    // switch (this.activeIndex) {
    //   case 0:
    //     this.getMyCourseData();
    //     break;
    //   case 1:
    //     this.getMyCourseData(true);

    //     break;
    //   case 2:
    //     this.getMyCourseData(false);
    //     break;
    // }
  }

  async getMyCourseData(ongoing?: boolean) {
    this.data[0] = await this.courseServ.getMyCourses();
    this.data[1] = await this.courseServ.getMyCourses(true);
    this.data[2] = await this.courseServ.getMyCourses(false);
    this.isLoaded = false;
  }
}
