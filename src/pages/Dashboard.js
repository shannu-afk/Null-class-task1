import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getUserData } from "../services/firestore";
import Watchlist from "../components/Watchlist";
import Portfolio from "../components/Portfolio";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const load = async () => {
    if (!user) return;
    const d = await getUserData(user.uid);
    setData(d);
  };

  useEffect(() => {
    if (!user) return; // prevents error in first render
    load();
  }, [user]);

  // If user is NOT logged in →
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please login again</h2>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Waiting for Firestore data →
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-800">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={() => auth.signOut()}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Watchlist uid={user.uid} data={data} refresh={load} />
            <Portfolio uid={user.uid} data={data} refresh={load} />
          </div>
        </div>
      </main>
    </div>
  );
}
