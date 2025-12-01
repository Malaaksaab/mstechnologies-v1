-- Add policies for admin CRUD operations on all service tables
-- Note: These policies allow all operations for now. In production, you should restrict to admin users only.

-- Software Services: Allow all operations
CREATE POLICY "Allow insert on software_services" 
ON public.software_services 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow update on software_services" 
ON public.software_services 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow delete on software_services" 
ON public.software_services 
FOR DELETE 
USING (true);

-- Social Media Services: Allow all operations
CREATE POLICY "Allow insert on social_media_services" 
ON public.social_media_services 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow update on social_media_services" 
ON public.social_media_services 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow delete on social_media_services" 
ON public.social_media_services 
FOR DELETE 
USING (true);

-- Digital Services: Allow all operations
CREATE POLICY "Allow insert on digital_services" 
ON public.digital_services 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow update on digital_services" 
ON public.digital_services 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow delete on digital_services" 
ON public.digital_services 
FOR DELETE 
USING (true);

-- Investment Plans: Allow all operations
CREATE POLICY "Allow insert on investment_plans" 
ON public.investment_plans 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow update on investment_plans" 
ON public.investment_plans 
FOR UPDATE 
USING (true);

CREATE POLICY "Allow delete on investment_plans" 
ON public.investment_plans 
FOR DELETE 
USING (true);