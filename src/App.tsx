import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { Layout } from "./components/Layout" 
import { BlankPage } from "./pages/BlankPage"
import { Home } from "./pages/Home"

import { PoneglyphProvider } from '@/context/PoneglyphContext';
import { QuestLog } from '@/components/RST/QuestLog';
import { Laughtale } from '@/pages/Laughtale';
import { ProtectedRoute } from '@/components/ProtectedRoute'; // Import the guard

function App() {
  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <PoneglyphProvider>
          
          <QuestLog />
          
          <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />
            
            {/* --- SECURE ROUTE --- */}
            <Route 
              path="/laughtale" 
              element={
                <ProtectedRoute>
                  <Laughtale />
                </ProtectedRoute>
              } 
            />
            {/* -------------------- */}
            
            <Route path="*" element={<BlankPage />} />
          </Routes>
          
          <Toaster />
        </PoneglyphProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App