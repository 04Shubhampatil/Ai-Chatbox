import React, { useContext } from "react";
import {
  CompassIcon, Lightbulb, MessageSquare, Code,
  Image, Mic, SendHorizonal, Bot
} from "lucide-react";
import { Context } from "../util/Contex";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);

  return (
    <div className="flex-1 min-h-screen relative mt-4 md:mt-10 mx-4 md:ml-16 md:mr-5">
      <div className="flex items-center justify-between text-xl md:text-2xl mb-8 md:mb-12">
        <p className="text-center"></p>
        <img
          src="https://cdn.pixabay.com/photo/2024/03/15/19/51/ai-generated-8635685_1280.png"
          alt="Profile"
          className="w-8 md:w-10 rounded-full"
        />
      </div>

      <div className="max-w-4xl mx-auto px-2 md:px-4">
        {!showResult ? (
          <>
            <div className="text-center mb-8 md:mb-12">
              <p className="text-3xl md:text-4xl font-bold mb-2">
                <span className="animate-fade-in">Hello, Dev</span>
              </p>
              <p className="text-lg md:text-xl text-gray-600 animate-slide-up">How can I help you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
              {[
                {
                  text: "Suggest beautiful places to see on an upcoming road trip",
                  icon: <CompassIcon size={32} className="text-blue-500" />
                },
                {
                  text: "Briefly summarize the concept: urban planning",
                  icon: <Lightbulb size={32} className="text-yellow-500" />
                },
                {
                  text: "Brainstorm team bonding activities for our work retreat",
                  icon: <MessageSquare size={32} className="text-green-500" />
                },
                {
                  text: "Improve the readability of the following code",
                  icon: <Code size={32} className="text-purple-500" />
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex justify-between items-start animate-fade-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="text-base md:text-lg font-medium pr-4">{item.text}</p>
                  {item.icon}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 space-y-4 md:space-y-6 mb-24 animate-fade-in">
            <div className="flex items-center gap-3 md:gap-4 border-b border-gray-200 pb-4">
              <img
                src="https://cdn.pixabay.com/photo/2024/03/15/19/51/ai-generated-8635685_1280.png"
                alt="Profile"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
              <p className="text-base md:text-lg font-medium text-gray-800 break-words">
                {recentPrompt}
              </p>
            </div>
            <div className="flex gap-3 md:gap-4 items-start">
              <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                <Bot size={32} className="text-blue-600" />
              </div>
              {loading ? (
                <div className="flex gap-2 animate-pulse">
                  <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-gray-300"></div>
                  <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-gray-300 animation-delay-200"></div>
                  <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-gray-300 animation-delay-400"></div>
                </div>
              ) : (
                <p className="text-gray-700 leading-relaxed mt-1 break-words overflow-auto text-sm md:text-base" 
                   dangerouslySetInnerHTML={{__html: resultData}}
                />
              )}
            </div>
          </div>
        )}

        <div className="fixed bottom-4 md:bottom-8 left-4 right-4 md:left-20 md:right-5">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-3 md:p-4 mx-auto max-w-4xl">
            <div className="flex items-center gap-2 md:gap-4">
              <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
                placeholder="Enter a prompt here"
                className="flex-1 p-2 md:p-3 text-sm md:text-base text-gray-700 bg-transparent outline-none"
              />
              <div className="flex items-center gap-1 md:gap-2">
                <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Image size={20} className="text-gray-600" />
                </button>
                <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Mic size={20} className="text-gray-600" />
                </button>
                <button 
                  onClick={() => onSent()}
                  className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <SendHorizonal size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;