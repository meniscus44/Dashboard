import React from "react";

const StatusChip = ({ status }) => {
  let chipColorClass = "";
  let chipText = "";

  switch (status) {
    case "successful":
      chipColorClass = "deployed-green";
      chipText = "Successful";
      break;
    case "in_progress":
      chipColorClass = "in-progress";
      chipText = "In Progress";
      break;
    case "failed":
      chipColorClass = "failed";
      chipText = "Failed";
      break;
    default:
      chipColorClass = "gray-300";
      chipText = "Unknown";
  }

  return (
    <div className="relative">
      <div className={`w-[95px] h-[26px] border border-solid rounded-lg relative flex items-center justify-center border-${chipColorClass} bg-${chipColorClass} bg-opacity-10`}>
        <div className={`w-2 h-2 rounded-full absolute left-2 bg-${chipColorClass}`}></div>
        <span className={`text-sm pl-3 text-${chipColorClass} font-normal`}>{chipText}</span>
      </div>
    </div>
  );
};

export default StatusChip;
