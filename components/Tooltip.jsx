
const Tooltip = ({ text, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded-lg py-1 px-2 z-10 whitespace-nowrap">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
