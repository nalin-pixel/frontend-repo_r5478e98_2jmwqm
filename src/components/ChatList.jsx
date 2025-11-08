import React from 'react';
import { Pin, PinOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatList = ({ items, onOpen, onTogglePin }) => {
  return (
    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <AnimatePresence>
        {items.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="col-span-full flex flex-col items-center justify-center text-center py-16 rounded-2xl border border-blue-500/20 bg-black/40"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/30 to-blue-400/10 shadow-[0_0_40px_#3b82f655] mb-6" />
            <h3 className="text-white/90 text-lg font-medium">No chats yet. Start exploring scientific knowledge now!</h3>
          </motion.div>
        ) : (
          items.map((chat) => (
            <motion.button
              key={chat.id}
              onClick={() => onOpen(chat)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2, boxShadow: '0 0 15px #3b82f655' }}
              className="group relative text-left rounded-2xl p-4 border border-blue-500/20 bg-black/40 hover:border-blue-400/40 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-white font-semibold truncate group-hover:text-blue-300 transition-colors">{chat.title}</h4>
                  <p className="text-xs text-blue-300/70 mt-1">{new Date(chat.createdAt).toLocaleString()}</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onTogglePin(chat.id); }}
                  className="p-2 rounded-full text-blue-300/70 hover:text-blue-300 hover:bg-blue-500/10 transition-colors"
                  aria-label={chat.pinned ? 'Unpin conversation' : 'Pin conversation'}
                >
                  {chat.pinned ? <Pin size={18} /> : <PinOff size={18} />}
                </button>
              </div>
            </motion.button>
          ))
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatList;
