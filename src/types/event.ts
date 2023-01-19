import { Class } from "./class";
import { Team } from './team';

export interface Event extends EventInput{
    teams: Team[];
}

export interface EventInput {
    eventId: string;
    name: string;
    classId: string[];
    address: string;
    startDate: Date;
    endDate: Date;
    pictureUrl: string;
}