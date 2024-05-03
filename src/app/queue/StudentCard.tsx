'use client'

import { Student } from "./QueueScreen"

type Props = {
    student: Student
    onClick: (student: Student) => void
}



const StudentCard: React.FC<Props> = ({ student, onClick }) => {
    return (
        <div className={!student.selected ? "student-card" : "student-card-disabled"} onClick={() => onClick(student)}>
            {student.id}
        </div>
    )
}

export default StudentCard;