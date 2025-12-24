import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { Layout } from "./components/Layout" 
import { BlankPage } from "./pages/BlankPage"
import { Home } from "./pages/Home"

import { PoneglyphProvider } from '@/context/PoneglyphContext';
import { QuestLog } from '@/components/RST/QuestLog';
import { Laughtale } from '@/pages/Laughtale';
import { ProtectedRoute } from '@/components/ProtectedRoute'; 
import { LoadingScreen } from '@/components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to hide loader
    const handleLoad = () => {
      // Ensure it stays for at least 2.5 seconds for "cool factor"
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback: If window.load takes too long (e.g. 10s), force open
      const fallbackTimer = setTimeout(handleLoad, 10000); 
      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

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
    </>
  );
}

export default App