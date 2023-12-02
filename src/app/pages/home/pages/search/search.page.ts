import { HttpClient } from "@angular/common/http";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, UntypedFormControl } from "@angular/forms";
import { NavController } from "@ionic/angular";
import { ICourseInfo } from "src/app/model/infoData.model";
import { CourseService } from "src/app/services/course.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
})
export class SearchPage implements OnInit {
  @ViewChild("searchInput", { static: false })
  searchInput!: ElementRef<HTMLInputElement>;
  results: ICourseInfo[] = []
  form!: FormGroup;
  get searchFormControl() { return this.form?.get("searchKey") as FormControl };
  get level() { return this.form?.get("level") as FormGroup };
  get categoriesFormControl() { return this.form?.get("categories") as FormControl };
  get rateFormControl() { return this.form?.get("rate") as FormControl };

  constructor(private courseServ: CourseService, private fb: FormBuilder, private navCtrl: NavController) { }
  initForm() {
    this.form = this.fb.group({
      searchKey: [''],
      level: this.fb.group({
        beginner: [false],
        expert: [false],
        intermediate: [false],
        all: [false]
      }),
      categories: [''],
      rate: ['']
    });

  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.initForm();
    this.level.get('all')?.valueChanges.subscribe(all => {
      if (all) {
        this.level.get('beginner')?.setValue(true, { emitEvent: false })
        this.level.get('expert')?.setValue(true, { emitEvent: false })
        this.level.get('intermediate')?.setValue(true, { emitEvent: false })
      } else if ((this.level.get('beginner')?.value && this.level.get('expert')?.value && this.level.get('intermediate')?.value)) {
        this.level.get('beginner')?.setValue(false, { emitEvent: false })
        this.level.get('expert')?.setValue(false, { emitEvent: false })
        this.level.get('intermediate')?.setValue(false, { emitEvent: false })
      }
    });
    this.form.valueChanges.subscribe(value => {

      if ((value.level.beginner && value.level.expert && value.level.intermediate) && !value.level.all) {
        this.level.get('all')?.setValue(true, { emitEvent: false });

      }

      if ((!value.level.beginner || !value.level.expert || !value.level.intermediate) && value.level.all) {
        this.level.get('all')?.setValue(false, { emitEvent: false });
      }
      /*else if (value.level.beginner && value.level.expert && value.level.intermediate) {
       this.level.get('all')?.setValue(true, { emitEvent: false })
     }
  
  */
      this.getdata();
    });
    setTimeout(() => {
      this.searchInput?.nativeElement.focus();
    }, 200);
  }

  async getdata() {
    this.results = await this.courseServ.FilterCourse(this.form?.value);

  }
  courseDetail(course: ICourseInfo) {
    this.navCtrl.navigateForward(["home/course-description", course.id]);
  }
}

export interface SearchCourse {
  searchKey: string;
  level: SearchLevel;
  categories: number;
  rate: number;
}

interface SearchLevel {
  beginner: boolean;
  expert: boolean;
  intermediate: boolean;
  all: boolean;
}
