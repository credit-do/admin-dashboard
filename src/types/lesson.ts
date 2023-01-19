import { Class } from "./class";

export interface Lesson {
    lessonId: string;
    classId: Class["classId"];
    lengthHours: number;
    completed: boolean;
    subject: string;
    dueDate: Date;
}