
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
  const [needsKey, setNeedsKey] = useState(false);
  
  const [position, setPosition] = useState({ x: window.innerWidth - 80, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInstance = useRef<Chat | null>(null);

  // Check for API key on open
  useEffect(() => {
    const checkKey = async () => {
      if (isOpen) {
        // @ts-ignore - aistudio is globally available in this context
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          setNeedsKey(true);
        } else {
          setNeedsKey(false);
          initChat();
        }
      }
    };
    checkKey();
  }, [isOpen]);

  const initChat = () => {
    if (messages.length === 0) {
      setMessages([{ text: translations.greeting, sender: 'agent' }]);
    }
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatInstance.current = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: translations.systemInstruction,
        thinkingConfig: { thinkingBudget: 8000 }
      },
    });
  };

  const handleSelectKey = async () => {
    // @ts-ignore
    await window.aistudio.openSelectKey();
    setNeedsKey(false);
    initChat();
  };

  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isThinking) return;
    
    // Safety check for instance
    if (!chatInstance.current) {
        initChat();
        if (!chatInstance.current) return;
    }

    const userText = inputValue.trim();
    setMessages(prev => [...prev, { text: userText, sender: 'user' }]);
    setInputValue('');
    setIsThinking(true);

    try {
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
            if (newMessages[lastIndex] && newMessages[lastIndex].sender === 'agent' && newMessages[lastIndex].isStreaming) {
              newMessages[lastIndex] = { ...newMessages[lastIndex], text: fullResponseText };
            }
            return [...newMessages];
          });
        }
      }
      
      setMessages(prev => {
        const newMessages = [...prev];
        const lastIndex = newMessages.length - 1;
        if (newMessages[lastIndex]) {
            newMessages[lastIndex] = { ...newMessages[lastIndex], isStreaming: false };
        }
        return [...newMessages];
      });

    } catch (error: any) {
      console.error("Gemini PRO Error:", error);
      
      if (error.message?.includes("Requested entity was not found") || error.message?.includes("API key")) {
        setNeedsKey(true);
      }

      setMessages(prev => [...prev, { 
        text: "Une erreur est survenue. Veuillez vérifier votre connexion ou cliquer sur 'Configurer l'IA' pour activer le service Pro.", 
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
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) hasMoved.current = true;
    setPosition({ x: initialPos.current.x + dx, y: initialPos.current.y + dy });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (bubbleRef.current) bubbleRef.current.releasePointerCapture(e.pointerId);
    const screenWidth = window.innerWidth;
    const padding = 20;
    const buttonWidth = 64;
    let targetX = position.x < (screenWidth / 2) - (buttonWidth / 2) ? padding : screenWidth - buttonWidth - padding;
    const screenHeight = window.innerHeight;
    let targetY = Math.max(padding, Math.min(position.y, screenHeight - buttonWidth - padding));
    setPosition({ x: targetX, y: targetY });
    if (!hasMoved.current) setIsOpen(!isOpen);
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
          transition: isDragging ? 'none' : 'all 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
          touchAction: 'none'
        }}
        className="fixed bg-brand-accent text-brand-dark w-16 h-16 rounded-full shadow-[0_10px_40px_rgba(56,189,248,0.4)] flex items-center justify-center transform hover:scale-110 active:scale-95 z-[45] group overflow-hidden cursor-grab active:cursor-grabbing border-2 border-white/20"
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative z-10 pointer-events-none flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-[7px] font-black uppercase tracking-tighter -mt-1">PRO</span>
        </div>
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[400px] sm:h-[650px] bg-brand-dark border-t sm:border border-brand-border rounded-t-3xl sm:rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.9)] flex flex-col z-[50] overflow-hidden animate-fade-in-up" 
          style={{ transformOrigin: 'bottom right' }}
        >
          {/* Header */}
          <div className="p-7 bg-brand-dark/80 backdrop-blur-xl border-b border-brand-border flex justify-between items-center shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-brand-accent/20 rounded-2xl flex items-center justify-center border border-brand-accent/30 relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-accent rounded-full border-2 border-brand-dark animate-pulse"></div>
              </div>
              <div>
                <h3 className="font-black text-brand-light tracking-tight text-lg uppercase">{translations.title}</h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black text-brand-gray uppercase tracking-[0.2em]">IA Stratégique</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-brand-gray hover:text-brand-accent p-2 transition-all hover:rotate-90">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow p-7 overflow-y-auto space-y-6 scrollbar-none bg-gradient-to-b from-brand-dark to-black/20">
            {needsKey ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
                <div className="w-20 h-20 bg-brand-accent/10 rounded-full flex items-center justify-center border border-brand-accent/30">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 00-2 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-brand-light font-black uppercase text-lg mb-2">Initialisation Recommandée</h4>
                  <p className="text-brand-gray text-sm leading-relaxed mb-6">Pour accéder à l'IA Gemini 3 Pro haute performance, une configuration est nécessaire.</p>
                  <button 
                    onClick={handleSelectKey}
                    className="bg-brand-accent text-brand-dark font-black py-4 px-8 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-brand-accent/20"
                  >
                    CONFIGURER L'IA PRO
                  </button>
                  <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="block mt-4 text-[10px] text-brand-gray/50 underline uppercase tracking-widest">En savoir plus sur la facturation</a>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] p-5 rounded-[1.5rem] text-[15px] leading-relaxed shadow-lg ${
                      msg.sender === 'user' 
                        ? 'bg-brand-accent text-brand-dark font-black rounded-tr-none' 
                        : 'bg-white/[0.03] text-brand-light rounded-tl-none border border-white/10'
                    }`}>
                      {msg.text || (msg.isStreaming && (
                        <div className="flex gap-1.5 items-center h-4">
                            <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:0.2s]"></div>
                            <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start">
                     <div className="bg-white/[0.01] border border-brand-accent/20 px-4 py-2 rounded-full flex items-center gap-3 animate-pulse">
                        <div className="w-2 h-2 bg-brand-accent rounded-full"></div>
                        <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">PRO EN ANALYSE...</span>
                     </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          {!needsKey && (
            <form onSubmit={handleSendMessage} className="p-7 border-t border-brand-border bg-brand-dark/80 backdrop-blur-xl shrink-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder={translations.placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isThinking}
                  className="w-full bg-brand-dark border border-brand-border rounded-2xl py-5 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all text-[15px] placeholder:text-brand-gray/30 disabled:opacity-50 font-medium"
                />
                <button 
                  type="submit" 
                  disabled={isThinking || !inputValue.trim()}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 w-11 h-11 bg-brand-accent text-brand-dark rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-20 transition-all shadow-xl shadow-brand-accent/30"
                >
                  {isThinking ? (
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9-7-9-7v14z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-4 text-[8px] text-center text-brand-gray/40 uppercase tracking-[0.4em] font-black">
                 Optimisé pour iVISION Strategic Growth
              </p>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default LiveChat;
