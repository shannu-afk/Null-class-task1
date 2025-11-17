import { useState } from "react";
import { updateUserData } from "../services/firestore";

export default function Watchlist({ uid, data, refresh }) {
  const [item, setItem] = useState("");

  const add = async () => {
    if (!item.trim()) return;

    try {
      // Create new array
      const newList = [...data.watchlist, item];

      // Update Firestore
      await updateUserData(uid, { watchlist: newList });

      // Clear input
      setItem("");

      // Refresh UI
      refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to add item.");
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Watchlist</h2>

        <ul className="space-y-2 mb-4">
          {data.watchlist.map((x, i) => (
            <li key={i} className="flex items-center">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
              <span className="text-gray-700">{x}</span>
            </li>
          ))}
        </ul>

        <div className="flex">
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Add Item"
            className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            onClick={add}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
