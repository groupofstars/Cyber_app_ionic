import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IContactUs } from 'src/app/model/contact.us-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent  implements OnInit {
  data!: IContactUs;
  constructor(private navCtrl: NavController,private authServ: AuthService) { }

  async ionViewWillEnter() {
  }

  async ngOnInit() {
    this.data = await this.authServ.getContactInfo()

  }

  back() {
    this.navCtrl.back();
  }
}
