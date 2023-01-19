import { Class } from "./class";
export interface User {
    userId: string;
    username: string;
    firstName: string;
    profilePicture: string;
    type: "student" | "teacher"
}

export interface Student extends User {
    type: "student";
    lastInitial: string;
    classId: Class["classId"];
    parentEmail: string;
}

export interface Teacher extends User {
    type: "teacher";
    lastName: string;
    email: string;
    prefix: string;
}