import { ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import logo from "../assets/logo.svg";
import admin from "../assets/admin.svg";
import docs from "../assets/docs.svg";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className={`h-full inline-flex flex-col border-r shadow-sm transition-all bg-[#37146B] ${expanded ? "w-[220px]" : "w=[76px]"}`}>
        <div className="p-4 pl-6 flex item-center">
          <img src={logo} className={"overflow-hidden transition-all h-8 w-8"} alt="" />
          {expanded && <span className="text-white pl-3 text-xl font-semibold">Kapstan</span>}
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        <div className="px-3">
          <SidebarItem icon={admin} text="Admin" />
          <SidebarItem icon={docs} text="Docs" />
        </div>
        </SidebarContext.Provider>

        <div className={`border-t flex px-4 py-3 ${expanded ? "" : "justify-center"}`}>
          <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 px-3 rounded-lg text-white hover:bg-[#4D1B95]">
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center py-2 px-2 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active ? "bg-[#4D1B95]" : "text-gray-100 hover:bg-[#4D1B95]"}
    `}>
      <img src={icon} alt="" className="px-3 w-11 h-4"/>
      <span className={`overflow-hidden transition-all text-sm text-white ${expanded ? "w-52" : "w-0 h-0"}`}>{text}</span>
      {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}>
          {text}
        </div>
      )}
    </li>
  );
}
