 import Link from "next/link";
import Image from "next/image";
 import {AuthProvider} from "@/contexts/AuthContext";

const Layout = ({children}: {children : React.ReactNode}) => {
    return (
        <main className="auth-layout">
            <section className="auth-left-section scrollbar-hide-default">
                <Link href="/" className="auth-logo">
                    <Image src="/assets/icons/logo.svg" alt="FinWise logo" width={140} height={32} />
                </Link>

                <div className="pb-6 lg:pb-8 flex-1">
                    {children}
                </div>
            </section>
        </main>
    )
}
export default Layout
