import { addDoc, AddPrefixToKeys, collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/clientApp'
import { sendPermissionEmail } from '../hooks/useSendEmail';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";

export interface StudentInput extends AddPrefixToKeys<string, any> {
    firstName: string;
    lastInitial: string;
    parentEmail: string;
    classId: string;
    completedLessons: boolean[];
    joinPermission: boolean;
}

const findEmail = async (auth, email, name,  iter) => {
    const newEmail = email.split('@')[0] + "+" +name+ iter + "@" + email.split('@')[1];
    const methods = await fetchSignInMethodsForEmail(auth, newEmail);
    // if method is empty, then the email is not in the database
    if (methods.length != 0) {
        return await findEmail(auth, email,name, iter + 1);
    }
    return newEmail;
}

export const createStudent = async (classId: string, studentInput: StudentInput) => {
    studentInput.classId = classId;
    studentInput.completedLessons = [];
    studentInput.joinPermission = false;

    const password = studentInput.firstName.toLowerCase() + studentInput.lastInitial.toLowerCase() + Math.floor(Math.random() * (999 - 100) + 100);
    studentInput.parentEmail = await findEmail(auth, studentInput.parentEmail, studentInput.firstName, 1);
    
    // this needs to be updated so that it checks if the parent email already exists in the database
    // right now it only checks twice, but in the edge case of more than 1 sibling, it may still fail.
    createUserWithEmailAndPassword(auth, studentInput.parentEmail, password)
    .catch(async (error) => {
        console.log(error.message);
    })

    const studentDoc = await addDoc(collection(db, 'classes', classId, 'students'), studentInput);

    const update =  updateDoc(doc(db, 'classes', classId, 'students', studentDoc.id), { id: studentDoc.id});
    const sendEmail = sendPermissionEmail(studentInput.firstName, studentInput.parentEmail, password);

    return Promise.all([update, sendEmail]);
}

export const updateStudent = async (classId: string, studentId: string, studentInput: StudentInput) => {
    await updateDoc(doc(db, 'classes', classId, 'students', studentId), studentInput);
}

