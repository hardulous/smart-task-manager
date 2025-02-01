import Link from "next/link";
import { RiAddCircleLine } from "react-icons/ri";
import { RiTodoLine } from "react-icons/ri";
import Tooltip from "./Tooltip";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3">
      <Link className="text-white font-bold" href={"/"}>
        Smart Task Manager
      </Link>
      <div className="flex gap-2">
      <Tooltip text="My Tasks">
        <Link className="text-green-400 p-2" href={"/myTask"}>
          <button>
            <RiTodoLine />
          </button>
        </Link>
      </Tooltip>
      <Tooltip text="Add Task">
        <Link className="text-green-400 p-2" href={"/addTask"}>
          <button>
            <RiAddCircleLine />
          </button>
        </Link>
      </Tooltip>
      </div>
    </nav>
  );
};

export default Navbar;
