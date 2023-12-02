import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  FormGroup!: FormGroup;
  showError: boolean = false;

  showePassword: boolean = false;
  rememberMe: boolean = false;

  get email(): FormControl { return this.FormGroup.get("email") as FormControl; }
  get password(): FormControl { return this.FormGroup.get("password") as FormControl; }

  constructor(private router:NavController, private fb: FormBuilder, private authServ: AuthService, private loadingCtrl: LoadingController) { }

  ionViewWillEnter() {
    this.initForm();
  }

  initForm() {
    this.FormGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  register() {
    this.router.navigateForward(["/auth/register"]);
  }

  async login() {
    if (this.FormGroup.invalid) {
      this.FormGroup.markAllAsTouched();
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Please wait',
      animated: true,

    });
    loading.present();
    try {
      await this.authServ.login(this.FormGroup.value);
      loading.dismiss();
      this.router.navigateForward(["/home"]);
    } catch (error) {
      const err = error as HttpErrorResponse;
      console.error(JSON.stringify(err));
      
      loading.dismiss();
      var errorpb = await this.loadingCtrl.create({
        spinner: null,
        message: 'Opps! There is an error.',
        backdropDismiss: true,
        showBackdrop: true,
        animated: true,
        duration: 3000
      });

      errorpb.present();
    }
    loading.dismiss();
  }
  toggleShowPassword() {
    this.showePassword = !this.showePassword;
  }
  toggleRememberMe() {
    this.rememberMe = !this.rememberMe;
    localStorage.setItem('rememberMe', String(this.rememberMe));
  }
}
