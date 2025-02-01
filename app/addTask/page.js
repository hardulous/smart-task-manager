"use client";

import PriorityBtn from "@/components/PriorityBtn";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const AddTopic = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(getTodayDate());
  const [priority, setPriority] = useState("medium");
  const today = getTodayDate();

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Title And Description Are Required");
      return;
    }
    try {
      const body = JSON.stringify({ title, description, dueDate, priority });
      const res = await axios.post("http://localhost:3000/api/topics", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data) {
        router.push("/myTask");
      } else {
        throw new Error("Failed To Create A Topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Topic Title"
        className="border border-slate-500 px-8 py-2"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Topic Description"
        className="border border-slate-500 px-8 py-2"
      />
      <input
        type="date"
        min={today}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Topic Due Date"
        className="border border-slate-500 px-8 py-2"
      />
      <PriorityBtn
        selectedPriority={priority}
        handlePriority={(val) => setPriority(val)}
      />
      <button
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
        onClick={handleAdd}
      >
        Add Topic
      </button>
    </form>
  );
};

export default AddTopic;
