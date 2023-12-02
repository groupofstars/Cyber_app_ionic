import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {
  constructor(private auth: AuthService, private router:NavController) { }

  canActivate(): boolean {
    const isOk = AuthService.isloged;
    if (!isOk) {
      this.router.navigateForward(['/auth/login']);
    }
    return isOk;
  }
}
