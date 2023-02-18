import { addDoc, AddPrefixToKeys, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/clientApp'
import { sendPermissionEmail } from '../hooks/useSendEmail';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

    const password = studentInput.firstName + studentInput.lastInitial + Math.random() * (4);

    // this needs to be updated so that it checks if the parent email already exists in the database
    // right now it only checks twice, but in the edge case of more than 1 sibling, it may still fail.
    createUserWithEmailAndPassword(auth, studentInput.firstName, password)
    .catch((error) => {
        if (error.code == "email-already-in-use")
        console.log(error.message);
        studentInput.parentEmail = studentInput.parentEmail.split('@')[0] +"+"+ 
        studentInput.firstName + "@" + studentInput.parentEmail.split('@')[1];
        createUserWithEmailAndPassword(auth, studentInput.parentEmail, password);
    });

    const studentDoc = await addDoc(collection(db, 'classes', classId, 'students'), studentInput);

    const update =  updateDoc(doc(db, 'classes', classId, 'students', studentDoc.id), { id: studentDoc.id});
    const sendEmail = sendPermissionEmail(studentInput.firstName, studentInput.parentEmail, password);

    return Promise.all([update, sendEmail]);
}

export const updateStudent = async (classId: string, studentId: string, studentInput: StudentInput) => {
    await updateDoc(doc(db, 'classes', classId, 'students', studentId), studentInput);
}

// should write this function that takes a parentEmail and returns a parentEmail that hasn't been used yet
// case 1: parentEmail is not in the database, return parentEmail
// case 2: parentEmail is in the database, return parentEmail + random number
const createParentEmail = async (parentEmail: string) => {

}