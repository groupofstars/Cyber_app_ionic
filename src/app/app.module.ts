import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { register } from 'swiper/element/bundle';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco-root.module';
import { SharedModule } from './shared/shared.module';
import { ChatingComponent } from './pages/home/pages/chating/chating.component';
import { QuizComponent } from './pages/home/pages/quiz/quiz.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { TokenInterceptorService } from './services/token-interceptor.service';
register();
@NgModule({
  declarations: [AppComponent,  ChatingComponent,
    QuizComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ animated: false }),
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    SharedModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService, // Kullanmak istediğiniz Interceptor'ı buraya ekleyin
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
