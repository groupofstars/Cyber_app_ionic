import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { NavController } from '@ionic/angular';
import { ICourseInfo } from 'src/app/model/infoData.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-play-list',
  templateUrl: './course-play-list.component.html',
  styleUrls: ['./course-play-list.component.scss'],
})
export class CoursePlayListComponent implements OnInit {

  @ViewChild('video', { static: true }) video!: ElementRef;


  info: ICourseInfo = {};
  url: string | undefined;
  id: number = 0;
  constructor(private ac: ActivatedRoute, private navCtrl: NavController, private courseService: CourseService) {
  }

  ionViewDidEnter() {
    ScreenOrientation.unlock();
  }
  ionViewWillLeave() {
    ScreenOrientation.lock({
      orientation: 'portrait'
    });
  }
  ionViewWillEnter() {
    this.getInfo();
  }

  ngOnInit() { }
  back() {
    /**private navCtrl: NavController */
    this.navCtrl.back();
  }

  async getInfo() {

    //this.activatedRouter.snapshot.paramMap.get("id");
    this.id = +(this.ac.snapshot.paramMap.get("id") ?? 0);
    const index = +(this.ac.snapshot.paramMap.get("index") ?? 0);
    this.info = await this.courseService.getCourseDetail(this.id);

    var lessons = this.info?.lessons;
    var lesson;
    if (lessons && lessons.length > index) lesson = lessons[index];
    if (lesson) this.url = lesson.url;
  }

  openUrl(i: number) {
    if (this.info && this.info.lessons) {
      this.url = this.info.lessons[i].url;
      this.video.nativeElement.src = this.url;
    }
  }
}
