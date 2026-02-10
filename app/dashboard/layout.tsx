import {AuthProvider} from "@/contexts/AuthContext";


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="min-h-screen">
            {children}
        </main>
    )
}
export default Layout