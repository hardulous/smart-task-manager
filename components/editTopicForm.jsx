"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PriorityBtn from "./PriorityBtn";

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const EditTopicForm = ({ topic }) => {
  const router = useRouter();
  const { _id } = topic;
  const [title, setTitle] = useState(topic.title);
  const [description, setDescription] = useState(topic.description);
  const [dueDate, setDueDate] = useState(topic.dueDate?.split("T")[0]);
  const [priority, setPriority] = useState(topic.priority);
  const today = getTodayDate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Title And Description Are Required");
      return;
    }
    try {
      const body = JSON.stringify({ title, description, dueDate, priority });
      const res = await axios.put(
        `http://localhost:3000/api/topics/${_id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data) {
        router.refresh();
        router.push("/myTask");
      } else {
        throw new Error("Failed To Update The Topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="flex flex-col gap-3">
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
        type="submit"
        className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
      >
        Update Task
      </button>
    </form>
  );
};

export default EditTopicForm;
