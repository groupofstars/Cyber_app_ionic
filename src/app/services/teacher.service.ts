import { Injectable } from '@angular/core';
import { Teacher } from '../model/teacher-model';
import { environment } from 'src/environments/environment';
import { lastValueFrom, of } from 'rxjs';
import { ICourseInfo } from '../model/infoData.model';
import { Chatchable } from './catche-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeacherService extends Chatchable {

  key: string = "teacherList";
  constructor(private http: HttpClient) {
    super(http);
  }

  async getTheacher() {
    var path = `${environment.api}/teacher-list`;
    return await this.get<Teacher[]>(this.key, path);
  }

  async getFind(id: number) {
    const teachers = await this.getTheacher();
    if (teachers)
      return teachers.find(el => el.id == id);
    return undefined;
  }
}
