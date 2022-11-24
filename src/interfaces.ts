// In this case, we have only a few common interfaces so it's
// unnecessary to store it into folder with interfaces.

export interface TQuizAnswer {
  id: number;
  answer: number | null;
}

export interface TAnswer {
  label: string;
  value: number;
}

export interface TQuestion {
  id: number;
  question: string;
  answers: TAnswer[];
}
