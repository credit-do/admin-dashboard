import { setDoc, addDoc, AddPrefixToKeys, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/clientApp'


export interface TeacherInput extends AddPrefixToKeys<string, any> {
	userId: string;
	lastName: string;
	prefix: string;
	email: string;
	school: string;
}

export const createTeacher = async (userId: string, teacherInput: TeacherInput) => {
    setDoc(doc(db, 'teachers', userId), teacherInput);
}

export const updateTeacher = async (userId: string, teacherInput: TeacherInput) => {
    await updateDoc(doc(db, 'teachers', userId), teacherInput);
}