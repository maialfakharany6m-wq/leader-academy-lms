import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Student from "./pages/Student";
import Doctor from "./pages/Doctor";
import CourseView from "./pages/CourseView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/student" element={<Student />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/course/:id" element={<CourseView />} />
      </Routes>
    </BrowserRouter>
  );
}