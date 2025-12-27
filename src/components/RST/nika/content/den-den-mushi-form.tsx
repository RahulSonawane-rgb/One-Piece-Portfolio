import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Send, Check, Phone } from 'lucide-react';
import { submitContactForm } from '@/api/contact';
import { useToast } from '@/hooks/useToast';

interface DenDenMushiFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function DenDenMushiForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<DenDenMushiFormData>();
  
  const [isRinging, setIsRinging] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: DenDenMushiFormData) => {
    setIsRinging(true);

    try {
      await submitContactForm(data);
      
      setIsSent(true);
      reset();
      
      toast({
        title: 'Gacha! Connection Made!',
        description: 'Your voice has reached the captain.',
        className: "bg-purple-900 border-purple-500 text-white"
      });

      setTimeout(() => setIsSent(false), 3000);

    } catch (error) {
      toast({
        title: 'Puru Puru... Disconnected',
        description: error instanceof Error ? error.message : 'Signal lost due to bad weather',
        variant: 'destructive',
      });
    } finally {
      setIsRinging(false);
    }
  };

  return (
    <div className="relative w-full">
      {/* Den Den Mushi Shell Container */}
      <div className="bg-gradient-to-br from-purple-900/60 to-purple-800/60 backdrop-blur-sm border-2 border-purple-500/40 rounded-2xl p-4 md:p-8 shadow-2xl shadow-purple-500/20 relative overflow-hidden">
        
        {/* Decorative Snail Shell Pattern - Responsive Size */}
        <div className="absolute top-2 right-2 md:top-4 md:right-4 w-16 h-16 md:w-24 md:h-24 opacity-10 pointer-events-none">
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
        <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-yellow-400 text-purple-900 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-lg">
          ⚡ BUSTER CALL PRIORITY
        </div>

        <AnimatePresence mode="wait">
          {isSent ? (
            /* SUCCESS VIEW */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex flex-col items-center justify-center py-8 md:py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                className="w-16 h-16 md:w-20 md:h-20 bg-green-500 rounded-full flex items-center justify-center mb-4"
              >
                <Check className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </motion.div>
              <h3 className="text-xl md:text-2xl text-yellow-300 mb-2 text-center" style={{ fontFamily: 'serif' }}>
                Gacha! Message Received!
              </h3>
              <p className="text-sm md:text-base text-amber-100/80 text-center px-2">
                Your Den Den Mushi call has been connected. 
                <br className="hidden md:block" />
                The captain will respond soon.
              </p>
            </motion.div>
          ) : (
            /* FORM VIEW */
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-6 mt-8 md:mt-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div>
                  <Label htmlFor="name" className="text-amber-100 text-xs md:text-sm">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    })}
                    placeholder="Monkey D. Luffy"
                    className="bg-purple-900/50 border-purple-500/50 text-white placeholder:text-purple-300/50 focus:border-yellow-400 focus:ring-yellow-400 h-10 md:h-12"
                  />
                  {errors.name && <p className="text-red-400 text-xs mt-1 font-bold">{errors.name.message}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-amber-100 text-xs md:text-sm">
                    Den Den Mushi (Email)
                  </Label>
                  <Input
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    placeholder="luffy@strawhat.com"
                    className="bg-purple-900/50 border-purple-500/50 text-white placeholder:text-purple-300/50 focus:border-yellow-400 focus:ring-yellow-400 h-10 md:h-12"
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1 font-bold">{errors.email.message}</p>}
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <Label htmlFor="subject" className="text-amber-100 text-xs md:text-sm">
                  Subject
                </Label>
                <Input
                  id="subject"
                  {...register('subject', {
                    required: 'Subject is required',
                    minLength: { value: 5, message: 'Subject must be at least 5 characters' },
                  })}
                  placeholder="I found the One Piece!"
                  className="bg-purple-900/50 border-purple-500/50 text-white placeholder:text-purple-300/50 focus:border-yellow-400 focus:ring-yellow-400 h-10 md:h-12"
                />
                {errors.subject && <p className="text-red-400 text-xs mt-1 font-bold">{errors.subject.message}</p>}
              </div>

              {/* Message Field */}
              <div>
                <Label htmlFor="message" className="text-amber-100 text-xs md:text-sm">
                  Your Message
                </Label>
                <Textarea
                  id="message"
                  {...register('message', {
                    required: 'Message is required',
                    minLength: { value: 10, message: 'Message must be at least 10 characters' },
                  })}
                  rows={5}
                  placeholder="Share your thoughts, questions, or collaboration ideas..."
                  className="bg-purple-900/50 border-purple-500/50 text-white placeholder:text-purple-300/50 focus:border-yellow-400 focus:ring-yellow-400 resize-none"
                />
                {errors.message && <p className="text-red-400 text-xs mt-1 font-bold">{errors.message.message}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isRinging}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-purple-900 font-bold text-base md:text-lg py-5 md:py-6 relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-yellow-500/20"
              >
                {isRinging ? (
                  <>
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="mr-2"
                    >
                      <Phone className="w-4 h-4 md:w-5 md:h-5" />
                    </motion.div>
                    Ringing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 md:w-5 md:h-5 mr-2" />
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

              <p className="text-[10px] md:text-xs text-center text-amber-100/60 italic">
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