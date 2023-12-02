import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  path: string = "/assets/DataBase";

  constructor(private httpClient: HttpClient) { }

  get<T>(data: string): Observable<T> {
    const url: string = `${this.path}/${data}.json`;
    return this.httpClient.get<T>(url);
  }
}
