import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { submitContactForm } from '@/api/contact';
import { useToast } from '@/hooks/useToast';
import { Send } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      setSubmitSuccess(true);
      reset();
      toast({
        title: 'Transmission Sent!',
        description: 'Your Den Den Mushi message has reached the ship!',
      });
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      toast({
        title: 'Connection Jammed',
        description: error instanceof Error ? error.message : 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="w-full"
      whileInView={{ scale: 1 }}
      initial={{ scale: 0.98 }}
      transition={{ duration: 0.6 }}
    >
      {submitSuccess && (
        <motion.div
          className="mb-6 p-4 bg-[#d4a017]/20 border-2 border-[#d4a017] rounded text-[#5a3a2a] font-bold text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Message sent! The snail is transmitting! 🐌📶
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Name */}
        <div>
          <label className="block text-[#5a3a2a] font-serif font-bold mb-1 uppercase tracking-wider text-xs">
            Pirate Name
          </label>
          <Input
            {...register('name', {
              required: 'Name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
            placeholder="Monkey D. Luffy"
            className="bg-[#fff] border-2 border-[#5a3a2a]/30 text-[#2a1a0a] placeholder:text-[#5a3a2a]/30 focus:border-[#d4a017] focus:ring-1 focus:ring-[#d4a017] rounded-sm h-12"
          />
          {errors.name && <p className="text-[#d92121] text-xs mt-1 font-bold">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-[#5a3a2a] font-serif font-bold mb-1 uppercase tracking-wider text-xs">
            Den Den Mushi (Email)
          </label>
          <Input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            placeholder="captain@strawhats.com"
            className="bg-[#fff] border-2 border-[#5a3a2a]/30 text-[#2a1a0a] placeholder:text-[#5a3a2a]/30 focus:border-[#d4a017] focus:ring-1 focus:ring-[#d4a017] rounded-sm h-12"
          />
          {errors.email && <p className="text-[#d92121] text-xs mt-1 font-bold">{errors.email.message}</p>}
        </div>

        {/* Subject */}
        <div>
          <label className="block text-[#5a3a2a] font-serif font-bold mb-1 uppercase tracking-wider text-xs">
            Treasure Type (Subject)
          </label>
          <Input
            {...register('subject', {
              required: 'Subject is required',
              minLength: { value: 5, message: 'Subject must be at least 5 characters' },
            })}
            placeholder="Alliance Proposal / Project Inquiry"
            className="bg-[#fff] border-2 border-[#5a3a2a]/30 text-[#2a1a0a] placeholder:text-[#5a3a2a]/30 focus:border-[#d4a017] focus:ring-1 focus:ring-[#d4a017] rounded-sm h-12"
          />
          {errors.subject && <p className="text-[#d92121] text-xs mt-1 font-bold">{errors.subject.message}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="block text-[#5a3a2a] font-serif font-bold mb-1 uppercase tracking-wider text-xs">
            Scroll Content (Message)
          </label>
          <Textarea
            {...register('message', {
              required: 'Message is required',
              minLength: { value: 10, message: 'Message must be at least 10 characters' },
            })}
            placeholder="Write your message here..."
            className="bg-[#fff] border-2 border-[#5a3a2a]/30 text-[#2a1a0a] placeholder:text-[#5a3a2a]/30 focus:border-[#d4a017] focus:ring-1 focus:ring-[#d4a017] rounded-sm min-h-32 resize-none"
          />
          {errors.message && <p className="text-[#d92121] text-xs mt-1 font-bold">{errors.message.message}</p>}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#d92121] hover:bg-[#b01a1a] text-white font-serif font-bold py-6 text-lg rounded shadow-[4px_4px_0px_0px_rgba(90,58,42,1)] hover:translate-y-1 hover:shadow-none transition-all duration-200 border-2 border-[#5a3a2a] uppercase tracking-widest"
        >
          {isSubmitting ? (
            'Transmitting...'
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Send Message
            </>
          )}
        </Button>
      </form>
    </motion.div>
  );
}