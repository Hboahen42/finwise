import React from 'react'

const PreviewStat = ({
    label,
    value,
    change,
    teal = false,
                     }: {
    label: string;
    value: string;
    change: string;
    teal?: boolean;
}) => {
    return (
        <div className="rounded-xl border border-white/6 bg-[#121217] p-3">
            <div className="text-[9px] font-medium text-zinc-600 uppercase tracking-wider">
                {label}
            </div>
            <div className={`text-base sm:text-lg font-bold mt-1 ${
                teal ? "text-teal-400" : "text-white"
            }`}>
                {value}
            </div>
            <div className="text-[9px] text-emerald-400 mt-1">
                {change}
            </div>
        </div>
    )
}
export default PreviewStat
