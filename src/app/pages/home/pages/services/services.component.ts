
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ISliderData } from 'src/app/model/slider.model';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  data: ISliderData | undefined;

  constructor(private storage: TestService,
    private router:NavController) {
    this.data = {
      title: "test",
      description: "description",
    } as ISliderData
    this.getServicesItems();

  }

  ionViewWillEnter() {

  }

  getServicesItems() {
    this.storage.getServices().subscribe(res => {
      if (this.data)
        this.data.items;
    });
  }

}
