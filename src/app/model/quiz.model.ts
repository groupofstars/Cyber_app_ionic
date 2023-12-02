export interface IQuiz {
    id: number;
    time: number;
    title: string;
    is_completed: boolean;
    questions: IQueastion[];
}
export interface IQueastion {
    id: number;
    title: string;
    currectId: number;
    selected: IAnswer;
    answers: IAnswer[];
}
export interface IAnswer {
    question_number: number;
    question_answer: string;
}