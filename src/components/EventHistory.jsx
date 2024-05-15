import React, { useState, useEffect } from "react";
import axios from "axios";
import StatusChip from "./StatusChip";

const EventHistory = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("https://retoolapi.dev/TYjDIe/eventhistory");
        setHistoryData(res.data);
      } catch (err) {
        setHistoryData([]);
        console.log(err);
      }
    };
    fetchHistory();
  }, []);

  const getAge = (time) => {
    const currentTime = new Date().getTime() / 1000; // Get current time in seconds
    const timestamp = parseInt(time); // Convert timestamp to number

    const timeDifference = currentTime - timestamp;
    let ageString = "";

    if (timeDifference < 60) {
      ageString = "Just now";
    } else if (timeDifference < 3600) {
      ageString = `${Math.floor(timeDifference / 60)} minutes ago`;
    } else if (timeDifference < 86400) {
      ageString = `${Math.floor(timeDifference / 3600)} hours ago`;
    } else {
      ageString = `${Math.floor(timeDifference / 86400)} days ago`;
    }

    return ageString;
  };

  return (
    <div className="w-1/2 rounded-lg bg-white border p-4">
      <span className="text-base font-bold text-cards-head">Event History</span>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="border-b">
                  <tr>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3 text-left">
                      Event
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3 text-left">
                      Version
                    </th>
                    <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3 text-left">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.slice(0, 4).map((data) => {
                    return (
                      <tr class="border-b">
                        <td class="text-sm text-cards-head font-medium px-6 py-3 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span>{data.event}</span>
                            <span className="text-xs text-sub-text">{getAge(data.timestamp)}</span>
                          </div>
                        </td>
                        <td class="text-sm text-cards-head font-mdedium px-6 py-3 whitespace-nowrap">{data.version}</td>
                        <td class="text-sm text-cards-head font-light px-6 py-3 whitespace-nowrap">{<StatusChip status={data.status} />}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <a href="/" className="text-sidebar-color underline pl-6 text-xs font-medium">View more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHistory;
