export default function Profile() {
    return (
        <div className="bg-cream-bg min-h-screen pb-32 font-sans">
            <div className="bg-slate-deep rounded-b-3xl pt-12 pb-8 px-6 shadow-xl shadow-slate-900/10 relative overflow-hidden text-center text-white">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                <div className="absolute top-20 left-0 w-20 h-20 bg-gold-primary/10 rounded-full blur-xl"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-4 border-white/10 shadow-lg mb-4 relative">
                        <div className="w-full h-full rounded-full bg-slate-700 flex items-center justify-center text-slate-400 text-3xl font-serif">GU</div>
                        <button className="absolute bottom-0 right-0 p-1.5 bg-gold-primary text-white rounded-full border-2 border-slate-deep hover:bg-gold-dark transition-colors">
                            <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                    </div>
                    <h1 className="text-2xl font-serif font-bold text-white mb-1">Guest User</h1>
                    <p className="text-slate-light text-sm font-medium tracking-wide mb-6">Patient ID: --</p>

                    <div className="grid grid-cols-3 gap-8 w-full max-w-sm border-t border-white/10 pt-6">
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold text-gold-primary font-serif">--</span>
                            <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">Scans</span>
                        </div>
                        <div className="flex flex-col items-center border-x border-white/10 px-4">
                            <span className="text-xl font-bold text-white font-serif">--</span>
                            <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">Health Score</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-xl font-bold text-gold-primary font-serif">--</span>
                            <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">Consults</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-6 mt-8 space-y-6">
                <section>
                    <h3 className="font-serif text-lg text-slate-deep font-bold mb-4 px-2">Account Settings</h3>
                    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                        <button className="w-full flex items-center p-4 hover:bg-stone-50 transition-colors group border-b border-stone-50">
                            <div className="w-10 h-10 rounded-full bg-cream-accent flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                            <div className="text-left ml-4 flex-1">
                                <span className="block text-slate-deep font-bold text-sm">Personal Information</span>
                                <span className="block text-slate-400 text-xs mt-0.5">Update your details</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                        </button>
                        <button className="w-full flex items-center p-4 hover:bg-stone-50 transition-colors group border-b border-stone-50">
                            <div className="w-10 h-10 rounded-full bg-cream-accent flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">payments</span>
                            </div>
                            <div className="text-left ml-4 flex-1">
                                <span className="block text-slate-deep font-bold text-sm">Payments & Billing</span>
                                <span className="block text-slate-400 text-xs mt-0.5">Manage cards and history</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                        </button>
                        <button className="w-full flex items-center p-4 hover:bg-stone-50 transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-cream-accent flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">notifications</span>
                            </div>
                            <div className="text-left ml-4 flex-1">
                                <span className="block text-slate-deep font-bold text-sm">Notifications</span>
                                <span className="block text-slate-400 text-xs mt-0.5">Customize alerts</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                        </button>
                    </div>
                </section>

                <section>
                    <h3 className="font-serif text-lg text-slate-deep font-bold mb-4 px-2">Support & Legal</h3>
                    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                        <button className="w-full flex items-center p-4 hover:bg-stone-50 transition-colors group border-b border-stone-50">
                            <div className="w-10 h-10 rounded-full bg-cream-accent flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">help</span>
                            </div>
                            <div className="text-left ml-4 flex-1">
                                <span className="block text-slate-deep font-bold text-sm">Help Center</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                        </button>
                        <button className="w-full flex items-center p-4 hover:bg-stone-50 transition-colors group">
                            <div className="w-10 h-10 rounded-full bg-cream-accent flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">policy</span>
                            </div>
                            <div className="text-left ml-4 flex-1">
                                <span className="block text-slate-deep font-bold text-sm">Privacy Policy</span>
                            </div>
                            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                        </button>
                    </div>
                </section>

                <div className="pt-2 pb-6">
                    <button className="w-full py-4 border border-slate-300 rounded-xl text-slate-medium font-bold text-sm uppercase tracking-widest hover:bg-slate-50 hover:border-slate-400 hover:text-slate-deep transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-lg">logout</span>
                        Log Out
                    </button>
                    <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest">Version 2.4.0</p>
                </div>
            </div>
        </div>
    );
}
