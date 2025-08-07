-- Create delivery_agents table for access control
CREATE TABLE public.delivery_agents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  phone TEXT,
  area TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.delivery_agents ENABLE ROW LEVEL SECURITY;

-- Create policies for delivery agents
CREATE POLICY "Delivery agents can view their own profile" 
ON public.delivery_agents 
FOR SELECT 
USING (email = auth.jwt() ->> 'email');

CREATE POLICY "Admins can view all delivery agents" 
ON public.delivery_agents 
FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM public.authorized_admins 
  WHERE email = auth.jwt() ->> 'email'
));

CREATE POLICY "Admins can manage delivery agents" 
ON public.delivery_agents 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.authorized_admins 
  WHERE email = auth.jwt() ->> 'email'
))
WITH CHECK (EXISTS (
  SELECT 1 FROM public.authorized_admins 
  WHERE email = auth.jwt() ->> 'email'
));

-- Create function to check if user is authorized delivery agent
CREATE OR REPLACE FUNCTION public.is_authorized_delivery_agent(user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.delivery_agents 
    WHERE email = user_email AND is_active = true
  );
END;
$function$;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_delivery_agents_updated_at
BEFORE UPDATE ON public.delivery_agents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();