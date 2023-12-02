import { Injectable } from '@angular/core';
import { ICourseItem } from '../model/course.model';
import { ICourseInfo } from '../model/infoData.model';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CourseListService {
  isService: boolean = false;
  header: string = "";

  list: ICourseItem[] | undefined;
  get List() { return this.list ?? []; }
  set List(value: ICourseItem[]) { this.list = value; }
  constructor(private router:NavController) { }

  goCourseList(value: ICourseItem[]) {
    this.header = "";
    this.list = [];
    this.isService = false;
    this.List = value;
    this.router.navigateForward(["home/course-list"]);
  }
  goServicesList(value: ICourseInfo[]) {
    this.isService = true;
    this.List = value;
    this.router.navigateForward(["home/course-list"]);
  }

}
