import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionSheetController, IonContent, IonDatetime, IonModal, LoadingController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { MyCourseComponent } from '../my-course/my-course.component';
import { IMyCourse } from 'src/app/model/my.course-model';
import { MyCourseService } from 'src/app/services/my-course.service';
import { ITokenData, User } from 'src/app/model/token-model';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ICourseInfo } from 'src/app/model/infoData.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @ViewChild('classModal') classModal!: IonModal;
  @ViewChild('dateModal') dateModal!: IonModal;
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild('content') content!: IonContent;
  @ViewChild('modalAttendance') modalAttendance!: IonModal;




  get user(): User { return AuthService.user };
  get isloged(): boolean { return AuthService.isloged };
  isLoginModal?: boolean;
  processing?: boolean;
  myCourseList: IMyCourse[] = [];
  search: string = '';
  FileProcessing?: boolean;
  profilData: any;

  // submet asigment date
  dataTime: Date = new Date();
  maxDate: Date = new Date();
  selectedCourse: IMyCourse | undefined;
  attendanceDate: Date = new Date();
  constructor(public authServ: AuthService,
    private router: NavController,
    private myCourseService: MyCourseService,
    private loadingCtrl: LoadingController,
    private modalController: ModalController
  ) {}

  isteacher = AuthService.isTeacher;
  async ionViewWillEnter() {
    this.dataTime = new Date()
    this.getCourse();
    this.profilData = await this.authServ.getMe();
  }

  ionViewDidEnter() {
    this.content.scrollToTop();
  }

  imageFormData = new FormData();
  async uploadProfileImg(input: HTMLInputElement) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading',
      animated: true,

    });
    loading.present();
    if (input.files && input.files[0]) {
      this.imageFormData.set('image', input.files?.[0])

      await this.authServ.changeProfile(this.imageFormData);

      this.profilData = await this.authServ.getMe();
      if (this.imageFormData)
        loading.dismiss();

      try {
      } catch (e) {
        console.log(e);
      }
    }
  }

  async uploadFile(input: HTMLInputElement) {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading',
      animated: true,
    });
    loading.present();
    if (input.files && input.files[0]) {
      try {
        if (!this.selectedCourse) {
          loading.dismiss();
          return;
        }
        await this.authServ.addedStudentFile(input.files[0], this.selectedCourse.courseId ? this.selectedCourse.courseId : -1);
        loading.dismiss();
        await this.modalController.dismiss();

      } catch (e) {
        console.error(e);
      }
    }
  }

  logout() {
    localStorage.clear();
    this.isLoginModal = false;
    setTimeout(() => {
      this.router.navigateForward(['/home']);
    }, 200);
  }


  async getCourse() {
    this.myCourseList = await this.myCourseService.getMyCourses();
  }

  getItems() {
    if (this.search) {
      return this.myCourseList.filter((x) => x.course && x.course.title && x.course.title.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
    }
    return this.myCourseList;
  }

  cancel() {
    this.isLoginModal = false;
  }

  async submitAssigment() {
    const loading = await this.loadingCtrl.create({
      message: 'Uploading',
      animated: true,
    });
    loading.present();
    this.dateModal.onDidDismiss().then(async () => {
      await this.modalAttendance.dismiss();

    })
    await this.authServ.classAttendance(this.selectedCourse?.courseId, this.attendanceDate);

    this.dateModal.isOpen = false;
    loading.dismiss();
  }

  setDate(item: IMyCourse) {
    this.dateModal.isOpen = true;
    this.selectedCourse = item;
  }
}
