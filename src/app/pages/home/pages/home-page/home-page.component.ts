import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController } from '@ionic/angular';
import { ICourseItem } from 'src/app/model/course.model';
import { ISliderData } from 'src/app/model/slider.model';
import { TestService } from 'src/app/services/test.service';
import { CourseService } from 'src/app/services/course.service';
import { CourseCategori } from 'src/app/model/course-categori.model';
import { CourseListService } from 'src/app/services/course-list.service';
import { ICourseInfo } from 'src/app/model/infoData.model';
import { TeacherService } from 'src/app/services/teacher.service';
import { Teacher } from 'src/app/model/teacher-model';
import { IServiceItem } from 'src/app/model/service.model';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/token-model';
import { DomSanitizer } from '@angular/platform-browser';
import { IUpcomingEvent } from 'src/app/model/upcomingEvents-model';
import { UpcomingEventsService } from 'src/app/services/upcoming-events.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  @ViewChild('swiper') swiper!: ElementRef | undefined;;
  @ViewChild('content') content!: IonContent;
  user(): User | undefined { return AuthService.user; }
  isLoaded: boolean = false;
  coursesData: ICourseInfo[] | undefined;
  popularCoursesData: ICourseInfo[] | undefined;
  featuredCoursesData: ICourseInfo[] | undefined;
  servicesData: IServiceItem[] | undefined;
  categories: CourseCategori[] | undefined;
  teachers: Teacher[] | undefined;
  upcomingEvents: IUpcomingEvent[] = []

  constructor(private courseServ: CourseService,
    private router: NavController,
    private nav: NavController,
    private courseListService: CourseListService,
    public teacherServ: TeacherService,
    private authService: AuthService,
    public domSanit: DomSanitizer,
    private UpcomingEventsServ: UpcomingEventsService
  ) {

  }


  onImageNotKladded(image: HTMLImageElement) {
    let src = image.src;

    setTimeout(() => {
      image.src = 'https://techdefendershub.com/wp-content/uploads/2013/03/74-745142_isometric-vector-business-meeting-hd-png-download.png'
    }, 100);
  }

  getImageUrl(imageUrl: string) {
    return this.domSanit.bypassSecurityTrustUrl(imageUrl);
  }

  async ionViewWillEnter() {
    this.getCourses();
    
  }

  ionViewDidEnter() {
    this.content.scrollToTop();
  }

  async handleRefresh(event: any) {
    this.UpcomingEventsServ.reset();
    // this.teacherServ.reset();
    this.courseServ.reset();
    await this.getCourses();
    event.target.complete();

  }
  async getCourses() {
    try {
      this.coursesData = await this.courseServ.getCourses();
    } catch (error) { }

    try {
      this.popularCoursesData = await this.courseServ.getPopularCourses();

    } catch (error) { }

    try {
      this.featuredCoursesData = await this.courseServ.getFeaturedCourses();
    } catch (error) { }

    try {
      this.servicesData = await this.courseServ.getServices();
    } catch (error) { }

    try {
      // this.categories = await this.courseServ.getCategories();
    } catch (error) { }


    try {

      this.teachers = await this.teacherServ.getTheacher();
    } catch (error) { }

    try {

      this.upcomingEvents = await this.UpcomingEventsServ.getEvents();
    } catch (error) { }



    this.isLoaded = true;
  }
  seeAllPopular() {
    if (this.popularCoursesData) {
      this.courseListService.goCourseList(this.popularCoursesData);
      this.courseListService.header = "Popular Courses";
    }
  }

  seeOurCurses() {
    if (this.coursesData) {
      this.courseListService.goCourseList(this.coursesData);
      this.courseListService.header = "Our Courses";
    }

  }
  seeFeaturedPopular() {
    if (this.featuredCoursesData) {
      this.courseListService.goCourseList(this.featuredCoursesData);
      this.courseListService.header = "featured Courses";
    }
  }
  onFocusInput(e: any) {
    this.nav.navigateForward('/home/search');
  }

  goCouresInfo(item: ICourseInfo) {
    this.router.navigateForward(["/home/course-description", item.id]);
  }

  goServiceInfo(item: IServiceItem) {
    this.router.navigateForward(["/home/service-description", item.id]);
  }

  goTeacherItem(item: Teacher) {
    this.router.navigateForward(['/home/teacher-profile/', item.id])
  }
  async filterCategory(category: CourseCategori) {

    try {
      var courses = await this.courseServ.getCoursesByCategory(category.id);
      if (courses) {
        this.courseListService.goCourseList(courses);
        this.courseListService.header = category.title + " Courses";
      }
    } catch (error) { }
  }

  slideAuto() {
    if (this.swiper) this.swiper.nativeElement.disableOnInteraction = false
  }

}


