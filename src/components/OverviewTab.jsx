import React from "react";
import ServiceMetrics from "./ServiceMetrics";
import EventHistory from "./EventHistory";
import expand from "../assets/expand.svg";
import status from "../assets/status.svg";

const OverviewTab = ({ appData }) => {

  const getTimeDifference = (updatedAtTimestamp) => {
    const now = new Date();
    const updatedAt = new Date(updatedAtTimestamp * 1000);

    const timeDifferenceInSeconds = Math.floor((now - updatedAt) / 1000);

    if (timeDifferenceInSeconds < 60) {
      return "just now";
    } else if (timeDifferenceInSeconds < 3600) {
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const days = Math.floor(timeDifferenceInSeconds / 86400);
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg bg-white border p-4">
        <div className="flex justify-between">
          <span className="text-base font-bold text-cards-head">Service info</span>
          <img className="cursor-pointer" src={expand} alt="" />
        </div>
        <div className="flex gap-12 mt-3">
          <div className="w-40">
            <span className="text-xs font-medium text-cards-head">Current version</span>
            <div className="flex gap-2 mt-1">
              <img src={status} alt="" />
              <span className="text-sm font-medium">In sync</span>
            </div>
          </div>
          <div className="w-40">
            <span className="text-xs font-medium text-cards-head">Desired version</span>
            <div className="mt-1">
              <span className="text-sm font-medium">{appData.desiredVersion}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-8 items-center">
          <button className="w-24 h-9 bg-[#6E27D5] text-white font-medium rounded">Deploy</button>
          {appData.updatedAt && <span className="text-xs font-medium text-cards-head">{`Last updated ${getTimeDifference(appData.updatedAt)}`}</span>}
        </div>
      </div>
      <div className="flex gap-4 h-[396px]">
        <ServiceMetrics />
        <EventHistory />
      </div>
    </div>
  );
};

export default OverviewTab;
