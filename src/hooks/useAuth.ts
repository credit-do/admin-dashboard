import { singletonHook } from 'react-singleton-hook';

import { auth, db } from '../firebase/clientApp';

import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut as authSignOut,
    updateEmail,
    User
} from 'firebase/auth';

import { 
    useAuthState,
} from 'react-firebase-hooks/auth';

import {
    useDocumentData
} from 'react-firebase-hooks/firestore';

import { doc, DocumentReference, setDoc } from 'firebase/firestore'

import { UserData } from './types';
import { createTeacher } from '../services/teacher';

interface ReturnType {
    auth: User | null;
    user: UserData | null;
    loading: boolean,
    teacherSignUp: (email: string, password: string, userData: UserData) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    updateUser: (userData: UserData) => Promise<void>;
}

const init : ReturnType = {
    auth: null,
    user: null,
    loading: true,
    teacherSignUp: async (email: string, password: string, userData: UserData) => {},
    signIn: async (email: string, password: string) => {},
    signOut: async () => {},
    updateUser: async (userData: UserData) => {}
}

const useAuth = () : ReturnType => {

    const [authObj, authLoading] = useAuthState(auth);
    const [userData, userLoading] = useDocumentData<UserData>(authObj && doc(db, 'users', authObj.uid) as DocumentReference<UserData>);
    
    const teacherSignUp = async (email: string, password: string, userData: UserData) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        createTeacher(cred.user.uid, userData);
        if(cred) {
            await setDoc(doc(db, 'users', cred.user.uid), userData);
        }
    }

    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    }

    const signOut = async () => {
        await authSignOut(auth);
    }
    

    const updateUser = async (userData: UserData) => {
        /*
        if(userData.email !== authObj.email) {
            await updateEmail(authObj, userData.email);
        }
        await setDoc(doc(db, 'users', authObj.uid), userData);*/
    }


    return {
        auth: authObj,
        user: userData,
        loading: authLoading || userLoading,
        teacherSignUp,
        signIn,
        signOut,
        updateUser
    }
}

export default singletonHook(init, useAuth);