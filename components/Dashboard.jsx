import axios from "axios";
import { FaTasks, FaCheckCircle } from "react-icons/fa";

const getTaskCount = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/topics/count", {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    if (!res.data) {
      throw new Error("Failed To Fetch Topics");
    }
    return res.data;
  } catch (error) {
    console.log("Error Loading Topics", error);
  }
};

const Dashboard = async () => {
  const { PendingTask, CompletedTask } = await getTaskCount();
  return (
    <div className="p-4 my-3 flex justify-between gap-5 items-start relative">
      {/* Pending Task Card */}
      <div className="bg-yellow-100 p-6 rounded-xl shadow-lg flex items-center w-64">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-yellow-800">
            Pending Tasks
          </span>
          <span className="text-3xl font-bold text-yellow-800">
            {PendingTask}
          </span>
        </div>
        <div className="ml-auto text-4xl text-yellow-500">
          <FaTasks />
        </div>
      </div>

      {/* Completed Task Card */}
      <div className="bg-green-100 p-6 rounded-xl shadow-lg flex items-center w-64">
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-green-800">
            Completed Tasks
          </span>
          <span className="text-3xl font-bold text-green-800">
            {CompletedTask}
          </span>
        </div>
        <div className="ml-auto text-4xl text-green-500">
          <FaCheckCircle />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
