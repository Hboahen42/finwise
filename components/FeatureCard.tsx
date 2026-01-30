function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="group rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-teal-500 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-teal-500">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100 transition-colors group-hover:bg-teal-500 dark:bg-teal-900/20 dark:group-hover:bg-teal-500">
                <span className="h-6 w-6 text-teal-600 transition-colors group-hover:text-white dark:text-teal-400 dark:group-hover:text-white">
                    {icon}
                </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {title}
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {description}
            </p>
        </div>
    )
}

export default FeatureCard;