import { useEffect, useState } from "react";
import { db } from "../api/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Student() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "courses"));
      setCourses(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    load();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-[240px] bg-gray-900 text-white p-5">
        <h1 className="text-xl font-bold mb-8">🎓 LMS</h1>

        <div className="space-y-4 text-sm">
          <p className="opacity-80 hover:opacity-100 cursor-pointer">Dashboard</p>
          <p className="opacity-80 hover:opacity-100 cursor-pointer">My Courses</p>
          <p className="opacity-80 hover:opacity-100 cursor-pointer">Assignments</p>
          <p className="opacity-80 hover:opacity-100 cursor-pointer">Progress</p>
          <p className="opacity-80 hover:opacity-100 cursor-pointer">Settings</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Welcome Back 👋</h2>

          <input
            placeholder="Search courses..."
            className="p-2 border rounded w-[250px]"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* COURSES GRID */}
        <div className="grid grid-cols-3 gap-5">

          {courses
            .filter(c =>
              c.title?.toLowerCase().includes(search.toLowerCase())
            )
            .map(c => (
              <div
                key={c.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
              >

                {/* thumbnail */}
                <div className="h-32 bg-gradient-to-r from-purple-400 to-pink-400"></div>

                <div className="p-4">
                  <h3 className="font-bold text-lg">{c.title}</h3>

                  <p className="text-xs text-gray-500 mb-2">
                    {c.college} • Year {c.year}
                  </p>

                  {/* VIDEO */}
                  <iframe
                    className="w-full h-32 rounded"
                    src={c.videoUrl}
                  />

                  <button className="mt-3 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                    Continue Learning
                  </button>
                </div>

              </div>
          ))}

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-[280px] bg-white p-4 border-l">

        <h3 className="font-bold mb-4">Notifications 🔔</h3>

        <div className="space-y-3 text-sm">

          <div className="p-3 bg-gray-100 rounded">
            New course uploaded by doctor
          </div>

          <div className="p-3 bg-gray-100 rounded">
            Assignment due tomorrow
          </div>

        </div>
      </div>

    </div>
  );
}