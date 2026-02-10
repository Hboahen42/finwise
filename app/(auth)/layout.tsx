 import Link from "next/link";
import Image from "next/image";
 import {AuthProvider} from "@/contexts/AuthContext";

const Layout = ({children}: {children : React.ReactNode}) => {
    return (
        <main className="min-h-screen text-gray-400">
            {children}
        </main>
    )
}
export default Layout
