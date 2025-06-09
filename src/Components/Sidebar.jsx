import React, { useContext, useState } from "react";
import { Context } from "../util/Contex";
import {
  MenuIcon,
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
      className={`h-screen text-white flex flex-col ${
        extended ? "w-64" : "w-16"
      } transition-all duration-300 fixed left-0 top-0 z-50 shadow-lg`}
      style={{ backgroundColor: "rgb(32, 34, 39)" }}
    >
      <div className="p-3 md:p-4 hover:bg-gray-700 cursor-pointer transition-colors">
        <MenuIcon size={24} onClick={() => setExtended(prev => !prev)} />
      </div>

      <div 
        onClick={() => newChat()} 
        className="p-3 md:p-4 hover:bg-gray-700 cursor-pointer transition-colors flex items-center gap-3 animate-fade-in"
      >
        <Plus size={24} />
        {extended && <p className="text-sm font-medium">New Chat</p>}
      </div>

      {extended && (
        <div className="flex-1 overflow-y-auto">
          <p className="px-4 py-2 text-gray-400 text-xs md:text-sm">Recent</p>
          {prevPrompt.map((item, index) => (
            <div
              key={index}
              onClick={() => loadPrompt(item)}
              className="p-3 md:p-4 hover:bg-gray-700 cursor-pointer transition-colors flex items-center gap-3 animate-fade-slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <MessageCircle size={24} />
              <p className="text-sm truncate">{item.slice(0, 18)}...</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto border-t border-gray-700">
        {[
          { icon: <CircleHelp size={24} />, text: "Help" },
          { icon: <History size={24} />, text: "Activity" },
          { icon: <Settings size={24} />, text: "Settings" }
        ].map((item, index) => (
          <div
            key={index}
            className="p-3 md:p-4 hover:bg-gray-700 cursor-pointer transition-colors flex items-center gap-3"
          >
            {item.icon}
            {extended && <p className="text-sm">{item.text}</p>}
          </div>
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;