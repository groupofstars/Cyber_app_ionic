import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AskQuestion, ICourseInfo, ICourseLesson, ICourseSection, } from 'src/app/model/infoData.model';
import { IServiceItem } from 'src/app/model/service.model';
import { IUser } from 'src/app/model/user.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'couse-description',
  templateUrl: './service-description.component.html',
  styleUrls: ['./service-description.component.scss'],
})
export class ServiceDescriptionComponent implements OnInit {
  favorite: boolean = false;
  learnMore: boolean = false;
  seeMore: any = {};

  info: IServiceItem = {};

  constructor(private navCtrl: NavController, private courseService: CourseService, private activatedRouter: ActivatedRoute) {

  }

  ionViewWillEnter() {
    this.getInfo();

  }
  async getInfo() {
    try {
      const id = this.activatedRouter.snapshot.paramMap.get("id");
      if (id != null) {
        const service = await this.courseService.getService(+id);
        if (!service) return;
        else this.info = service;
      }
    } catch (error) {

    }
  }

  ngOnInit() { }

  setLearnMor() {
    this.learnMore = true;
  }
  setSeeMore(id: number | string) { this.seeMore[id] = true; }
  toggleSeeMore(id: number | string) { this.seeMore[id] = !this.seeMore[id]; }
  startNow() {
    this.navCtrl.navigateForward(["home/course-play-list", this.info.id]);
  }
  goCouresInfo() {
    this.navCtrl.navigateForward(["home/course-info"]);
  }
  goTeacher() {
    this.navCtrl.navigateForward(["home/teacher-profile"]);
  }
  goStudent() {
    this.navCtrl.navigateForward(["home/other-profile"]);
  }

  back() {
    /** private navCtrl: NavController */
    this.navCtrl.back();
  }

  addFavorite() {
    this.favorite = !this.favorite;
  }
}
