import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Chrome } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';

const DeliveryLogin = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, isLoading, user } = useAuth();
  const { toast } = useToast();
  const [isAuthorizedDeliveryAgent, setIsAuthorizedDeliveryAgent] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(false);

  useEffect(() => {
    if (user?.email) {
      checkDeliveryAgentAccess();
    }
  }, [user?.email]);

  const checkDeliveryAgentAccess = async () => {
    if (!user?.email) return;
    
    setCheckingAuth(true);
    try {
      const { data, error } = await supabase
        .rpc('is_authorized_delivery_agent', { user_email: user.email });

      if (error) {
        console.error("Error checking delivery agent access:", error);
        setIsAuthorizedDeliveryAgent(false);
        toast({
          title: "Access Denied",
          description: "Your email is not authorized for delivery agent access.",
          variant: "destructive",
        });
      } else {
        setIsAuthorizedDeliveryAgent(data || false);
        if (data) {
          navigate('/delivery');
        } else {
          toast({
            title: "Access Denied",
            description: "Your email is not authorized for delivery agent access.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Error checking delivery agent access:", error);
      setIsAuthorizedDeliveryAgent(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle('/delivery');
    } catch (error) {
      toast({
        title: "Sign In Failed",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading || checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Truck className="h-12 w-12 text-green-600 mx-auto animate-spin" />
          <p className="mt-4 text-gray-600">
            {checkingAuth ? "Checking access..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Truck className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            Ram Dairy Farm
          </CardTitle>
          <CardDescription>
            Delivery Agent Portal Access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            Sign in with your authorized Google account to access the delivery portal.
          </p>
          
          <Button 
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center space-x-2"
            size="lg"
          >
            <Chrome className="h-5 w-5" />
            <span>Continue with Google</span>
          </Button>
          
          <div className="text-xs text-gray-500 text-center">
            Only authorized delivery agent email addresses can access this portal.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliveryLogin;