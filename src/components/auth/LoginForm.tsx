import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(email, password, 'user');
      
      if (success) {
        toast({
          title: "Success!",
          description: "You've been logged in successfully.",
          variant: "default",
        });
        
        navigate('/dashboard');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login error",
        description: "An error occurred during login. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          type="email" 
          placeholder="email@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-3">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password" 
          type="password" 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <a href="#" className="text-sm text-wsms-primary hover:underline">
          Forgot password?
        </a>
      </div>
      
      <Button type="submit" className="w-full bg-wsms-primary hover:bg-wsms-primary-dark" disabled={isLoading}>
        {isLoading ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</>
        ) : (
          'Sign in'
        )}
      </Button>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-wsms-primary hover:underline">
            Register now
          </a>
        </p>
      </div>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Log in as:{' '}
          <a href="/police/login" className="text-wsms-primary hover:underline">
            Police Officer
          </a>
          {' | '}
          <a href="/admin/login" className="text-wsms-primary hover:underline">
            Admin
          </a>
        </p>
      </div>
      
      {/* Demo Credentials */}
      <div className="mt-8 p-4 bg-gray-50 rounded-md">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Demo Credentials</h4>
        <div className="text-xs text-gray-500">
          <p><strong>User:</strong> user@example.com / user123</p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
