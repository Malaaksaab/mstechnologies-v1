-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    author_name TEXT DEFAULT 'Admin',
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published posts"
ON public.blog_posts FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can manage all posts"
ON public.blog_posts FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create careers table
CREATE TABLE public.careers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT[],
    benefits TEXT[],
    salary_range TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active careers"
ON public.careers FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins can manage careers"
ON public.careers FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create site_settings table for admin customization
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT NOT NULL UNIQUE,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Admins can manage site settings"
ON public.site_settings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Insert default site settings
INSERT INTO public.site_settings (key, value) VALUES
('company_name', '"Mikky Services"'),
('company_email', '"contact@mikkyservices.com"'),
('company_phone', '"+1 (555) 123-4567"'),
('company_address', '"123 Tech Street, Digital City, DC 10001"'),
('social_links', '{"facebook": "", "twitter": "", "instagram": "", "linkedin": ""}'),
('seo_title', '"Mikky Services - Software Development & Digital Solutions"'),
('seo_description', '"Professional software development, social media marketing, and digital solutions. Custom apps, web development, and investment opportunities."');

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, content, author_name, is_published, published_at) VALUES
('The Future of Custom Software Development in 2024', 'future-custom-software-development-2024', 'Discover the latest trends in custom software development and how businesses are leveraging technology for growth.', E'## Introduction\n\nThe software development landscape is evolving rapidly. In 2024, we see unprecedented changes in how businesses approach custom software solutions.\n\n## Key Trends\n\n### 1. AI-Powered Development\nArtificial intelligence is revolutionizing how we build software. From code generation to testing automation, AI tools are becoming indispensable.\n\n### 2. Low-Code/No-Code Platforms\nThese platforms are democratizing software development, allowing businesses to create applications without extensive coding knowledge.\n\n### 3. Cloud-Native Architecture\nModern applications are being built with cloud-first approaches, ensuring scalability and reliability.\n\n## Conclusion\n\nStaying ahead in software development requires embracing these trends while maintaining focus on quality and user experience.', 'Mikky Services Team', true, now()),
('How Social Media Marketing Drives Business Growth', 'social-media-marketing-business-growth', 'Learn how effective social media strategies can transform your business presence and drive meaningful engagement.', E'## The Power of Social Media\n\nSocial media has become an essential tool for businesses of all sizes. With billions of active users across platforms, the opportunity for growth is immense.\n\n## Strategies That Work\n\n### 1. Consistent Branding\nMaintain a cohesive brand identity across all platforms to build recognition and trust.\n\n### 2. Engaging Content\nCreate content that resonates with your audience - videos, infographics, and interactive posts perform best.\n\n### 3. Analytics-Driven Decisions\nUse data to understand what works and continuously optimize your strategy.\n\n## Our Services\n\nAt Mikky Services, we offer comprehensive social media solutions including follower growth, engagement optimization, and verified account services.', 'Mikky Services Team', true, now()),
('Investment Opportunities: Building Wealth Safely', 'investment-opportunities-building-wealth', 'Explore secure investment options with guaranteed returns and learn how to grow your wealth responsibly.', E'## Smart Investing\n\nInvesting wisely is crucial for long-term financial success. Our investment plans are designed with security and growth in mind.\n\n## Our Investment Philosophy\n\n### 1. Security First\nAll investments are protected with multiple layers of security and insurance.\n\n### 2. Transparent Returns\nWe provide clear, realistic profit expectations with no hidden fees.\n\n### 3. Flexible Options\nChoose from various plans that match your financial goals and risk tolerance.\n\n## Getting Started\n\nStart with as little as $100 and watch your investment grow with our proven strategies.', 'Mikky Services Team', true, now());

-- Insert sample careers
INSERT INTO public.careers (title, department, location, type, description, requirements, benefits, salary_range, is_active) VALUES
('Senior Full Stack Developer', 'Engineering', 'Remote', 'Full-time', 'We are looking for an experienced Full Stack Developer to join our growing team. You will be responsible for developing and maintaining web applications using modern technologies.', ARRAY['5+ years of experience in web development', 'Proficiency in React, Node.js, and TypeScript', 'Experience with cloud platforms (AWS/GCP)', 'Strong problem-solving skills', 'Excellent communication abilities'], ARRAY['Competitive salary', 'Remote work flexibility', 'Health insurance', 'Professional development budget', 'Flexible hours'], '$80,000 - $120,000', true),
('Digital Marketing Specialist', 'Marketing', 'Hybrid', 'Full-time', 'Join our marketing team to develop and execute digital marketing strategies across multiple platforms.', ARRAY['3+ years in digital marketing', 'Experience with social media advertising', 'Knowledge of SEO and content marketing', 'Analytics and reporting skills', 'Creative mindset'], ARRAY['Competitive compensation', 'Growth opportunities', 'Team events', 'Learning budget', 'Work-life balance'], '$50,000 - $70,000', true),
('Customer Success Manager', 'Support', 'On-site', 'Full-time', 'Help our clients achieve success with our services by providing exceptional support and guidance.', ARRAY['2+ years in customer success or support', 'Excellent communication skills', 'Problem-solving abilities', 'Technical aptitude', 'Client relationship management'], ARRAY['Base salary + bonuses', 'Career advancement', 'Training programs', 'Health benefits', 'Team culture'], '$45,000 - $60,000', true);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (new.id, new.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$;

-- Trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();