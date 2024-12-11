import { ChatbotWindow, type ChatbotMessageType } from "@f5/aigw-ui";
import { useState, useCallback } from "react";
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

function Chatbot() {
  const [showChatbot, setShowChatbot] = useState(true);
  const [messages, setMessages] = useState<ChatbotMessageType[]>([]);

  const onChatbotShowClick = useCallback(() => {
    setShowChatbot(!showChatbot);
  }, [showChatbot]);
  
  return (
    <div style={{position: "absolute"}}>  
      <ChatbotWindow
        messages={messages}
        setMessages={setMessages}
        onChatbotShowClick={onChatbotShowClick}
        aigw_url='http://localhost/xcdf'
      />
    </div>
  );
}

const root =  ReactDOM.createRoot(document.querySelector('#chatbot_window_container')!);
root.render(<Chatbot />);