import React from 'react';
import { Plus, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const HeaderBar = ({ title, onNewChat, onToggleSidebar, showSidebarToggle }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showSidebarToggle && (
          <button
            aria-label="Toggle sidebar"
            onClick={onToggleSidebar}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-blue-500/30 bg-black/40 text-blue-400 hover:shadow-[0_0_10px_#3b82f6] hover:scale-105 transition-all"
          >
            <Menu size={20} />
          </button>
        )}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">{title}</h1>
          <div className="mt-1 h-1 w-40 bg-gradient-to-r from-blue-500/80 to-blue-400 rounded-full shadow-[0_0_15px_#3b82f6]/60" />
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 0 12px #3b82f6' }}
        whileTap={{ scale: 0.98 }}
        onClick={onNewChat}
        className="inline-flex items-center gap-2 rounded-full bg-blue-600/90 hover:bg-blue-500 text-white px-4 py-2 md:px-5 md:py-2.5 transition-all"
      >
        <Plus size={18} />
        <span className="text-sm md:text-base font-medium">New Chat</span>
      </motion.button>
    </div>
  );
};

export default HeaderBar;
