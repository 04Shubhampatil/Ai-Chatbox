import React, { useContext, useState } from "react";
import { Context } from "../util/Contex";
import {
  Menu,
  Plus,
  MessageCircle,
  CircleHelp,
  History,
  Settings,
} from "lucide-react";

function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompt, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <aside
      className={`h-screen text-black flex flex-col transition-all duration-300 fixed left-0 top-0 z-50 shadow-lg bg-transparent   
        extended ? "w-64" : "w-16"
    `}
    >
      <div className="p-2 md:p-4 hover:bg-white hover:bg-opacity-10 cursor-pointer transition-colors">
        <Menu size={20} className="md:w-6 md:h-6" onClick={() => setExtended(prev => !prev)} />
      </div>

      <div 
        onClick={() => newChat()} 
        className="p-2 md:p-4 hover:bg-white hover:bg-opacity-10 cursor-pointer transition-colors flex items-center gap-2 md:gap-3 animate-fade-in"
      >
        <Plus size={20} className="md:w-6 md:h-6" />
        {extended && <p className="text-xs md:text-sm font-medium">New Chat</p>}
      </div>

      {extended && (
        <div className="flex-1 overflow-y-auto">
          <p className="px-2 md:px-4 py-1 md:py-2 text-gray-600 text-xs">Recent</p>
          {prevPrompt.map((item, index) => (
            <div
              key={index}
              onClick={() => loadPrompt(item)}
              className="p-2 md:p-4 hover:bg-white hover:bg-opacity-10 cursor-pointer transition-colors flex items-center gap-2 md:gap-3 animate-fade-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <MessageCircle size={20} className="md:w-6 md:h-6" />
              <p className="text-xs md:text-sm truncate">{item.slice(0, 18)}...</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto border-t border-black border-opacity-20">
        {[
          { icon: <CircleHelp size={20} className="md:w-6 md:h-6" />, text: "Help" },
          { icon: <History size={20} className="md:w-6 md:h-6" />, text: "Activity" },
          { icon: <Settings size={20} className="md:w-6 md:h-6" />, text: "Settings" }
        ].map((item, index) => (
          <div
            key={index}
            className="p-2 md:p-4 hover:bg-white hover:bg-opacity-10 cursor-pointer transition-colors flex items-center gap-2 md:gap-3"
          >
            {item.icon}
            {extended && <p className="text-xs md:text-sm">{item.text}</p>}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;