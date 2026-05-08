import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Trash2, Bot, User } from 'lucide-react';

export default function ChatBot({ chatData }) {
  const { messages, isTyping, sendMessage, clearChat } = chatData;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          fixed bottom-6 right-6 z-50
          w-16 h-16
          bg-neo-accent border-4 border-black
          shadow-neo-md neo-btn-push
          flex items-center justify-center
          hover:bg-neo-secondary
          transition-colors duration-100
        "
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-black" strokeWidth={3} />
        ) : (
          <MessageCircle className="w-7 h-7 text-black" strokeWidth={3} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="
            fixed bottom-24 right-6 z-50
            w-[360px] max-w-[calc(100vw-2rem)] h-[500px]
            bg-neo-bg dark:bg-neo-dark
            border-4 border-black dark:border-neo-bg
            shadow-neo-lg
            flex flex-col
          "
        >
          {/* Header */}
          <div className="bg-black px-4 py-3 flex items-center justify-between border-b-4 border-black">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-neo-accent" strokeWidth={3} />
              <span className="font-bold text-sm uppercase tracking-wide text-white">
                Dashboard AI
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearChat}
                className="text-white/70 hover:text-neo-accent transition-colors duration-100"
                aria-label="Clear chat"
              >
                <Trash2 className="w-4 h-4" strokeWidth={3} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-neo-accent transition-colors duration-100"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Bot className="w-12 h-12 mx-auto mb-3 text-black/30 dark:text-neo-bg/30" strokeWidth={2} />
                <p className="font-bold text-sm text-black/50 dark:text-neo-bg/50 uppercase tracking-wide">
                  Ask me about ISS data or news!
                </p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`
                    max-w-[80%] px-4 py-3 border-3
                    ${msg.role === 'user'
                      ? 'bg-neo-accent border-2 border-black text-black shadow-[3px_3px_0px_0px_#000]'
                      : 'bg-neo-muted border-2 border-black text-black shadow-[3px_3px_0px_0px_#000]'
                    }
                  `}
                >
                  <div className="flex items-center gap-1 mb-1">
                    {msg.role === 'user' ? (
                      <User className="w-3 h-3" strokeWidth={3} />
                    ) : (
                      <Bot className="w-3 h-3" strokeWidth={3} />
                    )}
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {msg.role === 'user' ? 'You' : 'AI'}
                    </span>
                  </div>
                  <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-neo-muted border-2 border-black px-4 py-3 shadow-[3px_3px_0px_0px_#000]">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-black rounded-none typing-dot" />
                    <span className="w-2 h-2 bg-black rounded-none typing-dot" />
                    <span className="w-2 h-2 bg-black rounded-none typing-dot" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t-4 border-black dark:border-neo-bg flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about ISS or news..."
              className="
                flex-1 px-4 py-3
                bg-white dark:bg-neo-dark-surface
                font-bold text-sm text-black dark:text-neo-bg
                placeholder:text-black/40 dark:placeholder:text-neo-bg/40
                focus:outline-none focus:bg-neo-secondary dark:focus:text-black
                border-none
              "
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="
                bg-neo-accent border-l-4 border-black dark:border-neo-bg
                px-4 py-3
                hover:bg-neo-secondary
                disabled:opacity-50
                transition-colors duration-100
                neo-btn-push
              "
              aria-label="Send message"
            >
              <Send className="w-5 h-5 text-black" strokeWidth={3} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
