
-- Create customers table
CREATE TABLE public.customers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  quantity INTEGER,
  unit TEXT,
  contact_number TEXT,
  area TEXT,
  address TEXT,
  geopin TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cows table based on your original specification
CREATE TABLE public.cows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('MALE', 'FEMALE')),
  age INTEGER,
  lactation BOOLEAN DEFAULT FALSE,
  mother TEXT,
  father TEXT,
  origine TEXT,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  order_date DATE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'cancelled')),
  item TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feed management table
CREATE TABLE public.feed_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cow_id UUID REFERENCES public.cows(id) ON DELETE CASCADE,
  vaccine TEXT,
  deworming TEXT,
  disease TEXT,
  medical_note TEXT,
  grower_below_6_months DECIMAL,
  grower_above_6_months DECIMAL,
  tuver_bhusu DECIMAL,
  ghau_bhusu DECIMAL,
  chana_bhusu DECIMAL,
  juvar_bajari DECIMAL,
  sheradi_kucha DECIMAL,
  saileg DECIMAL,
  makai DECIMAL,
  bajari_juvar DECIMAL,
  bajari_sheradi DECIMAL,
  bajari_makai DECIMAL,
  vegetable_waste DECIMAL,
  kapas_khod DECIMAL,
  makai_khod DECIMAL,
  readymade_feed DECIMAL,
  milk_output DECIMAL,
  record_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feed_records ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access (you'll need authentication later)
CREATE POLICY "Allow all operations" ON public.customers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON public.cows FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON public.orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON public.feed_records FOR ALL USING (true) WITH CHECK (true);
