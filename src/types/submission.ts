import { Question, Test } from "./test";
import { Student } from "./user";

export interface Submission {
    submissionId: string;
    studentId: Student["userId"];
    testId: Test["testId"];
    answers: Answers;
}

interface Answers {
    [key: Question["questionId"]]: Answer
}

interface Answer {
    answer: Question["answers"][number],
    correct: boolean
}