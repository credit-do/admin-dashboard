import { db } from "../firebase/clientApp";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, CollectionReference, doc, updateDoc } from "firebase/firestore";

import moment from "moment";

interface Time {
    seconds: number;
    nanoseconds: number;
}

export interface ToDo {
	id: string;
	title: string;
	description: string;
	dueDate: Time;
	completed: boolean;
}

export const statuses = ['Not Started', 'Past Due', 'Completed'] as const;

type ToDoBuckets = {
  [key in typeof statuses[number]]: ToDo[];
}


const useToDos = (classId : string) => {

    const [toDos, loading, error] = useCollectionData<ToDo>(collection(db, "classes", classId, "toDos") as CollectionReference<ToDo>);

    const check = async (toDoId : string) => {
        return updateDoc(doc(db, "classes", classId, "toDos", toDoId), {completed: true});
    }

    const uncheck = async (toDoId : string) => {
        return updateDoc(doc(db, "classes", classId, "toDos", toDoId), {completed: false});
    }

    const getToDoBuckets = () : ToDoBuckets => {
        const emptyBuckets : ToDoBuckets = {
            'Not Started': [],
            'Past Due': [],
            'Completed': []
        }
        if(toDos) {
            return toDos.reduce((acc, toDo) => {
                if (toDo.completed) {
                    acc['Completed'].push(toDo);
                }
                else {
                    if(moment().isAfter(toDo.dueDate.seconds * 1000)){
                        acc['Past Due'].push(toDo);
                    } else {
                        acc['Not Started'].push(toDo);
                    }
                }
                return acc;
            },
            emptyBuckets)
        }
        return emptyBuckets;
    };

    return {
        toDoBuckets: getToDoBuckets(),
        loading,
        check,
        uncheck
    }
}

export default useToDos;