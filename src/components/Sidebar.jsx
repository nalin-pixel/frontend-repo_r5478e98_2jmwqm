import React from 'react';
import { Pin } from 'lucide-react';

const Sidebar = ({ open, items, onOpen }) => {
  return (
    <div className={`${open ? 'w-64' : 'w-0'} transition-[width] duration-300 ease-in-out overflow-hidden h-full border-r border-blue-500/10 bg-black/40`}> 
      <div className="p-4">
        <h3 className="text-blue-300/90 font-semibold mb-3">Conversations</h3>
        <div className="space-y-2">
          {items.map((c) => (
            <button
              key={c.id}
              onClick={() => onOpen(c)}
              className="w-full text-left rounded-xl px-3 py-2 border border-blue-500/20 bg-black/30 hover:border-blue-400/40 hover:shadow-[0_0_10px_#3b82f655] transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-white/90 truncate">{c.title}</span>
                {c.pinned && <Pin size={14} className="text-blue-300/80" />}
              </div>
              <div className="text-[10px] text-blue-300/70 mt-1">{new Date(c.createdAt).toLocaleDateString()}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
