import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="pb-24">
            {/* Header Section */}
            <div className="bg-slate-900 text-cream-50 pt-12 pb-8 px-6 rounded-b-3xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-1">Welcome</p>
                        <h1 className="font-display text-3xl text-white">Guest User</h1>
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-slate-700 overflow-hidden">
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">GU</div>
                    </div>
                </div>
            </div>

            <div className="px-6 mt-8 space-y-8">
                {/* Action Grid */}
                <section>
                    <h2 className="font-display text-xl text-slate-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <Link to="/chat" className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between gap-3 hover:shadow-md transition-shadow group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-cream-accent flex items-center justify-center text-gold-primary group-hover:bg-gold-primary group-hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">smart_toy</span>
                                </div>
                                <div className="text-left">
                                    <span className="block text-sm font-bold text-slate-800">Ask AI Dr.</span>
                                    <span className="text-xs text-slate-500">Get instant health answers</span>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-slate-300">chevron_right</span>
                        </Link>
                    </div>
                </section>

                {/* Recent Activity */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-display text-xl text-slate-900">Recent Updates</h2>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-soft border border-cream-200 text-center">
                        <p className="text-slate-500 text-sm">No recent activity to display.</p>
                    </div>
                </section>
            </div>
        </div>
    );
}
