import React from 'react'

const PreviewNavItem = ({label, active = false}:{ label: string; active?: boolean }) => {
    return (
        <div className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-[10px] font-medium mb-0.5 ${
            active ? "bg-white/5 text-white" : "text-zinc-600"
        }`}>
            <div className={`w-1.25 h-1.25 rounded-full ${
                active ? "bg-teal-400" : "bg-zinc-700"
            }`} />
            {label}
        </div>
    )
}
export default PreviewNavItem
