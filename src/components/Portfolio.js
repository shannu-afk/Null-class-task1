import { useState } from "react";
import { updateUserData } from "../services/firestore";

export default function Portfolio({ uid, data, refresh }) {
  const [stock, setStock] = useState("");

  const add = async () => {
    if (!stock.trim()) return;

    try {
      const newList = [...data.portfolio, stock];

      await updateUserData(uid, { portfolio: newList });

      setStock("");
      refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to add stock to portfolio");
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Portfolio</h2>

        <ul className="space-y-2 mb-4">
          {data.portfolio.map((x, i) => (
            <li key={i} className="flex items-center">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              <span className="text-gray-700">{x}</span>
            </li>
          ))}
        </ul>

        <div className="flex">
          <input
            type="text"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Add Stock"
            className="flex-1 rounded-l-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            onClick={add}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
