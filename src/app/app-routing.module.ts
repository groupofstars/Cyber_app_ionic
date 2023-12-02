import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ServiceTestsComponent } from './pages/service-tests/service-tests.component';
import { QuizComponent } from './pages/home/pages/quiz/quiz.component';
import { ChatingComponent } from './pages/home/pages/chating/chating.component';
import { LoginGuardService } from './services/login-guard.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'onboard',
    loadChildren: () => import('./pages/onboard/onboard.module').then(m => m.OnBoardPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/authentication/authentication.module').then(m => m.AuthenticationPageModule)
  },
  {
    path: 'test',
    component: ServiceTestsComponent,

  },
  {
    path: 'quiz/:curseId/:quizId',
    component: QuizComponent
  },
  {
    path: '',
    redirectTo: 'onboard',
    pathMatch: 'full'
  },
  {
    path: 'chating/:id',
    component: ChatingComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
