-- Fix 1: service_bookings - Protect customer PII
DROP POLICY IF EXISTS "Anyone can view bookings" ON service_bookings;

CREATE POLICY "Admins can view all bookings" ON service_bookings
FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view own bookings" ON service_bookings
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Fix 2: software_services - Admin only management
DROP POLICY IF EXISTS "Allow insert on software_services" ON software_services;
DROP POLICY IF EXISTS "Allow update on software_services" ON software_services;
DROP POLICY IF EXISTS "Allow delete on software_services" ON software_services;

CREATE POLICY "Admins can manage software_services" ON software_services
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Fix 3: social_media_services - Admin only management
DROP POLICY IF EXISTS "Allow insert on social_media_services" ON social_media_services;
DROP POLICY IF EXISTS "Allow update on social_media_services" ON social_media_services;
DROP POLICY IF EXISTS "Allow delete on social_media_services" ON social_media_services;

CREATE POLICY "Admins can manage social_media_services" ON social_media_services
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Fix 4: digital_services - Admin only management
DROP POLICY IF EXISTS "Allow insert on digital_services" ON digital_services;
DROP POLICY IF EXISTS "Allow update on digital_services" ON digital_services;
DROP POLICY IF EXISTS "Allow delete on digital_services" ON digital_services;

CREATE POLICY "Admins can manage digital_services" ON digital_services
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Fix 5: investment_plans - Admin only management
DROP POLICY IF EXISTS "Allow insert on investment_plans" ON investment_plans;
DROP POLICY IF EXISTS "Allow update on investment_plans" ON investment_plans;
DROP POLICY IF EXISTS "Allow delete on investment_plans" ON investment_plans;

CREATE POLICY "Admins can manage investment_plans" ON investment_plans
FOR ALL TO authenticated
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));