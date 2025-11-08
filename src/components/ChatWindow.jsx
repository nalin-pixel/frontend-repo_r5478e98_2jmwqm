import React, { useEffect, useRef } from 'react';
import { MoreVertical, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const BotReferenceCard = ({ refItem }) => {
  return (
    <a
      href={refItem.url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-xl border border-blue-500/20 bg-black/40 p-3 hover:border-blue-400/40 hover:shadow-[0_0_12px_#3b82f655] transition-all"
    >
      <p className="text-sm text-white/90 font-medium">{refItem.title}</p>
      <p className="text-xs text-blue-300/80 mt-1">{refItem.author} • {refItem.year}</p>
    </a>
  );
};

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}>
      <div
        className={`${isUser ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white' : 'bg-zinc-900/80 text-blue-200'} max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-3 shadow-inner`}
      >
        <p className={`text-sm leading-relaxed ${isUser ? 'text-white' : 'text-blue-100/90 drop-shadow-[0_0_6px_rgba(59,130,246,0.35)]'}`}>{message.content}</p>
        {!isUser && message.references?.length > 0 && (
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {message.references.map((ref, idx) => (
              <BotReferenceCard key={idx} refItem={ref} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ChatWindow = ({ title, messages, input, onInputChange, onSend, onRename, onDelete }) => {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b border-blue-500/10">
        <h2 className="text-xl md:text-2xl font-semibold text-white">{title}</h2>
        <div className="relative">
          <details className="group">
            <summary className="list-none inline-flex items-center justify-center w-10 h-10 rounded-full border border-blue-500/20 text-blue-300/80 hover:text-blue-300 hover:shadow-[0_0_10px_#3b82f6] cursor-pointer transition-all">
              <MoreVertical size={18} />
            </summary>
            <div className="absolute right-0 mt-2 w-40 rounded-xl border border-blue-500/20 bg-black/80 backdrop-blur-sm p-1 shadow-[0_0_16px_#3b82f655]">
              <button onClick={onRename} className="w-full text-left px-3 py-2 rounded-lg text-white/90 hover:bg-blue-500/10">Rename</button>
              <button onClick={onDelete} className="w-full text-left px-3 py-2 rounded-lg text-red-300/90 hover:bg-red-500/10">Delete</button>
            </div>
          </details>
        </div>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
        {messages.map((m) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <MessageBubble message={m} />
          </motion.div>
        ))}
      </div>

      <div className="sticky bottom-0 pt-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-sm">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question about scientific literature..."
            rows={1}
            className="flex-1 resize-none rounded-2xl bg-zinc-900/80 border border-blue-500/20 focus:border-blue-400/50 focus:outline-none text-white placeholder:text-blue-300/50 px-4 py-3"
          />
          <button
            onClick={onSend}
            className="h-12 w-12 inline-flex items-center justify-center rounded-full bg-blue-600/90 hover:bg-blue-500 text-white hover:shadow-[0_0_12px_#3b82f6] hover:scale-105 transition-all"
            aria-label="Send"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
