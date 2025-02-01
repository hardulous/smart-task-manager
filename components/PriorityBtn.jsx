"use client"

const priorities = ["low", "medium", "high"];

const PriorityBtn = ({selectedPriority,handlePriority}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex bg-gray-200 rounded-full p-1">
        {priorities.map((priority) => (
          <button
            key={priority}
            onClick={(e) => {
                e.preventDefault()
                handlePriority(priority)
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedPriority === priority
                ? priority === "low"
                  ? "bg-green-400 text-white"
                  : priority === "medium"
                  ? "bg-yellow-400 text-white"
                  : "bg-red-400 text-white"
                : "text-gray-600"
            }`}
          >
            {priority}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PriorityBtn;
