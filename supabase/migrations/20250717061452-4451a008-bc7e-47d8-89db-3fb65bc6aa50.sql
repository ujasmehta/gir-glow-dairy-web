-- Add delivery_agent column to orders table
ALTER TABLE public.orders 
ADD COLUMN delivery_agent TEXT;

-- Update existing orders with delivery_agent from customers table
UPDATE public.orders 
SET delivery_agent = customers.delivery_agent
FROM public.customers 
WHERE orders.customer_id = customers.id;