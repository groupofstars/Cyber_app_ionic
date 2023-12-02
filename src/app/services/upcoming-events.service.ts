import { Injectable } from '@angular/core';
import { Chatchable } from './catche-service.service';
import { StorageService } from './storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUpcomingEvent } from '../model/upcomingEvents-model';

@Injectable({
  providedIn: 'root'
})
export class UpcomingEventsService extends Chatchable {

  
  constructor(private storageService: StorageService, private httpClient: HttpClient) {
    super(httpClient);
  }


  async getEvents() {
    var path = `${environment.api}/upcoming-events`;
    return await this.get<IUpcomingEvent[]>("upcoming-events", path);
  }
}
