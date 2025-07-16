-- Add delivery_agent column to customers table
ALTER TABLE public.customers 
ADD COLUMN delivery_agent TEXT;