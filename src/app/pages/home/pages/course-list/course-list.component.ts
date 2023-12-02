import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CourseListService } from 'src/app/services/course-list.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent {
  data: any;
  title: string = '';
  isService: boolean = false;
  constructor(private route: ActivatedRoute,
    private navCtrl: NavController,
    private courseServ: CourseService,
    private courseListService: CourseListService,
    private router: NavController,
  ) { }

  ionViewWillEnter() {
    this.getQueryParams();
    this.getCours();
  }

  getQueryParams() {
    this.route.queryParams.subscribe((data) => {
    });
  }

  back() {
    this.navCtrl.back();
  }

  getCours() {
    this.isService = this.courseListService.isService;
    this.data = this.courseListService.List;
    this.title = this.courseListService.header;
  }
  goCouresInfo(id: number) {
    if (this.isService) return;
    this.router.navigateForward(["home/course-description", id]);
  }
}
