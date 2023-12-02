import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { SplashService } from 'src/app/services/splash.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  formGroup!: FormGroup;
  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  activeIndex: number = 0;



  steps: FormControl[][] | undefined;
  tapSteps: FormControl<any>[] | undefined;

  constructor(private router: NavController,
    private splashService: SplashService,
    private fb: FormBuilder) {
  }

  ionViewWillEnter() {
    this.initForm();
    this.steps = [
      [this.name, this.email, this.prefix],
      [this.selectcourse, this.school, this.notionality, this.occupation],
      [this.postalCode, this.phone, this.cityName, this.nid_birthCertificateNo_passportNo],
      [this.officeaddress, this.address, this.studentId_roll, this.department]
    ];
  }

  initForm() {
    this.formGroup = this.fb.group({
      prefix: [null, Validators.required],
      cityName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      occupation: [null, Validators.required],
      officeaddress: [null, Validators.required],
      notionality: [null],
      selectcourse: [null],
      school: [null, Validators.required],
      phone: [null, Validators.required],
      name: [null, Validators.required],
      address: [null, Validators.required],
      postalCode: [null, Validators.required],
      dateOfBirth: [null],
      department: [null],
      studentId_roll: [null],
      nid_birthCertificateNo_passportNo: [null, Validators.required],
    });
  }

  slideChange() {
    this.activeIndex = +this.swiperRef?.nativeElement.swiper.activeIndex;
  }

  slideNext() {
    this.tapSteps = this.steps && this.steps[this.activeIndex];
    if (this.tapSteps && this.tapSteps.some(e => e.invalid)) {
      this.tapSteps.forEach(el => el.markAsTouched())
      return
    }
    this.swiperRef?.nativeElement.swiper.slideNext();

  }

  login() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return
    }
    this.splashService.onboarded();
    this.router.navigateForward(["/auth/login"]);
  }




  get cityName(): FormControl { return this.formGroup?.get("cityName") as FormControl; }
  get prefix(): FormControl { return this.formGroup?.get("prefix") as FormControl; }
  get occupation(): FormControl { return this.formGroup?.get("occupation") as FormControl; }
  get officeaddress(): FormControl { return this.formGroup?.get("officeaddress") as FormControl; }
  get notionality(): FormControl { return this.formGroup?.get("notionality") as FormControl; }
  get selectcourse(): FormControl { return this.formGroup?.get("selectcourse") as FormControl; }
  get school(): FormControl { return this.formGroup?.get("school") as FormControl; }
  get phone(): FormControl { return this.formGroup?.get("phone") as FormControl; }
  get address(): FormControl { return this.formGroup?.get("address") as FormControl; }
  get postalCode(): FormControl { return this.formGroup?.get("postalCode") as FormControl; }
  get dateOfBirth(): FormControl { return this.formGroup?.get("dateOfBirth") as FormControl; }
  get studentId_roll(): FormControl { return this.formGroup?.get("studentId_roll") as FormControl; }
  get email(): FormControl { return this.formGroup?.get("email") as FormControl; }
  get name(): FormControl { return this.formGroup?.get("name") as FormControl; }
  get nid_birthCertificateNo_passportNo(): FormControl { return this.formGroup?.get("nid_birthCertificateNo_passportNo") as FormControl; }
  get department(): FormControl { return this.formGroup?.get("department") as FormControl; }

}
