import React from 'react'
import PreviewNavItem from "@/components/landingPage/PreviewNavItem";
import PreviewStat from "@/components/landingPage/PreviewStat";

const DashboardPreview = () => {
    return (
        <div className="mx-auto max-w-215 rounded-2xl border border-white/6 bg-[#0f0f13] shadow-2xl shadow-black/50 overflow-hidden animate-float">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/6">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>

            {/* Body */}
            <div className="flex min-h-55 sm:min-h-65">
                {/* Sidebar */}
                <div className="hidden sm:flex w-35 shrink-0 flex-col border-r border-white/6 p-3">
                    <PreviewNavItem label="Dashboard" active />
                    <PreviewNavItem label="Transactions"/>
                    <PreviewNavItem label="Budgets"/>
                    <PreviewNavItem label="Accounts"/>
                    <PreviewNavItem label="Goals"/>
                </div>

                {/* Main */}
                <div className="flex-1 min-w-0 p-3 sm:-5">
                    {/* Stat cards */}
                    <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <PreviewStat label={"Net Worth"} value={"$128,435"} change={"↑ +2.1%"} />
                        <PreviewStat label={"Free to Spend"} value={"$1,330"} change={"on track"} />
                        <PreviewStat label={"Savings"} value={"$3,465"} change={"↑ +12%"} />
                    </div>

                    {/* Chart area */}
                    <div className="rounded-xl border border-white/6 bg-[#121217] h-25 relative overflow-hidden">
                        <svg
                            viewBox="0 0 600 70"
                            preserveAspectRatio="none"
                            className="absolute bottom-0 left-0 w-full h-17.5"
                        >
                            <defs>
                                <linearGradient id="previewGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M0,65 Q80,58 150,44 T300,26 T450,38 T600,12 L600,70 L0,70Z"
                                fill="url(#previewGrad)"
                            />
                            <path
                                d="M0,65 Q80,58 150,44 T300,26 T450,38 T600,12"
                                fill="none"
                                stroke="#14b8a6"
                                strokeWidth="2.5"
                            />
                            <circle cx="600" cy="12" r="4" fill="#14b8a6" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashboardPreview
