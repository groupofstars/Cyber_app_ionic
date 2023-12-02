import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class SplashService {

  onBoardKey: string = "isOnBoarded";
  IsSplashed: boolean = false;
  constructor() { }

  IsOnboarded(): boolean {
    var stringData = localStorage.getItem(this.onBoardKey);
    if (stringData == null) return false;
    return JSON.parse(stringData) as boolean;
  }

  onboarded() {
    localStorage.setItem(this.onBoardKey, JSON.stringify(true));
  }


}
