import Link from "next/link";
import RemoveBtn from "./RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import axios from "axios";
import PendingBtn from "./PendingBtn";
import Tooltip from "./Tooltip";
import { IoMdTime } from "react-icons/io";

const getTopics = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/topics", {
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

const TopicsList = async () => {
  const { topics } = await getTopics();

  return (
    <>
      {topics.map((t) => {
        const isPending = t.pending;
        return (
          <div
            key={t._id}
            className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start relative"
          >
            <div
              className={`absolute inset-0 flex transition-transform duration-500 justify-center items-center -rotate-12 font-bold text-2xl ${
                !isPending ? "translate-x-0" : "translate-x-[1000px]"
              }`}
            >
              Completed
            </div>

            <span
              className={`absolute w-1 h-full left-0 top-0 ${
                t.priority === "low"
                  ? "bg-green-300"
                  : t.priority === "medium"
                  ? "bg-yellow-300"
                  : "bg-red-300"
              }`}
            />
            <div>
              <h2 className="font-bold text-2xl">{t.title}</h2>
              <div>{t.description}</div>
              <div className="flex gap-2 items-center">
                <IoMdTime /> : <span>{t.dueDate?.split("T")[0]}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {isPending && (
                <>
                  <Tooltip text="Delete">
                    <RemoveBtn id={t._id} />
                  </Tooltip>
                  <Tooltip text="Edit">
                    <Link href={`/editTask/${t._id}`}>
                      <HiPencilAlt />
                    </Link>
                  </Tooltip>
                </>
              )}
              <PendingBtn id={t._id} isPending={t.pending} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default TopicsList;
