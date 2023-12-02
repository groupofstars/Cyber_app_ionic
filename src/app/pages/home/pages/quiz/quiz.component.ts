import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { IAnswer, IQueastion, IQuiz } from 'src/app/model/quiz.model';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {

  unAnsvered: boolean = false;
  quiz: IQuiz | undefined;
  index: number = 0;
  cancelTimeToken: any | undefined;
  time: number = 0;
  get minutes(): number { return Math.max(0, Math.floor(this.time / 60)) }
  get seconds(): number { return Math.max(0, this.time % 60) }
  get selected(): IAnswer | undefined { return this.question?.selected; };
  get isFinish(): boolean | undefined { return this.quiz && this.quiz.questions && this.quiz.questions.length - 1 <= this.index; }
  get question(): IQueastion | undefined { return this.quiz?.questions[this.index]; }
  get percentage(): number {

    if (!this.quiz) return 0;
    if (this.quiz.questions)
      return ((this.index + 1) / this.quiz.questions.length) * 100
    return 0;
  }


  constructor(private quizSerivice: QuizService, private ac: ActivatedRoute, private alertController: AlertController, private navController: NavController) { }


  async ionViewWillEnter() {


    await this.getQuestions();
    this.cancelTimeToken = setInterval(() => {
      this.time--;
      if (this.time <= 0) {
        if (this.cancelTimeToken != undefined && this.cancelTimeToken != null)
          clearInterval(this.cancelTimeToken);
        this.finishQuiz();
      }
    }, 1000);
  }
  async ionViewWillLeave() {

    if (this.cancelTimeToken)
      clearInterval(this.cancelTimeToken);
  }


  async getQuestions() {
    try {
      const curseId = this.ac.snapshot.paramMap.get('curseId');
      const quizId = this.ac.snapshot.paramMap.get('quizId');
      if (!curseId || !quizId) return;
      this.quiz = await this.quizSerivice.getQuize(+curseId, +quizId);
      if (this.quiz)
        this.time = this.quiz.time;
      this.index = 0;
    } catch (error) {

    }
  }



  async select(e: IAnswer) {
    if (!this.question || !this.quiz || !(!this.question.selected)) return;
    this.question.selected = e;


  }
  async finishQuiz() {
    if (!this.quiz) return;
    const answers: IAnswer[] = this.quiz.questions.map(el => el.selected);
    await this.quizSerivice.finishQuiz(this.quiz.id, answers);
    const alert = await this.alertController.create({
      header: "Quiz Finished",
      message: "Congratulation You are complete the quiz.",
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navController.navigateRoot("/home");
          }
        }
      ]
    })
    await alert.present();
  }
  async next() {
    if (this.isFinish) {
      await this.finishQuiz();
    } else
      this.index++;
  }
}
