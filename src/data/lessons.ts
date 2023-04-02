interface Lesson {
    id: string;
    title: string;
    lengthHours: number;
    completed: boolean;
    week: number;
}

const now = new Date();

const lessons : Lesson[] = [
    {
        id: '1',
        title: "Earn",
        lengthHours: 2,
        completed: false,
        week: 1,
    },
    {
        id: '2',
        title: "Budget",
        lengthHours: 2,
        completed: false,
        week: 1,
    },
    {
        id: '3',
        title: "Goal Setting",
        lengthHours: 1,
        completed: false,
        week: 1,
    },
    {
        id: '4',
        title: "Spend",
        lengthHours: 2,
        completed: false,
        week: 2,
    },
    {
        id: '5',
        title: "Save",
        lengthHours: 2,
        completed: false,
        week: 2,
    },
    {
        id: '6',
        title: "Work Ethic",
        lengthHours: 2,
        completed: false,
        week: 2,
    }
]

export default lessons;