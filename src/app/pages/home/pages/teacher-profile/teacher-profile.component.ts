import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Teacher } from 'src/app/model/teacher-model';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { TeacherService } from 'src/app/services/teacher.service';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.scss'],
})
export class TeacherProfileComponent implements OnInit {
  teacher: Teacher | undefined;
  constructor(private navCtrl: NavController,
    private ac: ActivatedRoute,
    private teacherService: TeacherService,
    private chatService: ChatService, private loadingCtrl: LoadingController,
  ) { }

  async ionViewWillEnter() {
    const idStorage = this.ac.snapshot.paramMap.get("id");
    if (idStorage)
      this.teacher = await this.teacherService.getFind(+idStorage);
  }
  authServ = AuthService
  ngOnInit() { }
  back() {
    /** private navCtrl: NavController */
    this.navCtrl.back();
  }
  goTeacher() {
    this.navCtrl.navigateForward(["home/teacher-profile"])
  }
  goCourese() {
    this.navCtrl.navigateForward(["home/course-description"])
  }
  async chat() {
    if (this.authServ.isloged) {
      const loading = await this.loadingCtrl.create({
        message: 'Please wait',
        animated: true,

      });
      loading.present();
      if (this.teacher && this.teacher.id) {
        try {
          const chat = await this.chatService.createNewChat(this.teacher.id);
          loading.dismiss();
          this.navCtrl.navigateForward(["/chating", chat.id])
        } catch (error) {
          loading.dismiss();
        }
    } else {
      var errorpb = await this.loadingCtrl.create({
        spinner: null,
        message: 'Opps! There is an error.',
        backdropDismiss: true,
        showBackdrop: true,
        animated: true,
        duration: 3000
      });
      loading.dismiss();
      errorpb.present();
    }
    }
  }
}
