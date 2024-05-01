'use client'

import { Student } from "./QueueScreen"

type Props = {
    queueList : Student[]
}



const QueueList: React.FC<Props> = ({queueList}) => {
    return (
        <div className="queue-top">
            {queueList.map(student => (
            <div className="queue-card" key={student.id}>{student.id}</div>
        ))}
        </div>
      )
}

export default QueueList;