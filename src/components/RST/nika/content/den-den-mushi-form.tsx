import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Textarea } from '../../../ui/textarea';
import { Send, Check, Phone } from 'lucide-react';

export function DenDenMushiForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isRinging, setIsRinging] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRinging(true);

    // Simulate API call
    setTimeout(() => {
      setIsRinging(false);
      setIsSent(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSent(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="relative">
      {/* Den Den Mushi Shell */}
      <div className="bg-gradient-to-br from-purple-900/60 to-purple-800/60 backdrop-blur-sm border-2 border-purple-500/40 rounded-2xl p-8 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
        {/* Decorative Snail Shell Pattern */}
        <div className="absolute top-4 right-4 w-24 h-24 opacity-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <svg viewBox="0 0 100 100" className="text-purple-300">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </motion.div>
        </div>

        {/* Priority Badge */}
        <div className="absolute top-6 left-6 bg-yellow-400 text-purple-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          ⚡ HIGH PRIORITY
        </div>

        <AnimatePresence mode="wait">
          {isSent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-4"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl text-yellow-300 mb-2" style={{ fontFamily: 'serif' }}>
                Message Received!
              </h3>
              <p className="text-amber-100/80 text-center">
                Your Den Den Mushi call has been connected. 
                <br />
                The captain will respond soon.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-6 mt-8"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-amber-100">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Monkey D. Luffy"
                    className="bg-purple-900/50 border-purple-500/50 text-white placeholder:text-purple-300/50 focus:border-yellow-400"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-amber-100">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="luffy@strawhat.com"
                    className="bg-purple-900/50 border-purple-500/50 text-white placeholder:text-purple-300/50 focus:border-yellow-400"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject" className="text-amber-100">
                  Subject
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="I found the One Piece!"
                  className="bg-purple-900/50 border-purple-500/50 text-white placeholder:text-purple-300/50 focus:border-yellow-400"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-amber-100">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Share your thoughts, questions, or collaboration ideas..."
                  className="bg-purple-900/50 border-purple-500/50 text-white placeholder:text-purple-300/50 focus:border-yellow-400 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isRinging}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-purple-900 font-bold text-lg py-6 relative overflow-hidden"
              >
                {isRinging ? (
                  <>
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="mr-2"
                    >
                      <Phone className="w-5 h-5" />
                    </motion.div>
                    Ringing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Den Den Mushi Call
                  </>
                )}

                {/* Animated Background on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                  whileHover={{ opacity: 0.2, x: ['0%', '200%'] }}
                  transition={{ duration: 0.8 }}
                />
              </Button>

              <p className="text-xs text-center text-amber-100/60 italic">
                "Puru puru puru puru... Gacha!"
              </p>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Ringing Animation Overlay */}
        <AnimatePresence>
          {isRinging && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-4 border-yellow-400 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0.8, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
