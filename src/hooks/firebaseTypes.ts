export interface UserData {
	userId: string;
	type: 'teacher' | 'student';
    username: string;
    firstName: string;
	profilePicture: string;
}
interface Time {
    seconds: number;
    nanoseconds: number;
}

export interface Event {
    eventId: string;
	classes: string[]; // array of Class.classId
	name: string;
	address: string;
	startDate: Time;
	endDate: Time;
	pictureUrl: string
	teams: Team[];
}

export interface Team {
	teamId: string;
	classId: string; // Class.classId
	teamName: string;
	progress: Contributions;
	students: string[]; // array of Student.userId
	goals: EventGoal[];
}
export interface EventGoal {
	goalId: string;
	description: string;
	completed: boolean;
}
export interface Contributions {
	contributionId: string;
	eventId: string;
	studentId: string;
	hours: number;
	pounds: number;
}

export interface Class {
	classId: string;
    name: string;
    teacherId: string;
	student: string[]; // array of ids
    time: Time;
    events: string[]; // array of Event.eventId
	district: string;
	joinCode: string;
	lessonsCompleted: string[] // array of Lesson.lessonId
}

export interface Lesson {
    lessonId: string;
	title: string;
	lengthHours: number;
	subject: string;
	dueDate: Time;
	content: string;
}

export interface Teacher {
	userId: string;
	lastName: string;
	prefix: string;
	email: string;
	school: string;
}

export interface Student {
    userId: string;
	lastInitial: string;
    parentEmail: string;
	classId: string;
	personalGoal: PersonalGoal[];
	completedLessons: Lesson[];
}

interface PersonalGoal {
	goalId: string;
	description: string;
	type: 'short' | 'long';
	complete: boolean;
	dueDate: Time;
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


