import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../api/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      const snap = await getDoc(doc(db, "users", res.user.uid));
      const role = snap.data()?.role;

      if (role === "student") navigate("/student");
      else if (role === "doctor") navigate("/doctor");
      else alert("No role found");

    } catch (e) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black">

      <div className="bg-white w-[360px] p-8 rounded-2xl shadow-2xl">

        {/* LOGO */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="/logo.png"
            className="w-16 h-16 rounded-xl shadow"
          />
          <h1 className="text-xl font-bold mt-3 text-purple-700">
            Leader Academy
          </h1>
          <p className="text-xs text-gray-500">
            Sign in to your learning platform
          </p>
        </div>

        {/* FORM */}
        <input
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition"
        >
          Login
        </button>

      </div>
    </div>
  );
}