'use client'

import { Student } from "./QueueScreen"
import StudentCard from "./StudentCard"

type Props = {
    studentList : Student[]
    onStudentClick : (student:Student) => void
}



const StudentList: React.FC<Props> = ({studentList, onStudentClick}) => {
    return (
        <div className="queue-bottom">
        {studentList.map(student => (
          <StudentCard student={student} onClick={onStudentClick} key={student.id}/>
        ))}
      </div>
      )
}

export default StudentList;