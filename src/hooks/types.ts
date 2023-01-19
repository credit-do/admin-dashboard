export interface UserData {
    email: string;
    firstName: string;
    username: string;
	profilePicture: string;
}

export const userDataKeys = ['email', 'firstName', 'lastName'];

export interface Teacher {
	userId: string;
	lastName: string;
	prefix: string;
	email: string;
	school: string;
}

export interface Student {
	userId: string
    lastInitial: string;
	parentEmail: string;
	classId: string;
}

interface Time {
    seconds: number;
    nanoseconds: number;
}

export interface Event {
    id: string;
	title: string;
	startDate: Time;
	endDate: Time;
	address: string;
	participants: string[]; // array of ids
	complete: boolean;
	poundsCollected: number;
}

export interface Class {
    name: string;
    teacherId: string;
    time: Time;
    id: string;
}

export interface Lesson {
    id: string;
	title: string;
	lengthHours: number;
	completed: boolean;
}

export interface ToDo {
	id: number;
	title: string;
	description: string;
	dueDate: Time;
	completed: boolean;
	beforeEvent: boolean;
}
export const todoTabs = ['Before Event', 'After Event', 'Completed'] as const;

export const statuses = ['Not Started', 'Past Due', 'Completed'] as const;


