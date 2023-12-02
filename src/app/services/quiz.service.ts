import { Injectable } from '@angular/core';
import { IAnswer, IQueastion, IQuiz } from '../model/quiz.model';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Chatchable } from './catche-service.service';

@Injectable({
  providedIn: 'root'
})
export class QuizService extends Chatchable {

  key: string = "quiz";
  constructor(private httpClient: HttpClient) { super(httpClient) }

  async getQuize(courseId: number, id: number) {
    const quizes = await this.getCourseQuiz(courseId);
    if (quizes)
      return quizes.find(el => el.id == id);
    return undefined;
  }
  async finishQuiz(quizId: number, userAnswers: IAnswer[]) {
    const path = `${environment.api}/quiz/finish-quiz/${quizId}`
    return lastValueFrom(this.httpClient.post<IQuiz>(path, { userAnswers }));
  }

  startQuiz(quizId: number) {
    const path = `${environment.api}/quiz/start-quiz/${quizId}`
    return lastValueFrom(this.httpClient.get<IQuiz>(path));
  }

  async getCourseQuiz(courseId: number) {
    const path = `${environment.api}/quiz/course-quizes/${courseId}`
    return this.get<IQuiz[]>(`${this.key}${courseId}`, path);
  }
}
