import { useState, useRef, useEffect } from 'react';

export default function AIChat() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', text: 'Hello! I am your personal kidney health assistant. I can help analyze your reports, explain medical terms, or track your hydration. How can I help you today?' },
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMsg = { id: Date.now(), sender: 'user', text: input };
        setMessages(prev => [...prev, newMsg]);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'ai',
                text: "I'll help you with that. Can you provide more details?"
            }]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-cream-50">
            <header className="bg-white/80 backdrop-blur-md border-b border-stone-100 p-4 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-primary to-gold-light flex items-center justify-center text-white shadow-md">
                        <span className="material-symbols-outlined">smart_toy</span>
                    </div>
                    <div>
                        <h1 className="font-display text-lg font-bold text-slate-deep">Dr. AI Assistant</h1>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs text-slate-500 font-medium">Online</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-sm ${msg.sender === 'user'
                                ? 'bg-slate-800 text-white rounded-tr-none'
                                : 'bg-white text-slate-700 border border-stone-100 rounded-tl-none'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-stone-100 pb-safe">
                <form onSubmit={handleSend} className="relative flex items-center gap-2">
                    <button type="button" className="p-2 text-slate-400 hover:text-gold-primary transition-colors">
                        <span className="material-symbols-outlined">add_circle</span>
                    </button>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your health question..."
                        className="flex-1 bg-stone-50 border-none rounded-xl py-3 px-4 text-sm focus:ring-1 focus:ring-gold-primary placeholder-slate-400"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="p-2 bg-gold-primary text-slate-900 rounded-xl shadow-sm hover:bg-gold-dark hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </form>
            </div>
        </div>
    );
}
