-- Enable realtime for service_bookings to track order status changes
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_bookings;

-- Add payment_methods table for admin-configurable payment options
CREATE TABLE IF NOT EXISTS public.payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL, -- 'domestic' or 'international'
  account_details jsonb NOT NULL DEFAULT '{}',
  instructions text,
  icon_name text DEFAULT 'CreditCard',
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.payment_methods ENABLE ROW LEVEL SECURITY;

-- Policies for payment methods
CREATE POLICY "Anyone can view active payment methods"
ON public.payment_methods FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage payment methods"
ON public.payment_methods FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Add payment_status to service_bookings
ALTER TABLE public.service_bookings 
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_method text,
ADD COLUMN IF NOT EXISTS payment_reference text,
ADD COLUMN IF NOT EXISTS amount numeric,
ADD COLUMN IF NOT EXISTS admin_notes text,
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

-- Allow admins to update bookings
CREATE POLICY "Admins can update bookings"
ON public.service_bookings FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete bookings"
ON public.service_bookings FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default payment methods
INSERT INTO public.payment_methods (name, type, account_details, instructions, icon_name, display_order) VALUES
('JazzCash', 'domestic', '{"account_number": "03XX-XXXXXXX", "account_title": "Your Business Name"}', 'Send payment to the account number and note your ticket ID in the reference.', 'Smartphone', 1),
('Easypaisa', 'domestic', '{"account_number": "03XX-XXXXXXX", "account_title": "Your Business Name"}', 'Send payment via Easypaisa and include your ticket ID in the message.', 'Smartphone', 2),
('Bank Transfer (PKR)', 'domestic', '{"bank_name": "Your Bank", "account_number": "XXXX-XXXX-XXXX", "account_title": "Your Business Name", "iban": "PK00XXXX0000000000000000"}', 'Transfer to the bank account and use your ticket ID as reference.', 'Building2', 3),
('PayPal', 'international', '{"email": "payments@yourbusiness.com"}', 'Send payment to our PayPal email with your ticket ID in the note.', 'Globe', 4),
('Wise', 'international', '{"email": "payments@yourbusiness.com"}', 'Transfer via Wise to our email with your ticket ID as reference.', 'Send', 5),
('Cryptocurrency', 'international', '{"btc_address": "Your BTC Address", "eth_address": "Your ETH Address", "usdt_address": "Your USDT Address"}', 'Send crypto to the appropriate wallet address and save the transaction hash.', 'Bitcoin', 6)
ON CONFLICT DO NOTHING;