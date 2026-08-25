import React, { useState, useEffect, useRef } from 'react';
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
  const [isUnavailable, setIsUnavailable] = useState(false);
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // BUG 2 FIX (LiveChat): Set position après mount (window disponible)
  React.useEffect(() => {
    setPosition({ x: window.innerWidth - 100, y: window.innerHeight - 120 });
  }, []);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const bubbleRef = useRef<HTMLButtonElement>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: translations.greeting, sender: 'agent' }]);
    }
  }, [isOpen, messages.length, translations.greeting]);

  useEffect(() => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isThinking]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isThinking) return;
    
    const userText = inputValue.trim();
    const nextMessages = [...messages, { text: userText, sender: 'user' as const }];
    setMessages(nextMessages);
    setInputValue('');
    setIsThinking(true);
    setIsUnavailable(false);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.map(({ text, sender }) => ({
            role: sender === 'user' ? 'user' : 'model',
            text,
          })),
          systemInstruction: translations.systemInstruction,
        }),
      });

      const payload = await response.json() as { text?: string; error?: string };
      if (!response.ok || !payload.text) {
        throw new Error(payload.error || 'Le service de chat est indisponible.');
      }

      setMessages(prev => [...prev, { text: payload.text as string, sender: 'agent' }]);
    } catch (error) {
      console.error('Chat API error:', error);
      setIsUnavailable(true);
      setMessages(prev => [...prev, {
        text: "Le chat IA est temporairement indisponible. Vous pouvez nous contacter directement par WhatsApp ou via le formulaire de devis.",
        sender: 'agent',
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
    const padding = 32;
    const buttonWidth = 72;
    let targetX = position.x < (screenWidth / 2) - (buttonWidth / 2) ? padding : screenWidth - buttonWidth - padding;
    let targetY = Math.max(padding, Math.min(position.y, window.innerHeight - buttonWidth - padding));
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
          transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          touchAction: 'none'
        }}
        className="fixed w-[72px] h-[72px] rounded-3xl bg-brand-accent text-white shadow-[0_20px_50px_rgba(0,98,255,0.4)] flex items-center justify-center transform hover:scale-110 active:scale-95 z-[45] group overflow-hidden border border-white/20"
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative z-10 pointer-events-none flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        </div>
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 sm:inset-auto sm:bottom-32 sm:right-8 sm:w-[420px] sm:h-[680px] glass-panel rounded-t-3xl sm:rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col z-[101] overflow-hidden animate-scale-in" 
        >
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex justify-between items-center shrink-0 bg-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center border border-white/10 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-black text-white tracking-tighter text-xl uppercase">iVISION AI</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-black text-brand-gray uppercase tracking-widest">PRO STRATEGY</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow p-8 overflow-y-auto space-y-6 scrollbar-none">
            {isUnavailable && messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <h4 className="text-white font-black uppercase text-xl tracking-tighter">Chat indisponible</h4>
                <p className="text-brand-gray text-sm font-medium leading-relaxed">Le service IA n'est pas configuré sur cet environnement. Contactez-nous directement pour obtenir une réponse.</p>
              </div>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-6 rounded-[24px] text-sm leading-relaxed ${
                      msg.sender === 'user' 
                        ? 'bg-brand-accent text-white font-bold rounded-tr-none shadow-xl shadow-brand-accent/10' 
                        : 'bg-white/5 text-brand-gray rounded-tl-none border border-white/5'
                    }`}>
                      {msg.text || (msg.isStreaming && <div className="flex gap-1 animate-pulse">...</div>)}
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex justify-start">
                     <div className="bg-white/5 border border-brand-accent/20 px-4 py-2 rounded-full animate-pulse-slow">
                        <span className="text-[10px] font-black text-brand-accent uppercase tracking-widest">Thinking...</span>
                     </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Input */}
          {!isUnavailable && (
            <form onSubmit={handleSendMessage} className="p-8 bg-white/5 border-t border-white/5 shrink-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder={translations.placeholder}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={isThinking}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-5 pl-6 pr-16 focus:outline-none focus:border-brand-accent transition-all text-sm font-medium"
                />
                <button 
                  type="submit" 
                  disabled={isThinking || !inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 bg-brand-accent text-white rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-20 transition-all shadow-lg shadow-brand-accent/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9-7-9-7v14z" />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default LiveChat;