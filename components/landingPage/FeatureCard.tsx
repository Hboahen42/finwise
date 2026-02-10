function FeatureCard({ icon, title, description,iconBg,delay = "" }: FeatureCardProps) {
    return (
        <div className={`group rounded-2xl border border-white/6 bg-[#0f0f13] p-7 transition-all duration-300 hover:border-teal-500/50 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 animate-fade-up ${delay}`}>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl mb-4" style={{ backgroundColor: iconBg }}>
                {icon}
            </div>
            <h3 className="text-[15px] font-bold text-white mb-2">
                {title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">
                {description}
            </p>
        </div>
    )
}

export default FeatureCard;