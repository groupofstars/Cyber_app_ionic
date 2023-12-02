import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss'],
})
export class CourseInfoComponent {
  isCardSelected: number = -1;
  data: any;
  constructor(private navCtrl: NavController, private courseServ: CourseService) { }

  ionViewDidEnter() {
    this.getCourseInfo();
  }

  onCardClick(index: any) {
    this.isCardSelected = index;
  }
  back() {
    this.navCtrl.back();
  }

  getCourseInfo() { }
}
