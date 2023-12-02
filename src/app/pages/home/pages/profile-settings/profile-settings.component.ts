import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent {
  form!: FormGroup;
  showePassword: boolean = false;
  changing: boolean = false;
  constructor(private fb: FormBuilder,
    private navController: NavController,
    private router: NavController,
    private aut: AuthService,
    private loadingCtrl: LoadingController
  ) { }

  ionViewWillEnter() {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      old_password: [null, Validators.required],
      new_password: [null, Validators.required]
    });
  }

  async save() {
    const loading = await this.loadingCtrl.create({
      message: 'Please wait',
      animated: true,

    });
    loading.present();
    try {
      await this.aut.changePassword(this.form.value);
      loading.dismiss();
      this.router.navigateForward(['/home/profile']);
    } catch (error) {
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

  back() {
    this.navController.back();
  }

  toggleShowPassword() {
    this.showePassword = !this.showePassword;
  }

}
