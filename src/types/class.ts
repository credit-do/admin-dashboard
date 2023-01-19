import { Teacher, Student } from "./user";
import { Event } from "./event";

export interface Class {
    classId: string;
    time: Date;
    name: string;
    teacherId: Teacher["userId"];
    joinCode: string;
    events: Event[];
    students: Student[];
}