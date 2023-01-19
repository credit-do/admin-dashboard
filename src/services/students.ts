import { addDoc, AddPrefixToKeys, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/clientApp'
import { Student } from '../types/user'

export interface StudentInput extends AddPrefixToKeys<string, any> {
    firstName: string;
    lastInitial: string;
    parentEmail: string;
}

// need to figure out the sign up flow to to determine if a student is ever created after you have the account already

export const createStudent = async (studentInput: Student) => {
    const studentDoc = await addDoc(collection(db, 'classes', studentInput.classId, 'students'), studentInput);
    await updateDoc(doc(db, 'classes', studentInput.classId, 'students', studentDoc.id), { id: studentDoc.id });
}

export const updateStudent = async (classId: string, studentId: string, studentInput: StudentInput) => {
    await updateDoc(doc(db, 'classes', classId, 'students', studentId), studentInput);
}