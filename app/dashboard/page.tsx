"use client";

import { useState, useEffect, useRef } from "react";
import {
    TrendingUp,
    CreditCard,
    Wallet,
    PiggyBank,
    BarChart3,
    Bell,
    Settings,
    Search,
    Plus,
    Eye,
    EyeOff,
    RefreshCw,
    Calendar,
    ArrowRight,
    ArrowUpRight,
    Sparkles,
    DollarSign,
    Home,
    Car,
    Utensils,
    ShoppingBag,
    Zap,
    Wifi,
    Heart,
    Dumbbell,
    LogOut,
    LineChart,
    PieChart,
    Target,
    Clock,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import * as d3 from "d3";

// ─── Types ───────────────────────────────────────────────────────────
interface Account {
    id: number;
    name: string;
    type: "checking" | "savings" | "credit" | "investment";
    balance: number;
    institution: string;
    last4: string;
    color: string;
}

interface Category {
    name: string;
    icon: LucideIcon;
    amount: number;
    budget: number;
    color: string;
}

interface Transaction {
    id: number;
    name: string;
    category: string;
    amount: number;
    date: string;
    time: string;
    icon: LucideIcon;
    reviewed: boolean;
}

interface UpcomingBill {
    name: string;
    amount: number;
    date: string;
    daysLeft: number;
}

interface DailySpend {
    day: number;
    actual: number;
    ideal: number;
}

interface MonthlyNetWorth {
    month: string;
    value: number;
}

interface CumulativePoint {
    day: number;
    cumActual: number;
}

// ─── Mock Data ───────────────────────────────────────────────────────
const ACCOUNTS: Account[] = [
    { id: 1, name: "Chase Checking", type: "checking", balance: 8432.5, institution: "Chase", last4: "4521", color: "#3B82F6" },
    { id: 2, name: "Ally Savings", type: "savings", balance: 24180.75, institution: "Ally", last4: "8834", color: "#10B981" },
    { id: 3, name: "Amex Platinum", type: "credit", balance: -2847.32, institution: "American Express", last4: "1008", color: "#8B5CF6" },
    { id: 4, name: "Fidelity 401(k)", type: "investment", balance: 67420.0, institution: "Fidelity", last4: "5590", color: "#F59E0B" },
    { id: 5, name: "Vanguard Roth IRA", type: "investment", balance: 31250.0, institution: "Vanguard", last4: "2201", color: "#EC4899" },
];

const CATEGORIES: Category[] = [
    { name: "Housing", icon: Home, amount: 2100, budget: 2100, color: "#3B82F6" },
    { name: "Food & Dining", icon: Utensils, amount: 684.5, budget: 800, color: "#10B981" },
    { name: "Transportation", icon: Car, amount: 342.8, budget: 400, color: "#F59E0B" },
    { name: "Shopping", icon: ShoppingBag, amount: 456.2, budget: 500, color: "#8B5CF6" },
    { name: "Utilities", icon: Zap, amount: 287.4, budget: 350, color: "#EC4899" },
    { name: "Entertainment", icon: Sparkles, amount: 125.0, budget: 200, color: "#06B6D4" },
    { name: "Health", icon: Heart, amount: 89.0, budget: 150, color: "#EF4444" },
    { name: "Internet & Phone", icon: Wifi, amount: 134.99, budget: 150, color: "#14B8A6" },
];

const TRANSACTIONS: Transaction[] = [
    { id: 1, name: "Whole Foods Market", category: "Food & Dining", amount: -87.43, date: "Today", time: "2:34 PM", icon: Utensils, reviewed: false },
    { id: 2, name: "Shell Gas Station", category: "Transportation", amount: -52.8, date: "Today", time: "10:15 AM", icon: Car, reviewed: false },
    { id: 3, name: "Netflix", category: "Entertainment", amount: -15.99, date: "Yesterday", time: "12:00 AM", icon: Sparkles, reviewed: true },
    { id: 4, name: "Employer Direct Deposit", category: "Income", amount: 3842.5, date: "Yesterday", time: "6:00 AM", icon: DollarSign, reviewed: true },
    { id: 5, name: "Target", category: "Shopping", amount: -134.67, date: "Feb 6", time: "3:22 PM", icon: ShoppingBag, reviewed: true },
    { id: 6, name: "Gym Membership", category: "Health", amount: -49.99, date: "Feb 5", time: "12:00 AM", icon: Dumbbell, reviewed: true },
    { id: 7, name: "AT&T", category: "Internet & Phone", amount: -89.99, date: "Feb 5", time: "12:00 AM", icon: Wifi, reviewed: true },
    { id: 8, name: "Uber", category: "Transportation", amount: -23.45, date: "Feb 4", time: "8:12 PM", icon: Car, reviewed: false },
    { id: 9, name: "Amazon", category: "Shopping", amount: -67.89, date: "Feb 3", time: "11:05 AM", icon: ShoppingBag, reviewed: true },
    { id: 10, name: "Starbucks", category: "Food & Dining", amount: -6.75, date: "Feb 3", time: "7:30 AM", icon: Utensils, reviewed: true },
];

const UPCOMING: UpcomingBill[] = [
    { name: "Rent", amount: 2100, date: "Feb 15", daysLeft: 6 },
    { name: "Car Insurance", amount: 156, date: "Feb 18", daysLeft: 9 },
    { name: "Spotify", amount: 10.99, date: "Feb 20", daysLeft: 11 },
    { name: "Student Loan", amount: 350, date: "Feb 22", daysLeft: 13 },
];

const DAILY_SPENDING: DailySpend[] = Array.from({ length: 9 }, (_, i) => ({
    day: i + 1,
    actual: Math.round((200 + Math.random() * 300) * 100) / 100,
    ideal: Math.round(((4219.89 / 28) * (i + 1)) * 100) / 100,
}));

const MONTHLY_NET_WORTH: MonthlyNetWorth[] = [
    { month: "Aug", value: 118200 },
    { month: "Sep", value: 119800 },
    { month: "Oct", value: 121450 },
    { month: "Nov", value: 124100 },
    { month: "Dec", value: 126300 },
    { month: "Jan", value: 127800 },
    { month: "Feb", value: 128435.93 },
];

// ─── Spending Progress Chart (D3) ──────────────────────────────────
function SpendingChart({ data, budget }: { data: DailySpend[]; budget: number }) {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dims, setDims] = useState({ width: 400, height: 200 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const obs = new ResizeObserver((entries) => {
            for (const e of entries) {
                setDims({ width: e.contentRect.width, height: 200 });
            }
        });
        obs.observe(container);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!svgRef.current || !data.length) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 20, right: 16, bottom: 30, left: 16 };
        const w = dims.width - margin.left - margin.right;
        const h = dims.height - margin.top - margin.bottom;
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear().domain([1, 28]).range([0, w]);
        const maxVal = d3.max(data, (d) => d.actual);
        const maxY = Math.max(budget, (maxVal ?? 0) * 1.2);
        const y = d3.scaleLinear().domain([0, maxY]).range([h, 0]);

        // Grid lines
        const ticks = y.ticks(4);
        ticks.forEach((t) => {
            g.append("line")
                .attr("x1", 0).attr("x2", w)
                .attr("y1", y(t)).attr("y2", y(t))
                .attr("stroke", "rgba(255,255,255,0.06)")
                .attr("stroke-dasharray", "4,4");
        });

        // Budget line
        g.append("line")
            .attr("x1", 0).attr("x2", w)
            .attr("y1", y(budget)).attr("y2", y(budget))
            .attr("stroke", "rgba(239,68,68,0.4)")
            .attr("stroke-dasharray", "6,4")
            .attr("stroke-width", 1.5);
        g.append("text")
            .attr("x", w).attr("y", y(budget) - 6)
            .attr("text-anchor", "end")
            .attr("fill", "rgba(239,68,68,0.6)")
            .attr("font-size", 10)
            .text("Budget");

        // Ideal line
        const idealLine = d3.line<DailySpend>()
            .x((d) => x(d.day))
            .y((d) => y(d.ideal))
            .curve(d3.curveMonotoneX);
        g.append("path")
            .datum(data)
            .attr("d", idealLine)
            .attr("fill", "none")
            .attr("stroke", "rgba(255,255,255,0.15)")
            .attr("stroke-width", 2)
            .attr("stroke-dasharray", "6,4");

        // Cumulative actual
        let cumulative = 0;
        const cumulativeData: CumulativePoint[] = data.map((d) => {
            cumulative += d.actual;
            return { day: d.day, cumActual: cumulative };
        });

        // Area gradient
        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient").attr("id", "spendGrad").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 1);
        gradient.append("stop").attr("offset", "0%").attr("stop-color", "#14b8a6").attr("stop-opacity", 0.3);
        gradient.append("stop").attr("offset", "100%").attr("stop-color", "#14b8a6").attr("stop-opacity", 0);

        const area = d3.area<CumulativePoint>()
            .x((d) => x(d.day))
            .y0(h)
            .y1((d) => y(d.cumActual))
            .curve(d3.curveMonotoneX);
        g.append("path").datum(cumulativeData).attr("d", area).attr("fill", "url(#spendGrad)");

        const line = d3.line<CumulativePoint>()
            .x((d) => x(d.day))
            .y((d) => y(d.cumActual))
            .curve(d3.curveMonotoneX);
        g.append("path")
            .datum(cumulativeData)
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "#14b8a6")
            .attr("stroke-width", 2.5);

        // Current dot
        const last = cumulativeData[cumulativeData.length - 1];
        if (last) {
            g.append("circle").attr("cx", x(last.day)).attr("cy", y(last.cumActual)).attr("r", 5).attr("fill", "#14b8a6");
            g.append("circle").attr("cx", x(last.day)).attr("cy", y(last.cumActual)).attr("r", 8).attr("fill", "#14b8a6").attr("opacity", 0.3);
        }

        // X axis labels
        [1, 7, 14, 21, 28].forEach((d) => {
            g.append("text")
                .attr("x", x(d)).attr("y", h + 20)
                .attr("text-anchor", "middle")
                .attr("fill", "rgba(255,255,255,0.3)")
                .attr("font-size", 10)
                .text(`${d}`);
        });
    }, [data, budget, dims]);

    return (
        <div ref={containerRef} className="w-full">
            <svg ref={svgRef} width={dims.width} height={dims.height} />
        </div>
    );
}

// ─── Net Worth Chart ────────────────────────────────────────────────
function NetWorthChart({ data }: { data: MonthlyNetWorth[] }) {
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dims, setDims] = useState({ width: 400, height: 160 });

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const obs = new ResizeObserver((entries) => {
            for (const e of entries) {
                setDims({ width: e.contentRect.width, height: 160 });
            }
        });
        obs.observe(container);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!svgRef.current || !data.length) return;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const margin = { top: 10, right: 16, bottom: 24, left: 16 };
        const w = dims.width - margin.left - margin.right;
        const h = dims.height - margin.top - margin.bottom;
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scalePoint().domain(data.map((d) => d.month)).range([0, w]).padding(0.1);

        const minVal = d3.min(data, (d) => d.value) ?? 0;
        const maxVal = d3.max(data, (d) => d.value) ?? 0;
        const y = d3.scaleLinear()
            .domain([minVal * 0.97, maxVal * 1.01])
            .range([h, 0]);

        const defs = svg.append("defs");
        const grad = defs.append("linearGradient").attr("id", "nwGrad").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 1);
        grad.append("stop").attr("offset", "0%").attr("stop-color", "#3B82F6").attr("stop-opacity", 0.25);
        grad.append("stop").attr("offset", "100%").attr("stop-color", "#3B82F6").attr("stop-opacity", 0);

        const area = d3.area<MonthlyNetWorth>()
            .x((d) => x(d.month) ?? 0)
            .y0(h)
            .y1((d) => y(d.value))
            .curve(d3.curveMonotoneX);
        g.append("path").datum(data).attr("d", area).attr("fill", "url(#nwGrad)");

        const line = d3.line<MonthlyNetWorth>()
            .x((d) => x(d.month) ?? 0)
            .y((d) => y(d.value))
            .curve(d3.curveMonotoneX);
        g.append("path").datum(data).attr("d", line).attr("fill", "none").attr("stroke", "#3B82F6").attr("stroke-width", 2.5);

        const last = data[data.length - 1];
        if (last) {
            const lastX = x(last.month) ?? 0;
            g.append("circle").attr("cx", lastX).attr("cy", y(last.value)).attr("r", 4).attr("fill", "#3B82F6");
            g.append("circle").attr("cx", lastX).attr("cy", y(last.value)).attr("r", 7).attr("fill", "#3B82F6").attr("opacity", 0.3);
        }

        data.forEach((d) => {
            const xPos = x(d.month) ?? 0;
            g.append("text")
                .attr("x", xPos).attr("y", h + 16)
                .attr("text-anchor", "middle")
                .attr("fill", "rgba(255,255,255,0.3)")
                .attr("font-size", 10)
                .text(d.month);
        });
    }, [data, dims]);

    return (
        <div ref={containerRef} className="w-full">
            <svg ref={svgRef} width={dims.width} height={dims.height} />
        </div>
    );
}

// ─── Category Bar ───────────────────────────────────────────────────
function CategoryBar({ category, animate }: { category: Category; animate: boolean }) {
    const pct = Math.min((category.amount / category.budget) * 100, 100);
    const overBudget = category.amount > category.budget;
    const Icon = category.icon;

    return (
        <div className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-white/3 cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ backgroundColor: `${category.color}18` }}>
                <Icon size={16} style={{ color: category.color }} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-zinc-200 font-medium truncate">{category.name}</span>
                    <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-zinc-100">${category.amount.toFixed(0)}</span>
                        <span className="text-xs text-zinc-500">/ ${category.budget}</span>
                    </div>
                </div>
                <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                            width: animate ? `${pct}%` : "0%",
                            backgroundColor: overBudget ? "#EF4444" : category.color,
                            opacity: overBudget ? 1 : 0.8,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

// ─── Transaction Row ────────────────────────────────────────────────
function TransactionRow({ tx }: { tx: Transaction }) {
    const Icon = tx.icon;
    const isIncome = tx.amount > 0;
    return (
        <div className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all hover:bg-white/3 cursor-pointer">
            <div className="relative">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isIncome ? "bg-emerald-500/10" : "bg-white/6"}`}>
                    <Icon size={16} className={isIncome ? "text-emerald-400" : "text-zinc-400"} />
                </div>
                {!tx.reviewed && (
                    <div className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-blue-500 ring-2 ring-[#0f0f12]" />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-200 truncate">{tx.name}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{tx.category} · {tx.time}</p>
            </div>
            <div className="text-right">
                <p className={`text-sm font-semibold tabular-nums ${isIncome ? "text-emerald-400" : "text-zinc-200"}`}>
                    {isIncome ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </p>
            </div>
        </div>
    );
}

// ─── Sidebar Nav Item ───────────────────────────────────────────────
function NavItem({ icon: Icon, label, active = false, badge }: { icon: LucideIcon; label: string; active?: boolean; badge?: string | number }) {
    return (
        <button
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                    ? "bg-white/8 text-white"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/4"
            }`}
        >
            <Icon size={18} className={active ? "text-teal-400" : ""} />
            <span className="flex-1 text-left">{label}</span>
            {badge && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500/20 px-1.5 text-xs font-bold text-blue-400">
          {badge}
        </span>
            )}
        </button>
    );
}

// ─── Main Dashboard ─────────────────────────────────────────────────
export default function FinWiseDashboard() {
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [animate, setAnimate] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const t = setTimeout(() => setAnimate(true), 300);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(interval);
    }, []);

    const netWorth = ACCOUNTS.reduce((s, a) => s + a.balance, 0);
    const totalSpent = CATEGORIES.reduce((s, c) => s + c.amount, 0);
    const totalBudget = CATEGORIES.reduce((s, c) => s + c.budget, 0);
    const freeToSpend = totalBudget - totalSpent;
    const spendPct = (totalSpent / totalBudget) * 100;
    const unreviewedCount = TRANSACTIONS.filter((t) => !t.reviewed).length;

    const greeting = (() => {
        const h = currentTime.getHours();
        if (h < 12) return "Good morning";
        if (h < 17) return "Good afternoon";
        return "Good evening";
    })();

    // Group transactions by date
    const txGroups: Record<string, Transaction[]> = {};
    TRANSACTIONS.forEach((tx) => {
        if (!txGroups[tx.date]) txGroups[tx.date] = [];
        txGroups[tx.date].push(tx);
    });

    return (
        <div className="flex h-screen overflow-hidden" style={{ background: "#0a0a0d", fontFamily: "'DM Sans', system-ui, sans-serif" }}>

            {/* ─── Sidebar ─────────────────────────────────────── */}
            <aside className="hidden lg:flex w-64 flex-col border-r border-white/6 bg-[#0f0f12] px-4 py-6">
                <div className="flex items-center gap-2.5 px-3 mb-8">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-teal-400 to-cyan-500">
                        <TrendingUp size={16} className="text-white" />
                    </div>
                    <span className="text-lg font-bold text-white tracking-tight">FinWise</span>
                </div>

                <nav className="flex-1 space-y-1">
                    <NavItem icon={BarChart3} label="Dashboard" active />
                    <NavItem icon={ArrowRight} label="Transactions" badge={unreviewedCount} />
                    <NavItem icon={PieChart} label="Budgets" />
                    <NavItem icon={LineChart} label="Cash Flow" />
                    <NavItem icon={Wallet} label="Accounts" />
                    <NavItem icon={RefreshCw} label="Recurring" />
                    <NavItem icon={Target} label="Goals" />
                    <NavItem icon={PiggyBank} label="Investments" />
                </nav>

                <div className="space-y-1 border-t border-white/6 pt-4">
                    <NavItem icon={Bell} label="Notifications" badge="3" />
                    <NavItem icon={Settings} label="Settings" />
                    <NavItem icon={LogOut} label="Sign Out" />
                </div>
            </aside>

            {/* ─── Main Content ────────────────────────────────── */}
            <main className="flex-1 overflow-y-auto">
                <header className="sticky top-0 z-10 flex items-center justify-between border-b border-white/6 bg-[#0a0a0d]/80 px-6 py-4 backdrop-blur-xl">
                    <div>
                        <h1 className="text-xl font-bold text-white">{greeting}, Alex</h1>
                        <p className="text-xs text-zinc-500 mt-0.5">
                            {currentTime.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/6 text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                            <Search size={16} />
                        </button>
                        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/6 text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
                            <Bell size={16} />
                            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
                        </button>
                        <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 text-sm font-bold text-white cursor-pointer">
                            A
                        </div>
                    </div>
                </header>

                <div className="px-6 py-6 space-y-6 max-w-7xl mx-auto">
                    {/* ─── Row 1: Overview Cards ──────────────────── */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Net Worth */}
                        <div className="rounded-2xl border border-white/6 bg-[#0f0f12] p-5 md:col-span-1">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Net Worth</span>
                                <button onClick={() => setBalanceVisible(!balanceVisible)} className="text-zinc-500 hover:text-zinc-300 transition-colors">
                                    {balanceVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                                </button>
                            </div>
                            <p className="text-3xl font-bold text-white tracking-tight tabular-nums">
                                {balanceVisible ? `$${netWorth.toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "••••••"}
                            </p>
                            <div className="flex items-center gap-1.5 mt-2">
                                <div className="flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5">
                                    <ArrowUpRight size={12} className="text-emerald-400" />
                                    <span className="text-xs font-semibold text-emerald-400">+2.1%</span>
                                </div>
                                <span className="text-xs text-zinc-500">vs last month</span>
                            </div>
                        </div>

                        {/* Free to Spend */}
                        <div className="rounded-2xl border border-white/6 bg-[#0f0f12] p-5">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Free to Spend</span>
                                <span className="text-xs text-zinc-500">Feb 2026</span>
                            </div>
                            <p className="text-3xl font-bold text-teal-400 tracking-tight tabular-nums">
                                ${freeToSpend.toFixed(2)}
                            </p>
                            <div className="mt-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-zinc-500">${totalSpent.toFixed(0)} spent</span>
                                    <span className="text-xs text-zinc-500">${totalBudget} budget</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/6 overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-linear-to-r from-teal-500 to-teal-400 transition-all duration-1000 ease-out"
                                        style={{ width: animate ? `${spendPct}%` : "0%" }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Income vs Spending */}
                        <div className="rounded-2xl border border-white/6 bg-[#0f0f12] p-5">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Income vs Spending</span>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                            <span className="text-xs text-zinc-400">Income</span>
                                        </div>
                                        <span className="text-sm font-semibold text-zinc-200 tabular-nums">$7,685.00</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                                        <div className="h-full rounded-full bg-emerald-400/80 transition-all duration-1000 ease-out" style={{ width: animate ? "100%" : "0%" }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                                            <span className="text-xs text-zinc-400">Spending</span>
                                        </div>
                                        <span className="text-sm font-semibold text-zinc-200 tabular-nums">${totalSpent.toFixed(2)}</span>
                                    </div>
                                    <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                                        <div className="h-full rounded-full bg-rose-400/80 transition-all duration-1000 ease-out" style={{ width: animate ? `${(totalSpent / 7685) * 100}%` : "0%" }} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2 border-t border-white/4">
                                    <span className="text-xs text-zinc-500">Net savings</span>
                                    <span className="text-sm font-bold text-emerald-400 tabular-nums">+${(7685 - totalSpent).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ─── Row 2: Spending Chart + Categories ────── */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                        <div className="lg:col-span-3 rounded-2xl border border-white/6 bg-[#0f0f12] p-5">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h3 className="text-sm font-semibold text-white">Spending Progress</h3>
                                    <p className="text-xs text-zinc-500 mt-0.5">You&apos;re on track this month</p>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-zinc-500">
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-0.5 w-4 bg-teal-500 rounded-full" />
                                        <span>Actual</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-0.5 w-4 bg-white/20 rounded-full border-dashed border border-white/30" />
                                        <span>Ideal</span>
                                    </div>
                                </div>
                            </div>
                            <SpendingChart data={DAILY_SPENDING} budget={totalBudget} />
                        </div>

                        <div className="lg:col-span-2 rounded-2xl border border-white/6 bg-[#0f0f12] p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-white">Categories</h3>
                                <button className="text-xs text-teal-400 hover:text-teal-300 font-medium transition-colors">View all</button>
                            </div>
                            <div className="space-y-0.5 overflow-y-auto max-h-55 scrollbar-thin">
                                {CATEGORIES.map((cat) => (
                                    <CategoryBar key={cat.name} category={cat} animate={animate} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ─── Row 3: Transactions + Right Column ──── */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                        <div className="lg:col-span-3 rounded-2xl border border-white/6 bg-[#0f0f12] p-5">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-semibold text-white">Recent Transactions</h3>
                                    {unreviewedCount > 0 && (
                                        <span className="flex items-center gap-1 rounded-full bg-blue-500/15 px-2 py-0.5 text-xs font-medium text-blue-400">
                      {unreviewedCount} to review
                    </span>
                                    )}
                                </div>
                                <button className="text-xs text-teal-400 hover:text-teal-300 font-medium transition-colors">See all</button>
                            </div>

                            {Object.entries(txGroups).map(([date, txs]) => (
                                <div key={date} className="mb-2">
                                    <p className="text-xs font-medium text-zinc-500 px-3 py-1.5">{date}</p>
                                    {txs.map((tx) => (
                                        <TransactionRow key={tx.id} tx={tx} />
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="lg:col-span-2 space-y-4">
                            {/* Net Worth Chart */}
                            <div className="rounded-2xl border border-white/6 bg-[#0f0f12] p-5">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-sm font-semibold text-white">Net Worth</h3>
                                    <span className="text-xs text-zinc-500">7 months</span>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-white tabular-nums">
                    ${netWorth.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                                    <span className="flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-xs font-semibold text-emerald-400">
                    <ArrowUpRight size={10} />
                    +8.6%
                  </span>
                                </div>
                                <NetWorthChart data={MONTHLY_NET_WORTH} />
                            </div>

                            {/* Upcoming Bills */}
                            <div className="rounded-2xl border border-white/6 bg-[#0f0f12] p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-white">Upcoming</h3>
                                    <Clock size={14} className="text-zinc-500" />
                                </div>
                                <div className="space-y-3">
                                    {UPCOMING.map((bill) => (
                                        <div key={bill.name} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/6">
                                                    <Calendar size={14} className="text-zinc-400" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-zinc-200">{bill.name}</p>
                                                    <p className="text-xs text-zinc-500">{bill.date} · {bill.daysLeft}d left</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-semibold text-zinc-200 tabular-nums">
                        ${bill.amount.toFixed(2)}
                      </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Accounts Summary */}
                            <div className="rounded-2xl border border-white/6 bg-[#0f0f12] p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-white">Accounts</h3>
                                    <button className="flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300 font-medium transition-colors">
                                        <Plus size={12} /> Link
                                    </button>
                                </div>
                                <div className="space-y-2.5">
                                    {ACCOUNTS.map((acct) => (
                                        <div key={acct.id} className="flex items-center gap-3 group cursor-pointer hover:bg-white/3 rounded-lg px-2 py-1.5 -mx-2 transition-all">
                                            <div className="h-8 w-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${acct.color}18` }}>
                                                {acct.type === "credit" ? (
                                                    <CreditCard size={14} style={{ color: acct.color }} />
                                                ) : acct.type === "investment" ? (
                                                    <TrendingUp size={14} style={{ color: acct.color }} />
                                                ) : acct.type === "savings" ? (
                                                    <PiggyBank size={14} style={{ color: acct.color }} />
                                                ) : (
                                                    <Wallet size={14} style={{ color: acct.color }} />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-zinc-200 truncate">{acct.name}</p>
                                                <p className="text-xs text-zinc-500">····{acct.last4}</p>
                                            </div>
                                            <span className={`text-sm font-semibold tabular-nums ${acct.balance < 0 ? "text-rose-400" : "text-zinc-200"}`}>
                        {acct.balance < 0 ? "-" : ""}${Math.abs(acct.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                      </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}