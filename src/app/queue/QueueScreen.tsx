'use client'

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import StudentList from "./StudentList";
import QueueList from "./QueueList";
import React from "react";
import OptionsMenu from "./optionsMenu";


type Props = {}

export type Student = {
    id : number
    name: string
    selected : boolean
}


const QueueScreen: React.FC<Props> = ({}) => {
    const noStudent: Student = {
        id: -1,
        name: '',
        selected: false
    };

    const [currentStudent, setCurrentStudent] = useState<Student>(noStudent)
    const [queue, setQueue] = useState<Student[]>([])

    const [studentCount, setStudentCount] = useState(25)

    const [students, setStudents] = useState<Student[]>([])


    function onStudentClick(student:Student){

        if(student.selected)
            return;


        student.selected = true;
        setQueue([...queue, student])

    }

    const removeQueueFirst = () => {

        currentStudent.selected = false;
        if(queue.length == 0)
        {
            setCurrentStudent(noStudent);
            return;
        }
        
        setCurrentStudent(queue[0])
        setQueue(queue.slice(1))
    }


    const handleUserKeyPress = useCallback((ev:KeyboardEvent) => {
        if(ev.key == " "){
            removeQueueFirst();
        }
    }, [removeQueueFirst]);

    

    React.useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress)

        return () => {
          window.removeEventListener('keydown', handleUserKeyPress)
        }

      }, [handleUserKeyPress])
  
    React.useEffect(() => {

        generateStudents();

    },[studentCount])

    function generateStudents(){
        let st:Student[] = [];
        for (let index = 0; index < studentCount; index++) {
            const element = [index];
            st.push({id:index+1, name:"", selected: false})
        }
        setStudents(st)

    }

    

    return (
        <main className="queue-screen">

            
            <OptionsMenu setStudentCount={setStudentCount}/>

            <div className="queue-current">
                <div className="queue-current-card">
                    {currentStudent.id == -1 ? '...' : currentStudent.id}
                </div>
            </div>
    
            <QueueList queueList={queue}/>
            <StudentList studentList={students} onStudentClick={onStudentClick}/>
        
        </main>
    )
}

export default QueueScreen;