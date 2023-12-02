import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ChatMessage } from 'src/app/model/chat-model';
import { ICourseInfo, ICourseLesson } from 'src/app/model/infoData.model';
import { IMyCourse } from 'src/app/model/my.course-model';
import { IQuiz } from 'src/app/model/quiz.model';
import { ChatService } from 'src/app/services/chat.service';
import { CourseService } from 'src/app/services/course.service';
import { GlobalService } from 'src/app/services/global.service';
import { MyCourseService } from 'src/app/services/my-course.service';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-course-lessons',
  templateUrl: './course-lessons.component.html',
  styleUrls: ['./course-lessons.component.scss'],
})
export class CourseLessonsComponent {
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  id: number = 0;
  isCardSelected: number = -1;
  type: 'lessons' | 'discuss' = 'lessons';
  lessons: ICourseLesson[] = []
  selected: any;
  progeress: number = -1;
  activeIndex: number = 0;
  data: IMyCourse | undefined;

  quizes: IQuiz[] | undefined;
  constructor(private navCtrl: NavController,
    private globalService: GlobalService,
    private ac: ActivatedRoute,
    private courseService: CourseService,
    private myCourseService: MyCourseService,
    private chatService: ChatService,
    private quizService: QuizService
  ) { }

  async ionViewWillEnter() {
    const stringId = this.ac.snapshot.paramMap.get("id");
    if (stringId) this.id = +stringId;
    try {
      await this.getLessons();
    } catch (error) { }
    try {
      await this.getMessages();
    } catch (error) { }
    try {
      await this.getCourseQuizes();
    } catch (error) { }

  }
  async getLessons() {

    if (this.id != null) {
      this.data = await this.myCourseService.getMyCourse(this.id)
      if ((this.data && this.data.courseId) || this.data?.courseId == 0)
        this.data.course = await this.courseService.getCourse(this.data.courseId) ?? this.data?.course;
      this.lessons = this.data && this.data.course && this.data.course.lessons ? this.data.course.lessons : [];
    }
  }

  async getMessages() {
    if (!this.data?.courseId) return;
    this.messages = await this.chatService.getMessages(+this.data.chatId)
    // this.initTimer();
  }
  timer!: any;
  messages!: ChatMessage[];


  initTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(async () => {
      const lastIndex = this.messages.length;
      if (lastIndex > 0) {
        const message = this.messages[lastIndex - 1];
        const newMessages = await this.chatService.getNewMessages(message.chatId, message.created)
        this.messages = [...this.messages, ...newMessages];
      }
    }, 1000);
  }
  onCardClick(index: any) {
    this.isCardSelected = index;
  }
  goPlay(index: number) {
    this.navCtrl.navigateForward(["home/course-play-list", this.data?.courseId, index]);
  }
  selectLesson(lesson: any) {
    this.lessons = lesson;
  }

  back() {
    /**private navCtrl: NavController */
    this.navCtrl.back();
  }

  slideChange() {
    this.activeIndex = +this.swiperRef?.nativeElement.swiper.activeIndex;
  }

  changeSwipe() {
    this.swiperRef?.nativeElement.swiper.slideTo(this.activeIndex)
  }
  share() {
    this.globalService.share({
      url: location.href,
      dialogTitle: 'Share This Course'
    })

  }
  async startQuiz(quiz: any) {
    if (!this.id) return;
    if (!this.data?.courseId) return;
    const start = await this.quizService.startQuiz(+quiz.id)
    this.navCtrl.navigateForward(['quiz', this.data.courseId, quiz.id]);

  }

  async getCourseQuizes() {
    if (!this.data?.courseId) return;
    this.quizes = await this.quizService.getCourseQuiz(+this.data.courseId);
  }

  async startNow() {
    window.open(this.data?.course?.live?.url);
  }
}
