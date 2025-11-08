import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import HeaderBar from './components/HeaderBar';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import Sidebar from './components/Sidebar';

const mockConversations = [
  {
    id: '1',
    title: 'CRISPR gene editing basics',
    createdAt: new Date().toISOString(),
    pinned: true,
    messages: [
      { id: 'm1', role: 'user', content: 'What is CRISPR and how does it work?' },
      { id: 'm2', role: 'assistant', content: 'CRISPR-Cas9 is a genome editing tool that uses a guide RNA to direct the Cas9 nuclease to a specific DNA sequence, enabling targeted modifications.', references: [
        { title: 'CRISPR-Cas Systems', author: 'Jinek et al.', year: 2012, url: 'https://doi.org/10.1126/science.1225829' },
        { title: 'Genome Editing with CRISPR-Cas9', author: 'Doudna & Charpentier', year: 2014, url: 'https://doi.org/10.1126/science.1258096' },
      ] },
    ],
  },
  {
    id: '2',
    title: 'Deep learning for protein folding',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    pinned: false,
    messages: [
      { id: 'm3', role: 'user', content: 'How did AlphaFold improve protein structure prediction?' },
      { id: 'm4', role: 'assistant', content: 'AlphaFold leverages attention-based deep learning to infer 3D structures from sequences with high accuracy using evolutionary covariation.', references: [
        { title: 'Highly accurate protein structure prediction with AlphaFold', author: 'Jumper et al.', year: 2021, url: 'https://www.nature.com/articles/s41586-021-03819-2' },
      ] },
    ],
  },
];

function App() {
  const [conversations, setConversations] = useState(mockConversations);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeChat = useMemo(() => conversations.find(c => c.id === activeChatId) || null, [conversations, activeChatId]);

  const handleNewChat = () => {
    const newId = String(Date.now());
    const newChat = {
      id: newId,
      title: 'New Research Chat',
      createdAt: new Date().toISOString(),
      pinned: false,
      messages: [],
    };
    setConversations([newChat, ...conversations]);
    setActiveChatId(newId);
  };

  const handleOpenChat = (chat) => setActiveChatId(chat.id);

  const handleTogglePin = (id) => {
    setConversations(prev => prev.map(c => c.id === id ? { ...c, pinned: !c.pinned } : c));
  };

  const handleSend = () => {
    if (!input.trim() || !activeChat) return;
    const text = input.trim();
    setInput('');
    setConversations(prev => prev.map(c => {
      if (c.id !== activeChat.id) return c;
      const userMsg = { id: 'u' + Date.now(), role: 'user', content: text };
      const botMsg = { id: 'b' + Date.now(), role: 'assistant', content: 'Here is a concise answer with references.', references: [
        { title: 'Example Paper on Topic', author: 'Doe et al.', year: 2023, url: 'https://example.com' },
      ] };
      return { ...c, messages: [...c.messages, userMsg, botMsg] };
    }));
  };

  const handleRename = () => {
    if (!activeChat) return;
    const name = prompt('Rename conversation:', activeChat.title);
    if (!name) return;
    setConversations(prev => prev.map(c => c.id === activeChat.id ? { ...c, title: name } : c));
  };

  const handleDelete = () => {
    if (!activeChat) return;
    if (!confirm('Delete this conversation?')) return;
    setConversations(prev => prev.filter(c => c.id !== activeChat.id));
    setActiveChatId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="relative">
        <div className="absolute inset-0 h-[40vh] md:h-[50vh]">
          <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/90" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto p-6">
          <HeaderBar
            title={activeChat ? 'Chat Session' : 'My Conversations'}
            onNewChat={handleNewChat}
            onToggleSidebar={() => setSidebarOpen(v => !v)}
            showSidebarToggle={!!activeChat}
          />

          <AnimatePresence mode="wait">
            {!activeChat ? (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-10"
              >
                <ChatList items={conversations} onOpen={handleOpenChat} onTogglePin={handleTogglePin} />
                <div className="mt-10 text-center text-sm text-blue-300/80">Powered by RAG AI — Scientific Literature Search Assistant.</div>
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6"
              >
                <div className="rounded-2xl border border-blue-500/20 bg-black/40 overflow-hidden">
                  <div className="flex h-[70vh]">
                    <Sidebar open={sidebarOpen} items={conversations} onOpen={handleOpenChat} />
                    <div className="flex-1 p-4 md:p-6">
                      <ChatWindow
                        title={activeChat.title}
                        messages={activeChat.messages}
                        input={input}
                        onInputChange={setInput}
                        onSend={handleSend}
                        onRename={handleRename}
                        onDelete={handleDelete}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
