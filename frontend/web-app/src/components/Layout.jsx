import { Link, useLocation, Outlet } from 'react-router-dom';
import Logo from './Logo';

export default function Layout() {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className="bg-cream-bg text-slate-deep min-h-screen flex flex-col font-sans">
            {/* Top Header for Logo */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-3 flex items-center justify-between">
                <Logo />
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-500 text-sm">notifications</span>
                </div>
            </header>

            <main className="flex-1 pb-32">
                <div className='px-4 py-6'>
                    <Outlet />
                </div>
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 px-6 py-3 z-30 pb-safe shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
                <div className="max-w-2xl mx-auto flex items-center justify-between">
                    <Link to="/" className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${isActive('/') ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}>
                        <span className="material-symbols-outlined">home</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
                    </Link>

                    <Link to="/history" className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${isActive('/history') ? 'text-champagne-600' : 'text-slate-400 hover:text-slate-600'}`}>
                        <span className="material-symbols-outlined">history</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">History</span>
                    </Link>

                    {/* Prominent Upload Button */}
                    <Link to="/upload" className="flex flex-col items-center -mt-8">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-cream-bg transition-transform active:scale-95 ${isActive('/upload') ? 'bg-gold-primary text-slate-900' : 'bg-slate-900 text-gold-primary'}`}>
                            <span className="material-symbols-outlined text-2xl">add_a_photo</span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest mt-1.5 text-slate-800">Scan</span>
                    </Link>

                    <Link to="/chat" className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${isActive('/chat') ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}>
                        <div className="relative">
                            <span className="material-symbols-outlined">smart_toy</span>
                            <span className="absolute top-0 right-0 w-2 h-2 bg-champagne-500 rounded-full border border-white"></span>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">AI Chat</span>
                    </Link>

                    <Link to="/profile" className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${isActive('/profile') ? 'text-slate-800' : 'text-slate-400 hover:text-slate-600'}`}>
                        <span className="material-symbols-outlined">person</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Profile</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
}
