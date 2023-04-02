
import { db } from "../firebase/clientApp";
import { useCollection, useCollectionData } from "react-firebase-hooks/firestore";
import { collection, CollectionReference, getDocs, query, where } from "firebase/firestore";

import { Student } from "./types";
import { useEffect } from "react";

const useStudents = (classId : string) => {

    const [students, loading, error] = useCollection<Student>(classId && query(collection(db, "students") as CollectionReference<Student>, where("classId", "==", classId)));
    const allStudents = students ? students.docs.map(doc => ({ ...doc.data(), id: doc.id })) : [];
    
    return {
        students : allStudents || [],
        loading
    }
}

export default useStudents;