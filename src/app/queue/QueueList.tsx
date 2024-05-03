'use client'

import { Student } from "./QueueScreen"

type Props = {
    queueList: Student[]
    removeStudentFromQueue: (student: Student) => void
}



const QueueList: React.FC<Props> = ({ queueList, removeStudentFromQueue }) => {

    return (
        <div className="queue-top">
            {queueList.map(student => (
                <div className="queue-card group" key={student.id} >
                    <div className="delete-card" onClick={() => removeStudentFromQueue(student)}>x</div>
                    {student.id}
                </div>
            ))}
        </div>
    )
}

export default QueueList;