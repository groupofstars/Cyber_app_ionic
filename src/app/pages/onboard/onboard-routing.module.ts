import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OnBoardPage } from './onboard.page';
import { SplashComponent } from './pages/splash/splash.component';
import { BoardingComponent } from './pages/boarding/boarding.component';
import { SplashGuardService } from 'src/app/services/splash-guard.service';

const routes: Routes = [
  {
    path: '',
    component: OnBoardPage,
    children: [

      {
        path: 'splash',
        component: SplashComponent,
        canActivate: [SplashGuardService]
      },
      {
        path: 'boarding',
        component: BoardingComponent
      },





      {
        path: '',
        redirectTo: 'splash',
        pathMatch: 'full'
      },


    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnBoardRoutingModule { }
