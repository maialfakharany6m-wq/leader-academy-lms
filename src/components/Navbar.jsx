export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white shadow">

      {/* LOGO */}
      <div className="flex items-center gap-2">
        <img
          src="/logo.png"
          className="w-8 h-8 rounded"
        />
        <h1 className="font-bold text-lg text-purple-700">
          Leader Academy
        </h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-600">Dashboard</p>
        <p className="text-sm text-gray-600">Courses</p>
        <p className="text-sm text-gray-600">Profile</p>
      </div>

    </div>
  );
}