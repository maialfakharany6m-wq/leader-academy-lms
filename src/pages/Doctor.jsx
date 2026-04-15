import { useEffect, useState } from "react";
import { db, auth } from "../api/firebase";
import {
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";

export default function Doctor() {

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);

  // LOAD MY COURSES
  useEffect(() => {
    const loadCourses = async () => {
      const q = query(
        collection(db, "courses"),
        where("doctorId", "==", auth.currentUser.uid)
      );

      const snap = await getDocs(q);
      setCourses(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    loadCourses();
  }, []);

  // LOAD MY STUDENTS (FROM ENROLLMENTS)
  useEffect(() => {
    const loadStudents = async () => {
      const q = query(
        collection(db, "enrollments"),
        where("doctorId", "==", auth.currentUser.uid)
      );

      const snap = await getDocs(q);
      setStudents(snap.docs.map(d => d.data()));
    };

    loadStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">
        👨‍🏫 Instructor Dashboard
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-3 gap-6">

        {/* COURSES */}
        <div className="bg-white p-4 rounded-xl shadow col-span-2">

          <h2 className="font-bold mb-4">📚 My Courses</h2>

          <div className="space-y-3">

            {courses.map(c => (
              <div key={c.id} className="p-3 border rounded">

                <h3 className="font-semibold">{c.title}</h3>
                <p className="text-sm text-gray-500">
                  {c.college} - Year {c.year}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* STUDENTS */}
        <div className="bg-white p-4 rounded-xl shadow">

          <h2 className="font-bold mb-4">👨‍🎓 My Students</h2>

          <div className="space-y-2">

            {students.length === 0 && (
              <p className="text-sm text-gray-500">
                No students enrolled yet
              </p>
            )}

            {students.map((s, i) => (
              <div key={i} className="p-2 bg-gray-100 rounded text-sm">

                <p>Student ID:</p>
                <p className="font-mono text-xs">{s.studentId}</p>

              </div>
            ))}

          </div>

        </div>

      </div>

      {/* ACTIVITY SECTION */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow">

        <h2 className="font-bold mb-4">📊 Activity Overview</h2>

        <p className="text-sm text-gray-600">
          Total Courses: {courses.length}
        </p>

        <p className="text-sm text-gray-600">
          Total Students: {students.length}
        </p>

      </div>

    </div>
  );
}