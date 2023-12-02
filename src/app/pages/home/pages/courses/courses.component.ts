import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ICourseInfo } from 'src/app/model/infoData.model';
import { ISliderData } from 'src/app/model/slider.model';
import { CourseListService } from 'src/app/services/course-list.service';
import { CourseService } from 'src/app/services/course.service';
import { StorageService } from 'src/app/services/storage.service';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  editorChoice: ICourseInfo[] | undefined;
  recommendedChoice: ICourseInfo[] | undefined;

  constructor(private storage: TestService,
    private courseService: CourseService,
    private nav: NavController,
    private courseListService: CourseListService
  ) {


  }

  ionViewWillEnter() {
    this.getCourseItems();
  }

  async handleRefresh(event: any) {
    this.courseService.reset();
    await this.getCourseItems();
    event.target.complete();

  }
  onFocusInput(e: any) {
    console.log(e);
    this.nav.navigateForward('/home/search');
  }
  async getCourseItems() {

    this.editorChoice = await this.courseService.getEditorChoice();
    this.recommendedChoice = await this.courseService.getRecommendedChoice();

  }

  goCouresInfo({ id }: ICourseInfo) {
    this.nav.navigateForward(["home/course-description", id]);
  }
  seAllEditorChoice() {
    if (this.editorChoice)
      this.courseListService.goCourseList(this.editorChoice);
    this.courseListService.header = 'Editor Cohice';

  }
  seAllRecommended() {
    if (this.recommendedChoice)
      this.courseListService.goCourseList(this.recommendedChoice);
    this.courseListService.header = 'Recommended';


  }
}
