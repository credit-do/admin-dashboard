import { Event } from "./event";
import { Student } from "./user";

export interface Contribution {
    contributionId: string;
    studentId: Student["userId"];
    eventId: Event["eventId"];
    hours: number;
    pounds: number;
}