import { Injectable } from '@angular/core';
import { Chatchable } from './catche-service.service';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { IMyCourse } from '../model/my.course-model';
import { environment } from 'src/environments/environment';
import { async, lastValueFrom, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyCourseService extends Chatchable {

  key: string = "myCourses";
  path = `${environment.api}/my-course`;
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }

  async getMyCourses(ongoing?: boolean): Promise<IMyCourse[]> {

    var courses: IMyCourse[] = await await this.get<IMyCourse[]>("myCourses", this.path);
    if (ongoing == undefined || ongoing == null) return courses;
    else if (ongoing) courses = courses.filter(item => !item.certificated)
    else courses = courses = courses.filter(item => item.certificated)

    return await lastValueFrom(of(courses));


  }
  async getMyCourse(id: number) {
    const courses = await this.get<IMyCourse[]>("myCourses", this.path);
    if (courses)
      return courses.find(el => el.id == id);
    return undefined;
  }
  async enrollNow(courseId: number) {
    var path = `${environment.api}/enroll-course`;
    return await lastValueFrom(this.httpClient.post(path, { courseId }).pipe(
      tap(async res => {
        await this.get<IMyCourse[]>("myCourses", this.path, true);
      })
    ));
  }

}
