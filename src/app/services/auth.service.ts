import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ITokenData, Role, User } from '../model/token-model';
import { Observable, catchError, delay, lastValueFrom, tap } from 'rxjs';
import { IContactUs } from '../model/contact.us-model';
import { Chatchable } from './catche-service.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends Chatchable {

  static key: string = "auth";
  static get isTeacher(): boolean {
    return AuthService.user.role == Role.TEACHER;
  }
  static get isloged(): boolean {
    return AuthService.tokenData?.token?.access_token && AuthService.tokenData?.token?.access_token.trim().length > 0 ? true : false;

  };

  static get token(): string {
    return AuthService.tokenData?.token?.access_token ?? "";
  }

  static get user(): User {
    return AuthService.tokenData?.user ?? { name: "", email: "" } as User;;
  }

  static get tokenData(): ITokenData | undefined {
    var tokenDataString = localStorage.getItem(AuthService.key);
    if (!tokenDataString) return undefined;
    var tokenData = tokenDataString && (JSON.parse(tokenDataString) as ITokenData);
    if (typeof (tokenData as ITokenData) != 'string')
      return tokenData as ITokenData;
    return undefined;
  }

  constructor(private http: HttpClient, private router: NavController) {
    super(http);
    if(AuthService.token) this.getMe();
  }

  login(login: { emai: string, pasword: string }) {
    return lastValueFrom(this.http.post(environment.api + '/user/login', login).pipe(
      tap(async (res: ITokenData) => {
        localStorage.setItem(AuthService.key, JSON.stringify(res));
        await this.getMe();
      }),

    ));
  }

  register() { }

  async changePassword(payload: any) {
    const url: string = `${environment.api}/update-password`;
    return await lastValueFrom(this.http.post(url, payload));
  }

  async changeProfile(file: FormData) {
    const url: string = `${environment.api}/profile-image`;
    return await lastValueFrom(this.http.post(url, file));
  }

  async addedStudentFile(file: File, courseId: number) {
    const formData = new FormData();
    formData.set('file', file)
    const url: string = `${environment.api}/course/send-homework/${courseId}`;
    return await lastValueFrom(this.http.post(url, formData));
  }
  async classAttendance(courseId: number | undefined, attendant_date: Date) {
    const url: string = `${environment.api}/course/apply-attendant`;
    return await lastValueFrom(this.http.post(url, {
      courseId, attendant_date
    }));
  }

  async getMe() {
    const url: string = `${environment.api}/user-info`;
    return await lastValueFrom(this.http.get<User>(url).pipe(
      tap(async res => {

        if (AuthService.tokenData) {
          AuthService.tokenData.user = res;
          localStorage.setItem(AuthService.key, JSON.stringify({ ...AuthService.tokenData, user: res }))
        }
      }),
      catchError(err => {
        localStorage.removeItem(AuthService.key);
        this.router.navigateForward("/auth/login");

        return err;
      })
    ));
  }

  async getContactInfo() {
    let path = `${environment.api}/settings`;
    return await this.get<IContactUs>("settings", path);
  }

}
