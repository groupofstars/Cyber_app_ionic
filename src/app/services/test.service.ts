import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ICourseItem } from '../model/course.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {


  iconPath: string = "/assets/icon";


  constructor(private storageService: StorageService) {
    this.coursePathMap = this.coursePathMap.bind(this);
    this.servicesPathMap = this.servicesPathMap.bind(this);
  }

  getCourses(): Observable<ICourseItem[]> {
    return this.storageService.get<ICourseItem[]>("courses").pipe(map(this.coursePathMap));
  }
  
  getServices(): Observable<ICourseItem[]> {
    return this.storageService.get<ICourseItem[]>("services").pipe(map(this.servicesPathMap));
  }



  coursePathMap(items: any[]): any[] {
    const url: string = `${this.iconPath}/courses`;
    return items.map(it => { it.icon = `${url}/${it.icon}.png`; return it; })
  }
  servicesPathMap(items: any[]): any[] {
    const url: string = `${this.iconPath}/services`;
    return items.map(it => { it.icon = `${url}/${it.icon}.png`; return it; })
  }
}
