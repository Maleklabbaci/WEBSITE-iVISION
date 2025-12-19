import React, { useState, useEffect, useRef } from 'react';

interface LiveChatProps {
    translations: {
        title: string;
        greeting: string;
        placeholder: string;
        agent_reply: string;
    }
}

interface Message {
    text: string;
    sender: 'user' | 'agent';
}

const LiveChat: React.FC<LiveChatProps> = ({ translations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ text: translations.greeting, sender: 'agent' }]);
    } else {
        setMessages([]);
    }
  }, [isOpen, translations.greeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    setTimeout(() => {
        const agentReply: Message = { text: translations.agent_reply, sender: 'agent' };
        setMessages(prev => [...prev, agentReply]);
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-brand-accent text-brand-dark w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform z-40"
        aria-label="Open live chat"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-end justify-end z-50 p-0 sm:p-6" onClick={() => setIsOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-brand-dark border-t sm:border border-brand-border w-full h-[85vh] rounded-t-lg sm:h-auto sm:max-w-sm sm:max-h-[70vh] sm:rounded-lg shadow-xl flex flex-col transform transition-transform duration-300 animate-slide-in-up text-brand-light">
            {/* Header */}
            <div className="bg-brand-dark p-4 flex justify-between items-center rounded-t-lg flex-shrink-0 border-b border-brand-border">
              <h3 className="font-bold text-lg text-brand-light">{translations.title}</h3>
              <button onClick={() => setIsOpen(false)} className="hover:text-brand-accent text-brand-gray text-2xl leading-none">&times;</button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-3 ${
                    msg.sender === 'agent' 
                      ? 'bg-brand-accent text-brand-dark rounded-e-xl rounded-es-xl' 
                      : 'bg-brand-border rounded-s-xl rounded-ee-xl'
                  }`}>
                    <p className="text-sm font-normal">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-brand-border flex-shrink-0">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder={translations.placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full p-2 bg-brand-dark border border-brand-border rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-accent text-brand-light"
                />
                <button type="submit" className="bg-brand-accent text-brand-dark p-2 rounded-r-md hover:opacity-90 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;