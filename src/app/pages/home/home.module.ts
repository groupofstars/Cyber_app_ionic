import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ServicesComponent } from './pages/services/services.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseInfoComponent } from './pages/course-info/course-info.component';
import { CouseDescriptionComponent } from './pages/couse-description/couse-description.component';
import { MyCourseComponent } from './pages/my-course/my-course.component';
import { CourseLessonsComponent } from './pages/course-lessons/course-lessons.component';
import { CoursePlayListComponent } from './pages/course-play-list/course-play-list.component';
import { OthersProfileComponent } from './pages/others-profile/others-profile.component';
import { TeacherProfileComponent } from './pages/teacher-profile/teacher-profile.component';
import { CourseListComponent } from './pages/course-list/course-list.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';
import { ServiceDescriptionComponent } from './pages/service-description/service-description.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule
  ],
  declarations: [
    HomePage,
    HomePageComponent,
    CoursesComponent,
    ServicesComponent,
    ChatsComponent,
    ProfileComponent,
    CourseInfoComponent,
    CouseDescriptionComponent,
    MyCourseComponent,
    CourseLessonsComponent,
    CoursePlayListComponent,
    OthersProfileComponent,
    TeacherProfileComponent,
    CourseListComponent,
    ProfileSettingsComponent,
    ServiceDescriptionComponent,
    ContactUsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule { }
