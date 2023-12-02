import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceTestsComponent } from '../pages/service-tests/service-tests.component';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { BluryBackgroundComponent } from './components/blury-background/blury-background.component';
import { LogoComponent } from './components/logo/logo.component';
import { IconInputComponent } from './components/icon-input/icon-input.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { TeacherCardComponent } from './components/teacher-card/teacher-card.component';
import { SlideHeaderComponent } from './components/slide-header/slide-header.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { MyCourseCardComponent } from './components/my-course-card/my-course-card.component';
import { ImageFallBackDirective } from './directive/image-fall-back.directive';



@NgModule({
  declarations: [
    ServiceTestsComponent,
    InfoCardComponent,
    HeaderComponent,
    BluryBackgroundComponent,
    LogoComponent,
    IconInputComponent,
    CourseCardComponent,
    TeacherCardComponent,
    SlideHeaderComponent,
    ServiceCardComponent,
    MyCourseCardComponent,
    ImageFallBackDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ServiceTestsComponent,
    InfoCardComponent,
    HeaderComponent,
    BluryBackgroundComponent,
    LogoComponent,
    IconInputComponent,
    ReactiveFormsModule,
    CourseCardComponent,
    TeacherCardComponent,
    SlideHeaderComponent,
    ServiceCardComponent,
    MyCourseCardComponent,
    ImageFallBackDirective

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
