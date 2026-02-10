import Link from "next/link";
import {TrendingUp} from "lucide-react";

const Navbar = () => {
    return (
        <nav className="absolute top-0 z-20 w-full">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-teal-400 to-cyan-500">
                        <TrendingUp size={16} className="text-white" />
                    </div>
                    <span className="text-xl font-extrabold text-white tracking-tight">
                        FinWise
                    </span>
                </Link>
                <div className="flex items-center gap-2">
                    <Link
                        href="/sign-in"
                        className="rounded-full px-4 py-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white">
                        Sign In
                    </Link>
                    <Link
                        href="/sign-up"
                        className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-200">
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    )
}
export default Navbar