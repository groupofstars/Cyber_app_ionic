import { Injectable } from '@angular/core';
import { SplashService } from './splash.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SplashGuardService {
  constructor(private splashService: SplashService, private router: NavController) { }

  canActivate(): boolean {
    const isOk = this.splashService.IsSplashed;
    if (isOk) {
      this.router.navigateForward(['/home']);
    }
    return !isOk;
  }
}
