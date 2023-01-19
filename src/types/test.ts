export interface Test {
    testId: string;
    title: string;
}

export interface Question {
    questionId: string;
    testId: Test["testId"];
    prompt: string;
    answers: string[];
    correctIndex: number;
}