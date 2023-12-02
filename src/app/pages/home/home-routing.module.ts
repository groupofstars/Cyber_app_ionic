import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomePage } from "./home.page";
import { ChatsComponent } from "./pages/chats/chats.component";
import { CourseInfoComponent } from "./pages/course-info/course-info.component";
import { CourseLessonsComponent } from "./pages/course-lessons/course-lessons.component";
import { CoursePlayListComponent } from "./pages/course-play-list/course-play-list.component";
import { CoursesComponent } from "./pages/courses/courses.component";
import { CouseDescriptionComponent } from "./pages/couse-description/couse-description.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { MyCourseComponent } from "./pages/my-course/my-course.component";
import { OthersProfileComponent } from "./pages/others-profile/others-profile.component";
import { ServicesComponent } from "./pages/services/services.component";
import { TeacherProfileComponent } from "./pages/teacher-profile/teacher-profile.component";
import { CourseListComponent } from "./pages/course-list/course-list.component";
import { ProfileSettingsComponent } from "./pages/profile-settings/profile-settings.component";
import { ServiceDescriptionComponent } from "./pages/service-description/service-description.component";
import { ContactUsComponent } from "./pages/contact-us/contact-us.component";
import { LoginGuardService } from "src/app/services/login-guard.service";

const routes: Routes = [
  {
    path: "",
    component: HomePage,
    children: [
      {
        path: "",
        component: HomePageComponent,
      },
      {
        path: "courses",
        component: CoursesComponent,
      },
      {
        path: "services",
        component: ServicesComponent,
      },
      {
        path: 'chats',
        component: ChatsComponent,
        canActivate: [LoginGuardService]
      },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [LoginGuardService]
      },
      {
        path: "settings",
        component: ProfileSettingsComponent,
      },
      {
        path: "course-info",
        component: CourseInfoComponent,
      },
      {
        path: "course-list",
        component: CourseListComponent,
      },
      {
        path: "teacher-profile/id",
        component: TeacherProfileComponent,
      },
      {
        path: "search",
        loadChildren: () =>
          import("./pages/search/search.module").then(
            (m) => m.SearchPageModule
          ),
      },
      {
        path: "course-description/:id",
        component: CouseDescriptionComponent,
      },
      {
        path: "service-description/:id",
        component: ServiceDescriptionComponent,
      },
      {
        path: "my-course",
        component: MyCourseComponent,
        canActivate: [LoginGuardService]
      },
      {
        path: "course-lessons/:id",
        component: CourseLessonsComponent,
      },
      {
        path: "course-play-list/:id/:index",
        component: CoursePlayListComponent,
        canActivate: [LoginGuardService]

      },
      {
        path: 'teacher-profile/:id',
        component: TeacherProfileComponent
      },
      {

        path: "other-profile",
        component: OthersProfileComponent,
      },
      {

        path: "contact",
        component: ContactUsComponent,
      },
      {
        path: "my-certificate",
        loadChildren: () =>
          import("./pages/certificate/certificate.module").then(
            (m) => m.CertificatePageModule
          ),
      },
      {
        path: "teacher-profile",
        component: TeacherProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
