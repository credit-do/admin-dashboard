import { db } from "../firebase/clientApp";
import {
    addDoc,
    collection,
    doc,
    setDoc
} from "firebase/firestore";

import lessons from "../data/lessons";
import toDos from "../data/toDos";

export interface ClassInputData {
    name: string;
    time: Date;
}

interface ClassInput extends ClassInputData {
    teacherEmail: string;
    teacherId: string;
}

export const createClass = async (classInput: ClassInput) => {
    const classDoc = await addDoc(collection(db, 'classes'), classInput);
    await Promise.all([
        createLessons(classDoc.id),
        createToDos(classDoc.id)
    ])
    return classDoc.id;
}

const createLessons = async (classId: string) => {
    await Promise.all(lessons.map(lesson => {
        return setDoc(doc(db, "classes", classId, "lessons", lesson.id), lesson);
    }))
}

const createToDos = async (classId: string) => {
    await Promise.all(toDos.map(toDo => {
        return setDoc(doc(db, "classes", classId, "toDos", String(toDo.id)), toDo);
    }))
}