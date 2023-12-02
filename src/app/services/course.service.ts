import { Injectable } from '@angular/core';
import { Observable, delay, filter, firstValueFrom, from, lastValueFrom, map, of, share, tap } from 'rxjs';
import { ICourseItem } from '../model/course.model';
import { StorageService } from './storage.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Chatchable } from './catche-service.service';
import { CourseCategori } from '../model/course-categori.model';
import { AskQuestion, ICourseLesson, ICourseSection, ICourseInfo } from '../model/infoData.model';
import { IUser } from '../model/user.model';
import { IMyCourse } from '../model/my.course-model';
import { SearchCourse } from '../pages/home/pages/search/search.page';
import { IServiceItem } from '../model/service.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends Chatchable {

  pathServices = `${environment.api}/service-list`;

  constructor(private storageService: StorageService, private httpClient: HttpClient) {
    super(httpClient);
  }


  async getCourses() {
    var path = `${environment.api}/course-list`;
    return await this.get<ICourseInfo[]>("courses", path);
  }
  async getCoursesByCategory(id: number) {
    var path = `${environment.api}/course-list/${id}`;
    return await this.get<ICourseInfo[]>(`coursesByCategory${id}`, path);
  }
  async getCourse(id: number) {
    const courses = await this.getCourses();
    if (courses)
      return courses.find(el => el.id == id);
    return undefined;
  }
  async getCourseDetail(id: number) {
    var path = `${environment.api}/course-detail/${id}`;
    return await this.get<ICourseInfo>(`courses${id}`, path);
  }
  async getServices() {
    return await this.get<IServiceItem[]>("services", this.pathServices);
  }
  async getService(id: number) {
    const services = await this.getServices();
    if (services)
      return this.getData<IServiceItem[]>("services").find(el => el.id == id);
    return undefined;
  }
  async getPopularCourses() {
    var path = `${environment.api}/populer-courses`;
    return await this.get<ICourseInfo[]>("popularCourses", path);

  }

  async getFeaturedCourses() {
    const courses = await this.getCourses();
    if (courses)
      return courses.filter(el => el.is_featured ?? false);
    return undefined;
  }

  async getCategories(): Promise<CourseCategori[]> {
    const key = "categories";
    var path = `${environment.api}/category-list`;
    return await this.get<CourseCategori[]>(key, path);
  }



  async getEditorChoice() {
    const courses = await this.getCourses();
    if (courses)
      return courses.filter(el => el.is_editor_choice ? el.is_editor_choice : false);
    return undefined;

  }
  async getRecommendedChoice() {
    const courses = await this.getCourses();
    if (courses)
      return courses.filter(el => el.is_recommended_choice ? el.is_recommended_choice : false);
    return undefined;
  }



  async FilterCourse(param: SearchCourse) {
    var path = `${environment.api}/course-search`;
    return await lastValueFrom(this.httpClient.post<ICourseInfo[]>(path, param));
  }


  async isEnrolled(courseId: number | undefined) {
    var path = `${environment.api}/course/is-enrolled/${courseId}`;
    return await lastValueFrom(this.httpClient.get<boolean>(path));
  }
}
