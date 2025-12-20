import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./components/ui/theme-provider"
import { Toaster } from "./components/ui/toaster"
import { Layout } from "./components/Layout" // Verify this path matches your folder structure (might be ./components/layout/Layout)
import { BlankPage } from "./pages/BlankPage"
import { Home } from "./pages/Home"

function App() {
  return (
    // Changed defaultTheme to "light" so the Map Theme shows first
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="*" element={<BlankPage />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  )
}

export default App