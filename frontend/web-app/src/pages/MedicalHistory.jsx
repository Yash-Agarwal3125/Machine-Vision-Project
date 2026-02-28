import { useState } from 'react';

export default function MedicalHistory() {
    const [activeTab, setActiveTab] = useState('All');

    const tabs = ['All', 'Analysis', 'Imaging', 'Consults'];

    // Empty for now, to be populated by backend
    const historyItems = [];

    const filteredItems = activeTab === 'All'
        ? historyItems
        : historyItems.filter(item => item.type === activeTab);

    const groupedItems = filteredItems.reduce((acc, item) => {
        if (!acc[item.month]) acc[item.month] = [];
        acc[item.month].push(item);
        return acc;
    }, {});

    return (
        <div className="-mx-4 -my-6 bg-cream-50 min-h-screen pb-24">
            <header className="sticky top-0 z-40 bg-slate-900 text-cream-50 pt-12 pb-6 px-6 shadow-lg rounded-b-3xl">
                <div className="flex items-center justify-between mb-6">
                    <button className="p-2 -ml-2 rounded-full hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-champagne-400">arrow_back_ios_new</span>
                    </button>
                    <h1 className="font-display text-xl tracking-wide text-cream-50">Medical History</h1>
                    <button className="p-2 -mr-2 rounded-full hover:bg-slate-800 transition-colors relative">
                        <span className="material-symbols-outlined text-champagne-400">tune</span>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-champagne-500 rounded-full border border-slate-900"></span>
                    </button>
                </div>

                <div className="relative">
                    <input
                        className="w-full bg-slate-800 border-none text-cream-50 placeholder-slate-500 rounded-xl py-3.5 pl-11 pr-4 focus:ring-1 focus:ring-champagne-400 shadow-inner-light text-sm"
                        placeholder="Search by report or date..."
                        type="text"
                    />
                    <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-slate-500 text-[20px]">search</span>
                </div>

                <div className="flex gap-3 mt-6 overflow-x-auto no-scrollbar pb-1">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors
                            ${activeTab === tab
                                    ? 'bg-champagne-400 text-slate-900 shadow-md'
                                    : 'bg-slate-800 border border-slate-700 text-slate-300'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>

            <main className="px-5 py-6 space-y-8">
                {Object.keys(groupedItems).length === 0 ? (
                    <div className="text-center py-12 flex flex-col items-center">
                        <div className="w-16 h-16 bg-cream-200 rounded-full flex items-center justify-center mb-4">
                            <span className="material-symbols-outlined text-3xl text-slate-400">history_edu</span>
                        </div>
                        <h3 className="text-slate-900 font-bold mb-1">No Records Found</h3>
                        <p className="text-slate-500 text-sm">Your medical history will appear here.</p>
                    </div>
                ) : (
                    Object.entries(groupedItems).map(([month, items]) => (
                        <section key={month}>
                            <h2 className="font-display text-2xl text-slate-900 mb-4 px-1">{month}</h2>
                            <div className="space-y-4">
                                {items.map(item => (
                                    <div key={item.id} className="group bg-white rounded-2xl p-5 shadow-soft border border-cream-200 active:scale-[0.99] transition-all duration-200">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-cream-100 p-2.5 rounded-xl text-slate-700">
                                                    <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900 text-lg leading-tight">{item.title}</h3>
                                                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-1">{item.subtitle}</p>
                                                </div>
                                            </div>
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${item.statusColor}`}>
                                                <span className={`material-symbols-outlined text-[12px] ${!item.statusIcon ? 'filled' : ''}`}>
                                                    {item.statusIcon || 'check_circle'}
                                                </span>
                                                {item.status}
                                            </span>
                                        </div>

                                        <div className="pl-[3.25rem] space-y-3">
                                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                                                <span className="material-symbols-outlined text-[18px] text-slate-400">calendar_today</span>
                                                <span className="font-medium">{item.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-600 text-sm">
                                                <span className="material-symbols-outlined text-[18px] text-slate-400">{item.metaIcon}</span>
                                                <span className="font-medium">{item.meta}</span>
                                            </div>

                                            <div className="pt-3 flex gap-3">
                                                {item.statusIcon === 'cancel' ? (
                                                    <button className="w-full bg-cream-100 text-slate-600 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-cream-200 transition-colors">
                                                        View Notes
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button className="flex-1 bg-slate-900 text-champagne-400 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                                                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                                                            Report
                                                        </button>
                                                        <button className="flex-1 bg-cream-100 text-slate-600 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-cream-200 transition-colors">
                                                            File
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))
                )}
            </main>
        </div>
    );
}
