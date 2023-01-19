import { EventGoal } from './eventGoal'


export interface Team {
    teamId: string;
    classId: string;
    teamName: string;
    studentIds: string[];
    goals: EventGoal[];
}