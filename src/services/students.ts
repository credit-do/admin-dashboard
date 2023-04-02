import { addDoc, AddPrefixToKeys, collection, doc, getDocs, updateDoc, setDoc } from 'firebase/firestore';
import { db, secondaryAuth } from '../firebase/clientApp'
import { sendPermissionEmail } from '../hooks/useSendEmail';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export interface StudentInput extends AddPrefixToKeys<string, any> {
    firstName: string;
    lastInitial: string;
    parentEmail: string;
}

interface StudentDocInput extends StudentInput {
    classId: string;
    completedLessons: boolean[];
    joinPermission: boolean;
}


export const createStudent = async (classId: string, studentInput: StudentInput) => {

    const password = studentInput.firstName + studentInput.lastInitial + Math.random() * (4);

    // this needs to be updated so that it checks if the parent email already exists in the database
    // right now it only checks twice, but in the edge case of more than 1 sibling, it may still fail.
    createUserWithEmailAndPassword(secondaryAuth, studentInput.parentEmail, password)
    .catch((error) => {
        if (error.code == "email-already-in-use")
        console.log(error.message);
        studentInput.parentEmail = studentInput.parentEmail.split('@')[0] +"+"+ 
        studentInput.firstName + "@" + studentInput.parentEmail.split('@')[1] + Math.random() * (4);
        createUserWithEmailAndPassword(secondaryAuth, studentInput.parentEmail, password);
    });

    const studentDocInput = {
        ...studentInput,
        classId: classId,
        completedLessons: [],
        joinPermission: false
    } 

    await addDoc(collection(db, 'students'), studentDocInput);
    const studentDoc = doc(db, 'students', studentDocInput.parentEmail);

    console.log(studentDocInput.parentEmail);

    // const update =  updateDoc(doc(db, 'students', uid), { id: studentDoc.id});
    // classId: string;
    // completedLessons: boolean[];
    // joinPermission: boolean;

    const addStudentToClass = await addDoc(collection(db, 'classes', classId, 'students'), { parentEmail: studentDocInput.parentEmail });
    const sampleGoal = await addDoc(collection(studentDoc, "personalGoals"), { goal: "Sample Goal", cost: 50, dueDate: new Date(), type: 'Long Term', completed: false});
    const sendEmail = sendPermissionEmail(studentDocInput.firstName, studentDocInput.parentEmail, password);

    secondaryAuth.signOut();
    return Promise.all([sendEmail]);
}

export const updateStudent = async ( studentId: string, studentInput: StudentInput) => {
    await updateDoc(doc(db, 'students', studentId), studentInput);
}

// should write this function that takes a parentEmail and returns a parentEmail that hasn't been used yet
// case 1: parentEmail is not in the database, return parentEmail
// case 2: parentEmail is in the database, return parentEmail + random number
const createParentEmail = async (parentEmail: string) => {

}