import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="absolute top-0 z-20 w-full border-b border-white/10 bg-transparent backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        FinWise
                    </h1>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href="/sign-in"
                        className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/sign-up"
                        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </nav>
    )
}
export default Navbar
