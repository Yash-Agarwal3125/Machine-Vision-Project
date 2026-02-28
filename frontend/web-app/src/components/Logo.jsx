export default function Logo({ className = "", textClassName = "text-slate-900" }) {
    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div className="w-8 h-8 bg-gradient-to-tr from-gold-primary to-gold-light rounded-lg flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-white text-lg">medical_services</span>
            </div>
            <span className={`font-display font-bold text-lg tracking-tight ${textClassName}`}>
                KidneyAI
            </span>
        </div>
    );
}
