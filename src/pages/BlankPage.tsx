import { Hammer, ArrowLeft, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate, useLocation } from "react-router-dom"
import { motion } from "framer-motion"

export function BlankPage() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 bg-[#f0e6d2] relative overflow-hidden">
      
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]"></div>
      
      {/* Background Floating Map Icon */}
      <div className="absolute top-10 right-10 opacity-10 rotate-12">
        <Map className="w-32 h-32 text-[#5a3a2a]" />
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="w-full border-[6px] border-[#5a3a2a] bg-[#fff9e5] shadow-[8px_8px_0px_rgba(90,58,42,0.4)]">
          <CardHeader className="pb-2">
            
            {/* Animated Icon */}
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#5a3a2a] border-4 border-[#d4a017] shadow-lg">
              <motion.div
                animate={{ rotate: [0, -20, 0, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                 <Hammer className="h-12 w-12 text-[#d4a017]" />
              </motion.div>
            </div>
            
            <CardTitle className="text-3xl font-serif font-black text-[#5a3a2a] uppercase tracking-wide text-center">
              Under Construction
            </CardTitle>
            
            <CardDescription className="text-center text-[#8b6f58] font-serif italic text-lg">
              "Suuuuper! But not ready yet!"
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6 text-center">
              <div className="bg-[#f0e6d2] p-4 rounded border-2 border-[#5a3a2a]/20 border-dashed">
                <p className="text-sm text-[#5a3a2a] font-mono">
                  The shipwrights are still hammering away at the <span className="font-bold text-[#d92121]">{location.pathname}</span> deck.
                </p>
                <p className="text-xs text-[#5a3a2a]/60 mt-2">
                  (Please tell the Captain to implement this page.)
                </p>
              </div>
              
              <Button 
                onClick={() => navigate("/")} 
                className="w-full bg-[#d92121] hover:bg-[#b01a1a] text-white font-bold border-2 border-[#5a3a2a] shadow-md py-6 text-lg"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Sail Back to Deck
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}