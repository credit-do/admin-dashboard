import { addDoc, AddPrefixToKeys, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/clientApp'
import { sendPermissionEmail } from '../hooks/useSendEmail';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const niceware = require('niceware')


export interface StudentInput extends AddPrefixToKeys<string, any> {
    firstName: string;
    lastInitial: string;
    parentEmail: string;
    classId: string;
    completedLessons: boolean[];
    joinPermission: boolean;
}

export const createStudent = async (classId: string, studentInput: StudentInput) => {
    studentInput.classId = classId;
    studentInput.completedLessons = [];
    studentInput.joinPermission = false;
    const auth = getAuth();
    let newParentEmail = studentInput.parentEmail.split('@')[0] +"+"+ studentInput.firstName + studentInput.lastInitial + "@" + studentInput.parentEmail.split('@')[1];
    // const password = niceware.generatePassphrase(2) + Math.random() * (10);
    const password = studentInput.firstName + studentInput.lastInitial + Math.random() * (10);
    // perhaps do a check to see if NSFW words are in the password
    createUserWithEmailAndPassword(auth, newParentEmail, password)
        .catch((error) => {
            console.log(error.message);
        });
    const studentDoc = await addDoc(collection(db, 'classes', classId, 'students'), studentInput);
    await updateDoc(doc(db, 'classes', classId, 'students', studentDoc.id), { id: studentDoc.id, newParentEmail});
    await sendPermissionEmail(studentInput.firstName, newParentEmail);
}

export const updateStudent = async (classId: string, studentId: string, studentInput: StudentInput) => {
    await updateDoc(doc(db, 'classes', classId, 'students', studentId), studentInput);
}