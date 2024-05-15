import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Sidebar from "./components/Sidebar";
import { SidebarItem } from "./components/Sidebar";
import Header from "./components/Header";
import { Tabs, Tab } from "./components/Tabs";
import OverviewTab from "./components/OverviewTab";
import application from "./assets/application.svg";
import connections from "./assets/connections.svg";
import cost from "./assets/cost.svg";
import security from "./assets/security.svg";
import overview from "./assets/overview.svg";
import environment from "./assets/environment.svg";
import alerts from "./assets/alerts.svg";
import event from "./assets/event.svg";

function App() {
  const [selectedApp, setSelectedApp] = useState("");
  const [appsData, setAppsData] = useState([]);

  useEffect(() => {
    const fetchAppsData = async () => {
      try {
        const res = await axios.get("https://retoolapi.dev/71NNjB/applications");
        setAppsData(res.data);
      } catch (err) {
        setAppsData([]);
        console.log(err);
      }
    };
    fetchAppsData();
  }, []);

  useEffect(() => {
    setSelectedApp(appsData[0]?.name);
  },[appsData]);

  const getStatusByName = (name) => {
    const item = appsData.find(item => item.name === name);
    return item ? item.status : "Not found";
  };

  const getObjectByName = (name) => {
    const item = appsData.find(item => item.name === name);
    return item || [];
  }

  return (
    <div className="App flex">
      <Sidebar>
        <SidebarItem icon={application} text="Application" active />
        <SidebarItem icon={connections} text="Connections" />
        <SidebarItem icon={cost} text="Cost" />
        <SidebarItem icon={security} text="Security" />
      </Sidebar>
      <div className="w-full bg-[#F8F8F8]">
        <Header appsData={appsData} selectedApp={selectedApp} setSelectedApp={setSelectedApp} status={getStatusByName(selectedApp)}/>
        <Tabs>
          <Tab component={<OverviewTab appData={getObjectByName(selectedApp)}/>} active>
            <div className="flex gap-1 items-center">
              <img src={overview} className="inline" alt="" />
              <span>Overview</span>
            </div>
          </Tab>
          <Tab component="content of tab 2">
            <div className="flex gap-1 items-center">
              <img src={environment} className="inline" alt="" />
              <span>Environment Variables</span>
            </div>
          </Tab>
          <Tab component="content of tab 3">
            <div className="flex gap-1 items-center">
              <img src={alerts} className="inline" alt="" />
              <span>Alerts</span>
            </div>
          </Tab>
          <Tab component="content of tab 4">
            <div className="flex gap-1 items-center">
              <img src={event} className="inline" alt="" />
              <span>Event history</span>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
