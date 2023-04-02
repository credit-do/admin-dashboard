import { useFormik, validateYupSchema } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import { ClassInputData, createClass } from "../services/classes";
import { createEvent, EventInput } from "../services/events";
import { createStudent, StudentInput } from "../services/students";
import useAuth from "./useAuth";

const classInitialValues : ClassInputData = {
    name: '',
    time: null,
}

const classSchema = {
    name: Yup.string().required("Required"),
    time: Yup.date().required("Required"),
}

export const useClassFormik = (initialValues = classInitialValues) => {
    const classFormik = useFormik({
        initialValues,
        validationSchema: Yup.object(classSchema),
        onSubmit: () => {},
        validateOnMount: true,
    });

    return classFormik;
}

const studentsInitialValues : {students: StudentInput[]} = {
    students: []
};

const studentSchema = {
    firstName: Yup.string().required("Required"),
    lastInitial: Yup.string().required("Required").length(1, "More than 1 character"),
    parentEmail: Yup.string().required("Required").email("Invalid email"),
}

const studentsSchema = {
    students: Yup.array().of(Yup.object(studentSchema))
}

export const useStudentsFormik = (initialValues = studentsInitialValues) => {

    const studentsFormik = useFormik({
        initialValues,
        validationSchema: Yup.object(studentsSchema),
        onSubmit: () => {},
        validateOnMount: true,
    });

    return studentsFormik;
}

const eventInitialValues : EventInput = {
    title: '',
    startDate: null,
    endDate: null,
    address: '',
    isVirtual: false,
}

const eventSchema = {
    title: Yup.string().max(255).required('Title is required'),
    startDate: Yup.date().nullable().required('Start date is required'),
    endDate: Yup.date().nullable().required('End date is required').min(Yup.ref('startDate'), 'End date must be after start date'),
    address: Yup.string().max(255).required('Address is required'),
    isVirtual: Yup.boolean()
}

export const useCreateEvent = (initialValues = eventInitialValues) => {
    const eventFormik = useFormik({
        initialValues,
        validationSchema: Yup.object(eventSchema),
        onSubmit: async () => {},
        validateOnMount: true,
    });
    return eventFormik;
}

const useCreateClass = () => {

    const { auth } = useAuth();

    const classFormik = useClassFormik();
    const studentsFormik = useStudentsFormik();
    const eventFormik = useCreateEvent();

    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const saveClassData = (classData: ClassInputData) => {
        classFormik.setFieldValue('name', classData.name);
        classFormik.setFieldValue('time', classData.time);
    }

    const saveStudentsData = (studentsData: StudentInput[]) => {
        studentsFormik.setFieldValue('students', studentsData);
    }

    const saveEventData = (eventData: EventInput) => {
        eventFormik.setFieldValue('title', eventData.title);
        eventFormik.setFieldValue('startDate', eventData.startDate);
        eventFormik.setFieldValue('endDate', eventData.endDate);
        eventFormik.setFieldValue('address', eventData.address);
        eventFormik.setFieldValue('isVirtual', eventData.isVirtual);
    }

    const submit = async () => {
        setSubmitting(true);
        const classId = await createClass({...classFormik.values, teacherEmail: auth.email, teacherId: auth.uid});
        await Promise.all(studentsFormik.values.students.map(async (student : StudentInput) => (
            createStudent(classId, student)
        )))
        if(eventFormik.values.title){
            await createEvent(classId, eventFormik.values);
        }
        setSubmitted(true);
        setSubmitting(false);
    }

    return {
        classFormik,
        studentsFormik,
        eventFormik,
        submitted,
        submitting,
        saveClassData,
        saveStudentsData,
        saveEventData,
        submit
    };
}

export default useCreateClass;