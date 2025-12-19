import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { ReactNode } from "react"

interface LayoutProps {
  children?: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    // We use 'bg-background' and 'text-foreground' which now map to your 
    // Parchment/Ink colors defined in index.css
    <div className="min-h-screen bg-background text-foreground font-serif relative flex flex-col">
      
      {/* Global Background Texture (Subtle Paper Grain for the whole site) */}
      <div className="fixed inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] z-0"></div>

      <Header />
      
      {/* pt-20 ensures content isn't hidden behind the fixed header */}
      <main className="relative z-10 pt-20 flex-1">
        {children || <Outlet />}
      </main>
      
      <Footer />
    </div>
  )
}