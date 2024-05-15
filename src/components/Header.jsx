import React from "react";
import expand from "../assets/expand.svg";

const Header = ({ appsData, selectedApp, setSelectedApp, status }) => {

  const toPascalCase = (str) => {
    return str.replace(/(\w)(\w*)/g, (match, firstChar, restOfString) => {
      return firstChar.toUpperCase() + restOfString.toLowerCase();
    });
  };

  return (
    <div className="w-full">
      <div className="h-16 border-b flex justify-between items-center px-8">
        <div className="flex flex-col">
          <span className="text-xsm font-medium">Applications</span>
          <div class="relative inline-flex">
            <img src={expand} alt="" className="w-2 h-2 absolute top-3 right-6 pointer-events-none" />
            <select class="font-medium h-5 bg-inherit pr-10 focus:outline-none appearance-none" onChange={(e)=>setSelectedApp(e.target.value)}>
              {appsData && appsData.map((app) => {
                return (
                  <option>{app.name}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="flex items-center">
          <span class="inline-flex items-center justify-center size-[40px] rounded-full bg-yellow-500 font-semibold text-white leading-none">JD</span>
          <span className="text-sm font-medium pl-2 pr-4">John Doe</span>
          <img src={expand} alt="" className="cursor-pointer" />
        </div>
      </div>
      <div className="px-8 py-4 flex justify-between">
        <span className=" text-xl font-black">{appsData.length > 0 && selectedApp}</span>
        <div class="relative">
          <div class="w-[95px] h-[26px] border border-solid border-deployed-green rounded-lg relative flex items-center justify-center bg-green-100">
            <div class="w-2 h-2 bg-deployed-green rounded-full absolute left-2"></div>
            <span class="text-sm text-deployed-green pl-3">{toPascalCase(status)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
