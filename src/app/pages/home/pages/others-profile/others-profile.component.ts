import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-others-profile',
  templateUrl: './others-profile.component.html',
  styleUrls: ['./others-profile.component.scss'],
})
export class OthersProfileComponent implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() { }

  back() {
    this.navCtrl.back();
  }

  goMessage() {
    this.navCtrl.navigateForward(["/chating"]);
  }
}
