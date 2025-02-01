"use client";

import { useRouter } from "next/navigation";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdOutlineDone } from "react-icons/md";
import Tooltip from "./Tooltip";
import axios from "axios";

const PendingBtn = ({ id, isPending }) => {
  const router = useRouter();

  const handlePending = async () => {
    const confirmed = confirm(`Are you sure you want to mark this task as ${isPending ? "completed" : "pending"}`);
    if (confirmed) {
      const res = await axios.patch(
        `http://localhost:3000/api/topics?id=${id}&pending=${!isPending}`
      );
      if (res.data) {
        router.refresh();
      }
    }
  };

  console.log(isPending)

  return (
    <Tooltip text={isPending ? "Mark Completed" : "Mark Pending"}>
      <button onClick={handlePending} className="text-red-400">
        {isPending ? <MdOutlineDone /> : <MdOutlinePendingActions />}
      </button>
    </Tooltip>
  );
};

export default PendingBtn;
