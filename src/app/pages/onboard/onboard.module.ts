import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { OnBoardRoutingModule } from './onboard-routing.module';
import { OnBoardPage } from './onboard.page';
import { SplashComponent } from './pages/splash/splash.component';
import { BoardingComponent } from './pages/boarding/boarding.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnBoardRoutingModule,
    SharedModule
  ],
  declarations: [
    OnBoardPage,
    SplashComponent,
    BoardingComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnBoardPageModule { }
