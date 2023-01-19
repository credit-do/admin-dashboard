import { Student } from "./user"

export interface Goal {
    type: 'short' | 'long' | 'event'
    goalId: string
    studentId: Student["userId"]
    title: string 
    location: string | null
    reason: string | null
    dueDate: Date
    completed: boolean
}