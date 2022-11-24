// In this case, we have only a few common interfaces so it's
// unnecessary to store it into folder with interfaces.

export interface IQuizAnswer {
  id: number;
  answer: number | null;
}

export interface IAnswer {
  label: string;
  value: number;
}

export interface IQuestion {
  id: number;
  question: string;
  answers: IAnswer[];
}
