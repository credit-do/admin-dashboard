import { addDoc, AddPrefixToKeys, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/clientApp'
import { sendPermissionEmail } from '../hooks/useSendEmail';

export interface StudentInput extends AddPrefixToKeys<string, any> {
    firstName: string;
    lastInitial: string;
    parentEmail: string;
    classId: string;
    completedLesson: boolean[];
    joinPermission: boolean;
}

export const createStudent = async (classId: string, studentInput: StudentInput) => {
    studentInput.classId = classId;
    studentInput.completedLesson = [];
    studentInput.joinPermission = false;
    const studentDoc = await addDoc(collection(db, 'classes', classId, 'students'), studentInput);
    await updateDoc(doc(db, 'classes', classId, 'students', studentDoc.id), { id: studentDoc.id });
    await sendPermissionEmail(studentInput.firstName, studentInput.parentEmail);
}

export const updateStudent = async (classId: string, studentId: string, studentInput: StudentInput) => {
    await updateDoc(doc(db, 'classes', classId, 'students', studentId), studentInput);
}