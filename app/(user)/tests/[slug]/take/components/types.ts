export type Question = {
  id: number;
  question: string;
  options: Record<string, string>;
  answer: string;
};

export type Answer = { question_id: number; selected: string };