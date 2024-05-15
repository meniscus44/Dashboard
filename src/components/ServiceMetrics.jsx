import React, { useState, useEffect } from "react";
import axios from "axios";
import LineChart from "./LineChart";

const ServiceMetrics = () => {
  const [cpuData, setCpuData] = useState([]);
  const [memoryData, setMemoryData] = useState([]);

  useEffect(() => {
    const fetchCPU = async () => {
      try {
        const res = await axios.get("https://retoolapi.dev/Ymxfa2/cpuutilization");
        setCpuData(res.data);
      } catch (err) {
        setCpuData([]);
        console.log(err);
      }
    };
    fetchCPU();
  }, []);
  useEffect(() => {
    const fetchMemory = async () => {
      try {const res = await axios.get("https://retoolapi.dev/ybFVVH/memoryutilization");
      setMemoryData(res.data);}
      catch(err){
        setMemoryData([]);
        console.log(err);
      }
    }
    fetchMemory();
  },[]);
  return (
    <div className="w-1/2 rounded-lg bg-white border p-4">
      <span className="text-base font-bold text-cards-head">Service metrics</span>
      <div className="mt-3">
        <Tabs>
          <Tab component={<LineChart data={cpuData} chartTitle="CPU" />} active>
            <div className="flex justify-center">
              <span>CPU</span>
            </div>
          </Tab>
          <Tab component={<LineChart data={memoryData} chartTitle="Memory" />}>
            <div className="flex justify-center">
              <span>Memory</span>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default ServiceMetrics;

function Tabs({ children }) {
  function findActiveTab(a) {
    return a.reduce((accumulator, currentValue, i) => {
      if (currentValue.props.active) {
        return i;
      }

      return accumulator;
    }, 0);
  }

  function tabValidator(tab) {
    return tab.type.displayName === "Tab" ? true : false;
  }

  const [activeTab, setActiveTab] = useState(findActiveTab(children));
  return (
    <>
      <div className="flex">
        {children.map((item, i) => {
          return (
            <>
              {tabValidator(item) && (
                <Tab key={`tab-{i}`} currentTab={i} activeTab={activeTab} setActiveTab={setActiveTab}>
                  {item.props.children}
                </Tab>
              )}
            </>
          );
        })}
      </div>
      <div className="py-5">
        {children.map((item, i) => {
          return <div className={` ${i === activeTab ? "visible" : "hidden"}`}>{item.props.component}</div>;
        })}
      </div>
    </>
  );
}

function Tab({ children, activeTab, currentTab, setActiveTab }) {
  return (
    <>
      <div
        className={`cursor-pointer border-b-2 flex-1
        ${activeTab === currentTab ? "text-sidebar-color font-bold border-sidebar-color" : "text-cards-head font-medium"}`}
        onClick={() => setActiveTab(currentTab)}>
        {children}
      </div>
    </>
  );
}

Tab.displayName = "Tab";
