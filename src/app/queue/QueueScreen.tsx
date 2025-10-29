"use client";

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import StudentList from "./StudentList";
import QueueList from "./QueueList";
import React from "react";
import OptionsMenu from "./optionsMenu";

type Props = {};

export type Student = {
  id: number;
  name: string;
  selected: boolean;
};

const QueueScreen: React.FC<Props> = ({}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audioSource, setAudioSource] = useState<string>("");
  const [volume, setVolume] = useState<number>(100);
  const [voice, setVoice] = useState<string>("m");

  const noStudent: Student = {
    id: -1,
    name: "",
    selected: false,
  };

  const [currentStudent, setCurrentStudent] = useState<Student>(noStudent);
  const [queue, setQueue] = useState<Student[]>([]);

  const [studentCount, setStudentCount] = useState(25);

  const [students, setStudents] = useState<Student[]>([]);

  function onStudentClick(student: Student) {
    if (student.selected) return;

    student.selected = true;
    let nq = [...queue, student];
    setQueue(nq);
    saveQueue(nq);
  }

  function removeStudentFromQueue(student: Student) {
    student.selected = false;
    let nq = queue.filter((s) => s !== student);
    setQueue(nq);
    saveQueue(nq);
  }

  const removeQueueFirst = () => {
    currentStudent.selected = false;
    if (queue.length == 0) {
      setCurrentStudent(noStudent);
      saveCurrentStudent(noStudent);
      return;
    }

    setCurrentStudent(queue[0]);
    saveCurrentStudent(queue[0]);

    let sound = "/sounds/numbers/" + voice + "_" + queue[0].id + ".wav";
    setAudioSource(sound);

    let nq = queue.slice(1);
    setQueue(nq);
    saveQueue(nq);
  };

  React.useEffect(() => {
    if (audioRef.current?.src != "http://localhost:3000/queue")
      audioRef.current?.play();
  }, [audioSource]);

  const handleUserKeyPress = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key == " " || ev.key == "ArrowDown" || ev.key == "ArrowUp") {
        removeQueueFirst();
      }
    },
    [removeQueueFirst]
  );

  React.useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  React.useEffect(() => {
    generateStudents();
  }, [studentCount]);

  React.useEffect(() => {
    if (audioRef.current != null) audioRef.current.volume = volume / 100;
  }, [volume]);

  function generateStudents() {
    let loadedQueue: Student[] = JSON.parse(
      localStorage.getItem("queue") || "[]"
    );
    let loadedCurrentStudent: Student = JSON.parse(
      localStorage.getItem("currentStudent") || "null"
    );
    setQueue(loadedQueue);
    let st: Student[] = [];
    for (let index = 0; index < studentCount; index++) {
      const element = [index];

      let s = loadedQueue.find((s) => s.id == index + 1);
      if (
        loadedCurrentStudent != null &&
        loadedCurrentStudent.id == index + 1
      ) {
        st.push(loadedCurrentStudent);
        setCurrentStudent(loadedCurrentStudent);
      } else if (s !== undefined) {
        s.selected = true;
        st.push(s);
      } else {
        st.push({ id: index + 1, name: "", selected: false });
      }
    }
    setStudents(st);
  }

  function saveQueue(newQueue: Student[]) {
    let q: string = JSON.stringify(newQueue);
    localStorage.setItem("queue", q);
  }

  function saveCurrentStudent(student: Student) {
    let s: string = JSON.stringify(student);
    localStorage.setItem("currentStudent", s);
  }

  return (
    <main className="queue-screen">
      <audio ref={audioRef} src={audioSource} />
      <OptionsMenu
        setStudentCount={setStudentCount}
        setVolume={setVolume}
        setVoice={setVoice}
      />

      <div className="queue-current">
        <div className="queue-current-card">
          {currentStudent.id == -1 ? "..." : currentStudent.id}
        </div>
      </div>

      <QueueList
        queueList={queue}
        removeStudentFromQueue={removeStudentFromQueue}
      />
      <StudentList studentList={students} onStudentClick={onStudentClick} />
    </main>
  );
};

export default QueueScreen;
