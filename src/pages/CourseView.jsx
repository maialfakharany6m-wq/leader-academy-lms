import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../api/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function CourseView() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const load = async () => {
      const snap = await getDoc(doc(db, "courses", id));
      setCourse({ id: snap.id, ...snap.data() });
    };
    load();
  }, [id]);

  const markWatched = async () => {
    await setDoc(doc(db, "progress", auth.currentUser.uid + "_" + id), {
      userId: auth.currentUser.uid,
      courseId: id,
      watched: true,
      lastWatchedAt: new Date()
    });
    alert("Progress saved!");
  };

  if (!course) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-2xl font-bold mb-2">{course.title}</h1>

      <p className="text-sm text-gray-500 mb-4">
        {course.college} • Year {course.year}
      </p>

      <div className="bg-white p-4 rounded shadow">

        <iframe
          className="w-full h-[400px] rounded"
          src={course.videoUrl}
        />

        <button
          onClick={markWatched}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Mark as Completed
        </button>

      </div>
    </div>
  );
}