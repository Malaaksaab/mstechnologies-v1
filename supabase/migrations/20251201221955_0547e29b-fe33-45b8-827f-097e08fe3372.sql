-- Create enum for social media service categories
CREATE TYPE public.social_media_category AS ENUM (
  'youtube', 'instagram', 'facebook', 'twitter', 'tiktok', 'linkedin', 'telegram', 'spotify', 'verified_accounts'
);

-- Create enum for digital service categories  
CREATE TYPE public.digital_category AS ENUM (
  'frp_unlock', 'mobile_unlock', 'iphone_bypass', 'apple_id', 'gmail_services', 'android_flash', 'sim_services', 'firmware', 'device_repair'
);

-- Social Media Services Table
CREATE TABLE public.social_media_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT,
  category social_media_category NOT NULL,
  features TEXT[] DEFAULT '{}',
  min_price DECIMAL(10,2),
  max_price DECIMAL(10,2),
  price_unit TEXT DEFAULT 'per 1000',
  delivery_time TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Digital Services Table
CREATE TABLE public.digital_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  short_description TEXT,
  category digital_category NOT NULL,
  features TEXT[] DEFAULT '{}',
  supported_devices TEXT[] DEFAULT '{}',
  min_price DECIMAL(10,2),
  max_price DECIMAL(10,2),
  delivery_time TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Investment Plans Table
CREATE TABLE public.investment_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  min_deposit DECIMAL(15,2) NOT NULL,
  max_deposit DECIMAL(15,2) NOT NULL,
  profit_rate DECIMAL(5,2) NOT NULL,
  duration_months INTEGER NOT NULL,
  features TEXT[] DEFAULT '{}',
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Generic service bookings update for all service types
ALTER TABLE public.service_bookings 
ADD COLUMN IF NOT EXISTS service_type TEXT DEFAULT 'software',
ADD COLUMN IF NOT EXISTS selected_features TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 1;

-- Enable RLS
ALTER TABLE public.social_media_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_plans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read
CREATE POLICY "Anyone can view active social media services" ON public.social_media_services
FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view active digital services" ON public.digital_services
FOR SELECT USING (is_active = true);

CREATE POLICY "Anyone can view active investment plans" ON public.investment_plans
FOR SELECT USING (is_active = true);

-- Insert Social Media Services
INSERT INTO public.social_media_services (title, slug, description, short_description, category, features, min_price, max_price, price_unit, delivery_time, is_featured) VALUES
-- YouTube Services
('YouTube Views', 'youtube-views', 'Boost your YouTube video visibility with real, high-retention views from genuine users worldwide. Our views come from real accounts with natural watch patterns, ensuring your content gets the exposure it deserves while maintaining compliance with platform guidelines. Perfect for new creators looking to gain momentum or established channels wanting to amplify their reach.', 'Real high-retention views from genuine users', 'youtube', ARRAY['Real Human Views', 'High Retention Rate', 'Gradual Delivery', 'No Drop Guarantee', 'Geo-Targeted Options', 'Safe & Organic'], 2, 50, 'per 1000', '1-7 days', true),
('YouTube Subscribers', 'youtube-subscribers', 'Grow your YouTube channel with real, active subscribers who engage with your content. Our subscribers are genuine users interested in your niche, helping build a loyal audience base. Increase your channel authority and unlock monetization features faster with consistent subscriber growth.', 'Genuine active subscribers for channel growth', 'youtube', ARRAY['Real Active Accounts', 'Permanent Subscribers', 'Gradual Safe Delivery', 'Refill Guarantee', 'Monetization Ready', 'Niche Targeted'], 15, 100, 'per 1000', '3-15 days', true),
('YouTube Watch Hours', 'youtube-watch-hours', 'Achieve YouTube monetization requirements with genuine watch hours from real viewers. Our service delivers organic watch time that counts towards your 4000 hours requirement, helping you unlock ad revenue and channel memberships faster.', 'Genuine watch hours for monetization', 'youtube', ARRAY['Counts for Monetization', 'Real Watch Time', 'Natural Viewing Patterns', 'Safe Delivery', 'Progress Tracking', '24/7 Support'], 20, 150, 'per 1000 hours', '7-30 days', true),
('YouTube Likes', 'youtube-likes', 'Increase your video engagement with authentic likes from real YouTube users. Higher like counts improve video ranking in search results and recommendations, driving more organic traffic to your content.', 'Authentic likes to boost engagement', 'youtube', ARRAY['Real User Likes', 'Fast Delivery', 'No Password Required', 'Safe & Secure', 'Refill Guarantee', 'Affordable Pricing'], 3, 30, 'per 1000', '1-3 days', false),
('YouTube Comments', 'youtube-comments', 'Get meaningful, relevant comments on your videos from real users. Custom or random comments available to boost engagement and social proof, encouraging more viewers to interact with your content.', 'Relevant comments from real users', 'youtube', ARRAY['Custom Comments Available', 'Real User Accounts', 'Natural Language', 'Niche Relevant', 'Fast Delivery', 'Spam Free'], 10, 100, 'per 100', '1-5 days', false),

-- Instagram Services
('Instagram Followers', 'instagram-followers', 'Build your Instagram presence with real, engaged followers targeted to your niche and location. Our followers are active accounts that help increase your credibility, attract brand deals, and grow your influence organically over time.', 'Real engaged followers for your niche', 'instagram', ARRAY['Real Active Accounts', 'Country Targeted', 'Gradual Delivery', 'Profile Optimization Tips', 'Refill Guarantee', 'No Password Needed'], 5, 80, 'per 1000', '2-10 days', true),
('Instagram Likes', 'instagram-likes', 'Boost your post visibility with authentic Instagram likes. Higher engagement rates improve your content reach through the algorithm, helping you appear on explore pages and attract more organic followers.', 'Authentic likes for better visibility', 'instagram', ARRAY['Real User Likes', 'Instant Start', 'Auto-Likes Available', 'Safe Delivery', 'Multiple Posts', 'Affordable Rates'], 2, 25, 'per 1000', '0-24 hours', false),
('Instagram Reels Views', 'instagram-reels-views', 'Maximize your Reels exposure with genuine views from real Instagram users. Trending Reels attract massive organic reach, and our service helps kickstart that viral potential for your content.', 'Genuine views to boost Reels reach', 'instagram', ARRAY['Real User Views', 'Fast Delivery', 'High Retention', 'Explore Page Potential', 'Bulk Orders Available', 'Safe & Organic'], 1, 20, 'per 1000', '0-48 hours', true),
('Instagram Story Views', 'instagram-story-views', 'Increase your story visibility and engagement with real story views. More views signal popularity to the algorithm, helping your stories appear higher in followers feeds.', 'Real story views for engagement', 'instagram', ARRAY['Real Viewers', 'Fast Delivery', 'Multiple Stories', 'Affordable', 'Safe Method', 'Daily Orders'], 1, 15, 'per 1000', '0-12 hours', false),

-- Facebook Services
('Facebook Page Likes', 'facebook-page-likes', 'Grow your Facebook business page with genuine page likes from real users. A larger following increases your page credibility, improves organic reach, and attracts more customers to your business.', 'Genuine likes for business credibility', 'facebook', ARRAY['Real User Likes', 'Worldwide or Targeted', 'Permanent Likes', 'Page Authority Boost', 'Gradual Delivery', 'Business Ready'], 10, 100, 'per 1000', '3-14 days', true),
('Facebook Post Engagement', 'facebook-post-engagement', 'Boost your Facebook posts with likes, comments, and shares from real users. Higher engagement increases post visibility in news feeds and helps your content reach more people organically.', 'Likes, comments & shares for posts', 'facebook', ARRAY['Likes + Comments + Shares', 'Real Accounts', 'Custom Packages', 'Fast Delivery', 'Natural Engagement', 'Affordable'], 5, 75, 'per package', '1-7 days', false),
('Facebook Video Views', 'facebook-video-views', 'Increase your Facebook video reach with genuine views. Higher view counts improve video ranking and attract more organic viewers to your content.', 'Genuine views for video content', 'facebook', ARRAY['Real Views', 'High Retention', 'Fast Start', 'Multiple Videos', 'Safe Delivery', 'Affordable Rates'], 3, 40, 'per 1000', '1-5 days', false),

-- TikTok Services
('TikTok Followers', 'tiktok-followers', 'Build your TikTok audience with real, active followers. A larger following opens doors to creator fund eligibility, brand partnerships, and viral content potential on the fastest-growing social platform.', 'Real active followers for growth', 'tiktok', ARRAY['Real Active Users', 'Fast Delivery', 'Gradual Growth', 'No Password Required', 'Refill Guarantee', 'Safe Method'], 5, 60, 'per 1000', '2-7 days', true),
('TikTok Views', 'tiktok-views', 'Boost your TikTok video views to improve ranking and attract more organic viewers. Higher view counts signal popularity to the algorithm, increasing your chances of landing on the For You Page.', 'Views for FYP ranking boost', 'tiktok', ARRAY['Real Views', 'FYP Potential', 'Fast Delivery', 'High Retention', 'Bulk Available', 'Affordable'], 1, 25, 'per 1000', '0-24 hours', true),
('TikTok Likes', 'tiktok-likes', 'Increase engagement on your TikTok videos with authentic likes. More likes improve your content visibility and credibility, encouraging more users to watch and follow.', 'Authentic likes for engagement', 'tiktok', ARRAY['Real User Likes', 'Fast Delivery', 'Safe & Secure', 'Affordable', 'Multiple Videos', 'No Drop'], 2, 30, 'per 1000', '0-24 hours', false),

-- LinkedIn Services
('LinkedIn Followers', 'linkedin-followers', 'Grow your LinkedIn professional network with real, industry-relevant followers. A larger following enhances your professional credibility and helps your content reach more decision-makers in your field.', 'Professional followers for credibility', 'linkedin', ARRAY['Real Professionals', 'Industry Targeted', 'Gradual Growth', 'Profile Boost', 'Safe Method', 'Business Focused'], 20, 150, 'per 1000', '5-15 days', false),
('LinkedIn Post Engagement', 'linkedin-post-engagement', 'Boost your LinkedIn posts with likes and comments from real professionals. Higher engagement increases post visibility in feeds and helps establish thought leadership in your industry.', 'Professional engagement for posts', 'linkedin', ARRAY['Real Professionals', 'Relevant Comments', 'Industry Specific', 'Fast Delivery', 'Profile Views Bonus', 'Safe Method'], 15, 100, 'per 500', '2-7 days', false),

-- Verified Accounts
('Verified UK Instagram Accounts', 'verified-uk-instagram', 'Premium verified UK Instagram accounts with established follower bases, perfect for businesses targeting UK audiences. Accounts come with organic followers, engagement history, and full transfer support.', 'Premium UK accounts with followers', 'verified_accounts', ARRAY['Verified Badge', 'UK Based', 'Established Followers', 'Full Access Transfer', 'Engagement History', 'Support Included'], 500, 10000, 'per account', 'Instant', true),
('Verified UK YouTube Channels', 'verified-uk-youtube', 'Monetization-ready UK YouTube channels with subscribers and watch hours. Perfect for creators wanting to skip the grind and start earning immediately with an established audience.', 'Monetization-ready UK channels', 'verified_accounts', ARRAY['Monetization Enabled', 'UK Audience', 'Subscriber Base', 'Watch Hours Complete', 'Full Transfer', 'Revenue Ready'], 1000, 25000, 'per channel', '1-3 days', true),
('Aged Facebook Accounts', 'aged-facebook-accounts', 'Aged Facebook accounts perfect for advertising and marketplace access. These established accounts have history and trust scores that allow better ad performance and fewer restrictions.', 'Aged accounts for advertising', 'verified_accounts', ARRAY['2+ Years Old', 'Marketplace Access', 'Ad Account Ready', 'Clean History', 'Full Access', 'Support Included'], 50, 500, 'per account', 'Instant', false);

-- Insert Digital Services
INSERT INTO public.digital_services (title, slug, description, short_description, category, features, supported_devices, min_price, max_price, delivery_time, is_featured) VALUES
-- FRP Unlock Services
('Samsung FRP Bypass', 'samsung-frp-bypass', 'Professional Samsung Factory Reset Protection bypass service for all models. Our expert technicians use the latest methods to safely remove FRP locks, restoring full access to your device without data loss or warranty concerns.', 'FRP bypass for all Samsung models', 'frp_unlock', ARRAY['All Samsung Models', 'Latest Security Patches', 'Remote Service Available', 'No Data Loss', 'Quick Turnaround', '100% Success Rate'], ARRAY['Samsung Galaxy S Series', 'Samsung Galaxy A Series', 'Samsung Galaxy Note', 'Samsung Galaxy Tab', 'Samsung Galaxy Fold/Flip'], 15, 100, '1-24 hours', true),
('Xiaomi/Redmi FRP Unlock', 'xiaomi-frp-unlock', 'Complete FRP unlock solution for Xiaomi, Redmi, and POCO devices. We handle all MIUI versions and security levels, providing a permanent unlock that survives factory resets.', 'FRP unlock for Xiaomi/Redmi/POCO', 'frp_unlock', ARRAY['All MIUI Versions', 'Permanent Solution', 'Remote Service', 'All Security Levels', 'Fast Processing', 'Expert Support'], ARRAY['Xiaomi Mi Series', 'Redmi Series', 'POCO Series', 'Xiaomi Tablets'], 10, 75, '1-12 hours', true),
('Huawei FRP Remove', 'huawei-frp-remove', 'Specialized Huawei FRP removal service including the latest EMUI and HarmonyOS devices. Our service covers all Huawei and Honor devices with guaranteed results.', 'FRP removal for Huawei/Honor', 'frp_unlock', ARRAY['EMUI & HarmonyOS', 'All Huawei Models', 'Honor Devices', 'Permanent Unlock', 'Remote Available', 'Guaranteed Results'], ARRAY['Huawei P Series', 'Huawei Mate Series', 'Honor Series', 'Huawei Tablets'], 15, 100, '2-24 hours', false),
('Universal Android FRP', 'universal-android-frp', 'FRP bypass service for all Android brands including Oppo, Vivo, Realme, OnePlus, LG, Motorola, and more. One service for all your Android FRP needs.', 'FRP bypass for all Android brands', 'frp_unlock', ARRAY['All Android Brands', 'Latest Android Versions', 'Multiple Methods', 'Remote & Physical', 'Bulk Discounts', 'Expert Technicians'], ARRAY['Oppo', 'Vivo', 'Realme', 'OnePlus', 'LG', 'Motorola', 'Nokia', 'Google Pixel'], 10, 80, '1-24 hours', false),

-- Mobile Unlock Services
('iPhone Network Unlock', 'iphone-network-unlock', 'Official carrier unlock service for all iPhone models. Permanent unlock that allows your iPhone to work with any carrier worldwide. Works through Apple servers for a clean, permanent solution.', 'Official carrier unlock for iPhone', 'mobile_unlock', ARRAY['All iPhone Models', 'All Carriers Supported', 'Permanent Unlock', 'Apple Server Based', 'Worldwide Compatible', 'Keeps Warranty'], ARRAY['iPhone 15 Series', 'iPhone 14 Series', 'iPhone 13 Series', 'iPhone 12 Series', 'All Older Models'], 20, 200, '1-14 days', true),
('Samsung Network Unlock', 'samsung-network-unlock', 'Factory unlock codes for Samsung devices locked to any carrier. Permanent unlock solution that works through official channels and survives all updates.', 'Factory unlock for Samsung', 'mobile_unlock', ARRAY['Official Unlock Codes', 'All Carriers', 'Permanent Solution', 'Easy Process', 'Update Safe', 'Worldwide Use'], ARRAY['All Samsung Galaxy Models', 'Samsung Galaxy Watch'], 10, 100, '1-7 days', true),
('Universal IMEI Unlock', 'universal-imei-unlock', 'IMEI-based unlock service for all major phone brands and carriers. We work with official databases to provide permanent unlocks for your device.', 'IMEI unlock for all brands', 'mobile_unlock', ARRAY['All Major Brands', 'All Carriers', 'IMEI Based', 'Permanent', 'Official Method', 'Global Compatible'], ARRAY['All Smartphones', 'Tablets', 'Mobile Hotspots'], 15, 150, '1-10 days', false),

-- iPhone Bypass Services
('iCloud Activation Lock Bypass', 'icloud-bypass', 'Professional iCloud activation lock bypass for all iPhone, iPad, and Apple Watch devices. Regain access to your locked device with our expert service that works on all iOS versions.', 'iCloud bypass for all Apple devices', 'iphone_bypass', ARRAY['All iOS Versions', 'iPhone/iPad/Watch', 'Signal Working', 'SIM Support', 'Remote Service', 'Expert Technicians'], ARRAY['All iPhone Models', 'All iPad Models', 'Apple Watch'], 30, 300, '1-7 days', true),
('MDM Profile Removal', 'mdm-removal', 'Remove Mobile Device Management profiles from iPhones and iPads. Perfect for devices from schools, businesses, or previous owners. Full device access restored.', 'MDM removal for Apple devices', 'iphone_bypass', ARRAY['All MDM Profiles', 'Full Access Restored', 'No Data Loss', 'Remote Service', 'Permanent Solution', 'Fast Processing'], ARRAY['All iPhone Models', 'All iPad Models'], 25, 150, '1-24 hours', true),
('iPhone Passcode Removal', 'iphone-passcode-removal', 'Remove forgotten passcodes from iPhone and iPad. Our service restores full access to your device when you have forgotten your screen lock code.', 'Passcode removal for iPhone/iPad', 'iphone_bypass', ARRAY['Screen Passcode', 'All Models', 'Quick Service', 'Professional Tools', 'Data Recovery Options', 'Expert Support'], ARRAY['All iPhone Models', 'All iPad Models'], 20, 100, '1-4 hours', false),

-- Apple ID Services
('Fresh Apple ID Creation', 'apple-id-creation', 'Professional Apple ID creation service with your choice of region. Perfect for accessing region-specific content, apps, and services. Includes full setup and verification.', 'New Apple ID creation any region', 'apple_id', ARRAY['Any Region', 'Full Verification', 'iCloud Enabled', 'App Store Access', 'Complete Setup', 'Login Details Provided'], ARRAY['All Apple Devices'], 10, 50, 'Instant', true),
('Apple ID Removal', 'apple-id-removal', 'Remove previous owner Apple ID from your device. Professional service that cleanly removes the old account, allowing you to set up with your own Apple ID.', 'Remove previous owner Apple ID', 'apple_id', ARRAY['Previous Owner Removal', 'Clean Removal', 'All Devices', 'Professional Service', 'Legal & Safe', 'Support Included'], ARRAY['All iPhone Models', 'All iPad Models', 'Mac'], 50, 250, '1-7 days', true),
('Apple ID Account Recovery', 'apple-id-recovery', 'Recover access to your Apple ID when locked out or forgotten. Our experts help restore access to your account through official Apple procedures.', 'Recover locked Apple ID access', 'apple_id', ARRAY['Locked Account Recovery', 'Forgotten Password', 'Two-Factor Issues', 'Security Questions', 'Professional Help', 'Account Restoration'], ARRAY['All Apple Devices'], 30, 150, '1-5 days', false),

-- Gmail Services
('Gmail Account Creation', 'gmail-creation', 'Professional Gmail account creation with phone verification. Perfect for business use, account recovery numbers, or expanding your digital presence.', 'Phone verified Gmail accounts', 'gmail_services', ARRAY['Phone Verified', 'All Google Services', 'Clean Accounts', 'Instant Delivery', 'Bulk Available', 'Support Included'], ARRAY['All Devices'], 3, 20, 'Instant', true),
('Bulk Gmail Accounts', 'bulk-gmail', 'Bulk Gmail account packages for businesses and marketers. All accounts are phone verified and ready for immediate use across Google services.', 'Bulk Gmail for business use', 'gmail_services', ARRAY['Bulk Packages', 'Phone Verified', 'Business Ready', 'Marketing Use', 'API Integration', 'Wholesale Pricing'], ARRAY['All Devices'], 50, 500, '1-3 days', false),

-- Android Flash Services
('Stock ROM Installation', 'stock-rom-install', 'Professional stock ROM installation and firmware flashing for all Android devices. Restore your device to factory fresh condition or update to the latest official firmware.', 'Stock ROM flashing for Android', 'android_flash', ARRAY['All Android Brands', 'Latest Firmware', 'Clean Install', 'Data Backup Options', 'Bootloader Services', 'Expert Technicians'], ARRAY['All Android Smartphones', 'Android Tablets'], 15, 75, '1-4 hours', true),
('Custom ROM Installation', 'custom-rom-install', 'Install custom ROMs like LineageOS, Pixel Experience, or AOSP for enhanced performance and features. Includes bootloader unlock and recovery installation.', 'Custom ROM for enhanced features', 'android_flash', ARRAY['Popular Custom ROMs', 'Bootloader Unlock', 'Custom Recovery', 'Root Options', 'Performance Boost', 'Expert Setup'], ARRAY['Supported Android Devices'], 25, 100, '2-6 hours', false),
('Boot Loop & Brick Repair', 'boot-repair', 'Fix boot loops, soft bricks, and devices stuck on logos. Our technicians can recover most Android devices from software failures and failed updates.', 'Fix boot issues and soft bricks', 'android_flash', ARRAY['Boot Loop Fix', 'Soft Brick Recovery', 'Logo Stuck Fix', 'Update Failures', 'Data Recovery Attempts', 'Professional Tools'], ARRAY['All Android Devices'], 20, 100, '1-8 hours', true),

-- SIM Services
('SIM Unlock Service', 'sim-unlock', 'Unlock SIM-locked devices to use with any carrier worldwide. Works for both phones and mobile hotspots from all major carriers.', 'SIM unlock for all carriers', 'sim_services', ARRAY['All Carriers', 'Permanent Unlock', 'All Devices', 'Fast Processing', 'Global Compatible', 'Official Method'], ARRAY['All Smartphones', 'Mobile Hotspots', 'Tablets'], 15, 100, '1-7 days', true),
('IMEI Repair/Change', 'imei-repair', 'IMEI repair service for devices with corrupted or null IMEI. Restore your device functionality by fixing IMEI issues caused by software problems.', 'IMEI repair for software issues', 'sim_services', ARRAY['Null IMEI Fix', 'Corrupted IMEI Repair', 'Baseband Fix', 'Network Restore', 'Professional Service', 'Legal Compliance'], ARRAY['Select Android Models'], 30, 150, '2-24 hours', false),

-- Firmware Services
('Firmware Download Service', 'firmware-download', 'Access our extensive firmware library for all major phone brands. Download official firmware files for your device model and region.', 'Official firmware downloads', 'firmware', ARRAY['All Major Brands', 'All Regions', 'Latest Versions', 'Verified Files', 'Direct Links', 'Flash Guides'], ARRAY['All Smartphones', 'Tablets'], 5, 30, 'Instant', true),
('Firmware Flash Service', 'firmware-flash', 'Professional firmware flashing service. We download the correct firmware for your device and flash it professionally, ensuring a clean installation.', 'Professional firmware installation', 'firmware', ARRAY['Correct Firmware', 'Professional Flash', 'Clean Install', 'All Brands', 'Update/Downgrade', 'Support Included'], ARRAY['All Smartphones', 'Tablets'], 20, 80, '1-4 hours', false),

-- Device Repair Services
('Software Troubleshooting', 'software-troubleshoot', 'Comprehensive software troubleshooting for all smartphone issues. From app crashes to system errors, our experts diagnose and fix software problems.', 'Fix software issues on any phone', 'device_repair', ARRAY['App Issues', 'System Errors', 'Performance Problems', 'Storage Issues', 'Battery Drain Fix', 'Expert Diagnosis'], ARRAY['All Smartphones', 'Tablets'], 15, 75, '1-4 hours', true),
('Data Recovery Service', 'data-recovery', 'Recover lost or deleted data from smartphones and tablets. Our advanced tools can retrieve photos, contacts, messages, and more from damaged or reset devices.', 'Recover lost data from devices', 'device_repair', ARRAY['Photo Recovery', 'Contact Recovery', 'Message Recovery', 'Damaged Devices', 'Factory Reset Recovery', 'Professional Tools'], ARRAY['All Smartphones', 'Tablets'], 50, 300, '1-7 days', true);

-- Insert Investment Plans
INSERT INTO public.investment_plans (name, description, min_deposit, max_deposit, profit_rate, duration_months, features, is_popular) VALUES
('Starter Plan', 'Perfect for beginners looking to start their investment journey with low risk and guaranteed returns. Ideal for those testing the waters of fixed-income investments.', 10000, 100000, 1.5, 3, ARRAY['Daily Profit Accrual', 'Monthly Withdrawals', 'Basic Dashboard Access', 'Email Support', '100% Capital Protection', 'No Hidden Fees', 'Easy Exit Option', 'Investment Certificate'], false),
('Growth Plan', 'Our most popular plan offering balanced returns with flexible terms. Designed for serious investors looking to grow their wealth steadily over time.', 100000, 500000, 2.0, 6, ARRAY['Daily Profit Accrual', 'Weekly Withdrawals', 'Advanced Analytics Dashboard', 'Priority Support', '5% Referral Bonus', '100% Capital Protection', 'Dedicated Account Manager', 'Monthly Reports', 'Reinvestment Options', 'Early Exit Available'], true),
('Premium Plan', 'High-yield investment plan for experienced investors. Enjoy premium benefits and personalized service with higher returns on larger deposits.', 500000, 5000000, 2.5, 12, ARRAY['Real-time Profit Tracking', 'Anytime Withdrawals', 'Full Dashboard Access', 'Dedicated Manager', 'Exclusive Investment Events', '100% Capital Guarantee', 'Priority Processing', 'Tax Documentation', 'Portfolio Diversification', 'VIP Support Line'], false),
('Enterprise Plan', 'Exclusive high-value investment solution for institutional and high-net-worth investors. Maximum returns with white-glove service.', 5000000, 50000000, 3.0, 24, ARRAY['Real-time Profit Updates', 'Instant Withdrawals', 'Custom Investment Solutions', 'Personal VIP Manager', 'Board Meeting Access', 'Full Capital Insurance', 'Custom Contract Terms', 'Quarterly Reviews', 'Tax Advisory', 'Legal Support', 'Priority Everything'], false);