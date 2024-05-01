'use client'

import { useCallback, useEffect, useState } from "react";
import StudentList from "./StudentList";
import QueueList from "./QueueList";
import React from "react";
import { Slider } from "@nextui-org/react";


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
    const [showMenu, setShowMenu] = useState<boolean | undefined>()

    const [students, setStudents] = useState<Student[]>([
        {id:1, name:"", selected: false},
        {id:2, name:"", selected: false},
        {id:3, name:"", selected: false},
        {id:4, name:"", selected: false},
        {id:5, name:"", selected: false},
        {id:6, name:"", selected: false},
        {id:7, name:"", selected: false},
        {id:8, name:"", selected: false},
        {id:9, name:"", selected: false},
        {id:10, name:"", selected: false},
        {id:11, name:"", selected: false},
        {id:12, name:"", selected: false},
        {id:13, name:"", selected: false},
        {id:14, name:"", selected: false},
        {id:15, name:"", selected: false},
        {id:16, name:"", selected: false},
        {id:17, name:"", selected: false},
        {id:18, name:"", selected: false},
        {id:19, name:"", selected: false},
        {id:20, name:"", selected: false},
        {id:21, name:"", selected: false},
        {id:22, name:"", selected: false},
        {id:23, name:"", selected: false},
        {id:24, name:"", selected: false},
        {id:25, name:"", selected: false}
    ])


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

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    React.useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress)

        return () => {
          window.removeEventListener('keydown', handleUserKeyPress)
        }

      }, [handleUserKeyPress])
  
    

    return (
        <main className="queue-screen">

            <div className="menu">
                <img className="menu-icon" src="/icons/settings.png"  onClick={toggleMenu}></img>
                
            </div>
            <div className={showMenu === undefined ? "menu-sidebar" : showMenu ? "menu-sidebar open" : "menu-sidebar close"} >
                <Slider 
                    size="md"
                    step={1}
                    color="primary"
                    label="Nombre d'élèves"
                    showSteps={false} 
                    maxValue={35} 
                    minValue={10} 
                    defaultValue={25}
                    className="max-w-md" 
                    />
            </div>
            

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