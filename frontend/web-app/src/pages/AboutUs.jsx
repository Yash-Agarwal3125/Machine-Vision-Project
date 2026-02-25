import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function AboutUs() {
    const navigate = useNavigate();

    return (
        <div className="bg-[#f8f8f5] dark:bg-[#221e10] font-display text-[#2d3748] dark:text-gray-100 antialiased overflow-x-hidden pb-24 min-h-screen">
            <nav className="sticky top-0 z-50 bg-[#f8f8f5]/90 dark:bg-[#221e10]/90 backdrop-blur-md border-b border-[#f2b90d]/10 px-6 py-4 flex justify-between items-center">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-[#f2b90d]/10 transition-colors text-[#2d3748] dark:text-white">
                    <span className="material-symbols-outlined text-xl">arrow_back_ios_new</span>
                </button>
                <Logo textClassName="text-[#2d3748] dark:text-white" />
                <div className="w-8"></div>
            </nav>

            <section className="px-6 pt-6 pb-2">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-[#f2b90d]/20 group bg-slate-200 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-slate-400">business</span>
                </div>
            </section>

            <section className="px-6 py-8 text-center">
                <p className="text-slate-500">Company Information</p>
            </section>
        </div>
    );
}
