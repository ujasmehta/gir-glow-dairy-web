
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Milk, Chrome } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, isLoading, user, isAuthorizedAdmin } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user && isAuthorizedAdmin) {
      navigate('/admin');
    } else if (user && !isAuthorizedAdmin) {
      toast({
        title: "Access Denied",
        description: "Your email is not authorized for admin access.",
        variant: "destructive",
      });
    }
  }, [user, isAuthorizedAdmin, navigate, toast]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      toast({
        title: "Sign In Failed",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Milk className="h-12 w-12 text-green-600 mx-auto animate-spin" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img
  src="/RAMDAIRY_LOGO_white.png"
  alt="Ram Dairy Farm Logo"
  className="h-18 w-40 filter invert sepia saturate-500 hue-rotate-90"
/>
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">
            Ram Dairy Farm
          </CardTitle>
          <CardDescription>
            Admin Portal Access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            Sign in with your authorized Google account to access the admin portal.
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
            Only authorized email addresses can access the admin portal.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
