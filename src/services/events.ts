import { db } from "../firebase/clientApp";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { Event, EventInput } from '../types/event'

interface EventData extends EventInput {
	participants: string[];
	complete: boolean;
	poundsCollected: number;
}
export const createEvent = async (eventInput: EventInput) => {
    const eventDoc = await addDoc(collection(db, 'events'), eventInput);
    await updateDoc(doc(db, 'events', eventDoc.id), {
        eventId: eventDoc.id
    });
    return eventDoc.id
}


/*
export const createEvent = async (classId: string, eventInput: EventInput) => {
    const eventData : EventData = {
        ...eventInput,
        participants: [],
        complete: false,
        poundsCollected: 0
    }
    const eventDoc = await addDoc(collection(db, 'classes', classId, 'events'), eventData);
    await updateDoc(doc(db, 'classes', classId, 'events', eventDoc.id), {
        id: eventDoc.id
    });
}*/