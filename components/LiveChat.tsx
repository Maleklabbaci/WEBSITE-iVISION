
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

interface LiveChatProps {
    translations: {
        title: string;
        greeting: string;
        placeholder: string;
        systemInstruction: string;
    }
}

interface Message {
    text: string;
    sender: 'user' | 'agent';
    isStreaming?: boolean;
}

const LiveChat: React.FC<LiveChatProps> = ({ translations }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  
  // Dragging state
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInstance = useRef<Chat | null>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: translations.greeting, sender: 'agent' }]);
      
      // Initialize Gemini Chat with Pro model
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatInstance.current = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: translations.systemInstruction,
          thinkingConfig: { thinkingBudget: 4000 } // Add thinking budget for more precise strategic reasoning
        },
      });
    }
  }, [isOpen, translations.greeting, translations.systemInstruction]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isThinking || !chatInstance.current) return;

    const userText = inputValue.trim();
    const userMessage: Message = { text: userText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    try {
      // Re-init AI inside to ensure latest key (as per dev guidelines for high-quality models)
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // We rely on the existing chat instance but could recreate it if session state wasn't needed.
      // For this implementation, we keep using chatInstance.current initialized on open.
      
      const responseStream = await chatInstance.current.sendMessageStream({ message: userText });
      
      setMessages(prev => [...prev, { text: '', sender: 'agent', isStreaming: true }]);
      
      let fullResponseText = "";
      
      for await (const chunk of responseStream) {
        const chunkText = chunk.text;
        if (chunkText) {
          fullResponseText += chunkText;
          setMessages(prev => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            if (newMessages[lastIndex].sender === 'agent' && newMessages[lastIndex].isStreaming) {
              newMessages[lastIndex] = { ...newMessages[lastIndex], text: fullResponseText };
            }
            return newMessages;
          });
        }
      }
      
      setMessages(prev => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        newMessages[lastIndex] = { ...newMessages[lastIndex], isStreaming: false };
        return newMessages;
      });

    } catch (error) {
      console.error("Gemini PRO Error:", error);
      // Fallback message
      setMessages(prev => [...prev, { 
        text: "Je m'excuse, une erreur technique est survenue. Veuillez nous contacter directement via WhatsApp pour une assistance immédiate sur nos services.", 
        sender: 'agent' 
      }]);
    } finally {
      setIsThinking(false);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    initialPos.current = { ...position };
    hasMoved.current = false;
    if (bubbleRef.current) bubbleRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      hasMoved.current = true;
    }

    setPosition({
      x: initialPos.current.x + dx,
      y: initialPos.current.y + dy
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (bubbleRef.current) bubbleRef.current.releasePointerCapture(e.pointerId);

    const screenWidth = window.innerWidth;
    const padding = 20;
    const buttonWidth = 64;
    
    let targetX = position.x < (screenWidth / 2) - (buttonWidth / 2) 
      ? padding 
      : screenWidth - buttonWidth - padding;

    const screenHeight = window.innerHeight;
    let targetY = Math.max(padding, Math.min(position.y, screenHeight - buttonWidth - padding));

    setPosition({ x: targetX, y: targetY });

    if (!hasMoved.current) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <button
        ref={bubbleRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
          touchAction: 'none'
        }}
        className="fixed bg-brand-accent text-brand-dark w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-110 active:scale-90 z-[45] group overflow-hidden cursor-grab active:cursor-grabbing"
        aria-label="Open AI Assistant"
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 pointer-events-none flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="text-[7px] font-black uppercase tracking-tighter -mt-1">PRO</span>
        </div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-96 sm:h-[600px] bg-brand-dark border-t sm:border border-brand-border rounded-t-3xl sm:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col z-[50] overflow-hidden animate-fade-in-up" style={{ transformOrigin: 'bottom right' }}>
          {/* Header */}
          <div className="p-6 bg-brand-dark border-b border-brand-border flex justify-between items-center shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-accent/20 rounded-xl flex items-center justify-center border border-brand-accent/30 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-accent rounded-full border-2 border-brand-dark"></div>
              </div>
              <div>
                <h3 className="font-black text-brand-light tracking-tight">{translations.title}</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">IA Stratégique Active</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-brand-gray hover:text-brand-accent p-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-brand-border">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-brand-accent text-brand-dark font-medium rounded-tr-none' 
                    : 'bg-brand-border text-brand-light rounded-tl-none border border-white/5'
                }`}>
                  {msg.text || (msg.isStreaming && <span className="flex gap-1 items-center h-4"><span className="w-1 h-1 bg-brand-light rounded-full animate-bounce"></span><span className="w-1 h-1 bg-brand-light rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span><span className="w-1 h-1 bg-brand-light rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span></span>)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-6 border-t border-brand-border bg-brand-dark/50 shrink-0">
            <div className="relative group">
              <input
                type="text"
                placeholder={translations.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isThinking}
                className="w-full bg-brand-dark border border-brand-border rounded-2xl py-4 pl-5 pr-14 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all text-sm placeholder:text-brand-gray/30 disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={isThinking || !inputValue.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-accent text-brand-dark rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-20 disabled:scale-100 transition-all shadow-lg"
              >
                {isThinking ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9-7-9-7v14z" />
                  </svg>
                )}
              </button>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
                 <div className="h-px bg-brand-border flex-grow"></div>
                 <p className="text-[8px] text-center text-brand-gray/40 uppercase tracking-[0.3em] font-black">
                   Powered by Gemini 3 Pro
                 </p>
                 <div className="h-px bg-brand-border flex-grow"></div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default LiveChat;
