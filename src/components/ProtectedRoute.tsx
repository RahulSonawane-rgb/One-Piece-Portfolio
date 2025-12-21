import { Navigate } from 'react-router-dom';
import { usePoneglyph } from '@/context/PoneglyphContext';
import { useToast } from '@/hooks/useToast';
import { useEffect } from 'react';

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isGateOpen } = usePoneglyph();
  const { toast } = useToast();

  useEffect(() => {
    if (!isGateOpen) {
      toast({
        title: "ACCESS DENIED",
        description: "You have not deciphered the Poneglyphs yet.",
        variant: "destructive"
      });
    }
  }, [isGateOpen, toast]);

  if (!isGateOpen) {
    // Redirect to Home if locked
    return <Navigate to="/" replace />;
  }

  // Allow access if unlocked
  return children;
}