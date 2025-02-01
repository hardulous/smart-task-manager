"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

const RemoveBtn = ({ id }) => {
  const router = useRouter();

  const handleRemove = async () => {
    const confirmed = confirm("Are you sure you want to delete this task");
    if (confirmed) {
      const res = await axios.delete(
        `http://localhost:3000/api/topics?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.data) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={handleRemove} className="text-red-400">
      <HiOutlineTrash />
    </button>
  );
};

export default RemoveBtn;
