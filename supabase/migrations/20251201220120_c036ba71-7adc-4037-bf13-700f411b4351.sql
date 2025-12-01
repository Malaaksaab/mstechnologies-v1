
-- Create software service categories enum
CREATE TYPE public.software_category AS ENUM (
  'business_management',
  'education',
  'healthcare',
  'hospitality',
  'retail',
  'custom_development',
  'web_development',
  'mobile_apps',
  'cloud_solutions',
  'ecommerce'
);

-- Create software services table
CREATE TABLE public.software_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  short_description TEXT,
  category software_category NOT NULL,
  icon_name TEXT DEFAULT 'Code',
  features TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  price_range TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create service bookings table
CREATE TABLE public.service_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES public.software_services(id) ON DELETE SET NULL,
  ticket_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  company_name TEXT,
  project_details TEXT NOT NULL,
  budget_range TEXT,
  timeline TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.software_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_bookings ENABLE ROW LEVEL SECURITY;

-- RLS policies for software_services (public read)
CREATE POLICY "Anyone can view active services" ON public.software_services
  FOR SELECT USING (is_active = true);

-- RLS policies for service_bookings (public insert)
CREATE POLICY "Anyone can create bookings" ON public.service_bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view bookings" ON public.service_bookings
  FOR SELECT USING (true);

-- Create indexes
CREATE INDEX idx_software_services_category ON public.software_services(category);
CREATE INDEX idx_software_services_active ON public.software_services(is_active);
CREATE INDEX idx_service_bookings_status ON public.service_bookings(status);
CREATE INDEX idx_service_bookings_ticket ON public.service_bookings(ticket_id);

-- Insert comprehensive software services data
INSERT INTO public.software_services (title, slug, description, short_description, category, icon_name, features, technologies, price_range, is_featured) VALUES
-- Business Management
('POS System', 'pos-system', 'Complete Point of Sale system for retail stores, restaurants, and businesses. Features inventory management, sales tracking, employee management, and detailed reporting.', 'Modern POS solution for all business types', 'retail', 'ShoppingCart', ARRAY['Inventory Management', 'Sales Tracking', 'Employee Management', 'Multi-location Support', 'Receipt Printing', 'Barcode Scanning'], ARRAY['React', 'Node.js', 'PostgreSQL', 'Electron'], 'Starting from $2,999', true),
('ERP System', 'erp-system', 'Enterprise Resource Planning system for complete business management. Integrates all core processes including HR, finance, supply chain, and operations.', 'All-in-one enterprise management', 'business_management', 'Database', ARRAY['HR Management', 'Financial Accounting', 'Supply Chain', 'CRM Integration', 'Business Intelligence', 'Workflow Automation'], ARRAY['React', 'Python', 'PostgreSQL', 'Docker'], 'Starting from $9,999', true),
('CRM System', 'crm-system', 'Customer Relationship Management system to track leads, manage customer interactions, and boost sales performance.', 'Manage customer relationships effectively', 'business_management', 'Users', ARRAY['Lead Management', 'Sales Pipeline', 'Email Integration', 'Task Management', 'Analytics Dashboard', 'Mobile App'], ARRAY['React', 'Node.js', 'MongoDB', 'AWS'], 'Starting from $1,999', false),
('Inventory Management', 'inventory-management', 'Advanced inventory tracking system with real-time stock updates, automated reordering, and multi-warehouse support.', 'Track and manage inventory efficiently', 'business_management', 'Package', ARRAY['Stock Tracking', 'Automated Reordering', 'Multi-warehouse', 'Barcode Support', 'Supplier Management', 'Reports'], ARRAY['React', 'Node.js', 'PostgreSQL'], 'Starting from $1,499', false),

-- Education
('School Management System', 'school-management-system', 'Complete school administration system covering student enrollment, attendance, grades, timetables, fee management, and parent communication.', 'Digital solution for modern schools', 'education', 'GraduationCap', ARRAY['Student Management', 'Attendance Tracking', 'Grade Management', 'Timetable Scheduling', 'Fee Collection', 'Parent Portal', 'Online Exams'], ARRAY['React', 'Node.js', 'PostgreSQL', 'Socket.io'], 'Starting from $4,999', true),
('Learning Management System', 'learning-management-system', 'Online learning platform with course creation, video hosting, assessments, certificates, and student progress tracking.', 'Build your online academy', 'education', 'BookOpen', ARRAY['Course Builder', 'Video Hosting', 'Quizzes & Exams', 'Certificates', 'Progress Tracking', 'Discussion Forums'], ARRAY['React', 'Node.js', 'AWS S3', 'FFmpeg'], 'Starting from $3,499', false),
('University Portal', 'university-portal', 'Comprehensive university management including admissions, academic records, research management, and alumni tracking.', 'Complete university digitization', 'education', 'Building', ARRAY['Admission System', 'Academic Records', 'Library Management', 'Research Portal', 'Alumni Network', 'Placement Cell'], ARRAY['React', 'Python', 'PostgreSQL', 'Elasticsearch'], 'Starting from $14,999', false),

-- Healthcare
('Hospital Management System', 'hospital-management-system', 'Complete hospital administration covering patient records, appointments, billing, pharmacy, lab management, and bed tracking.', 'Digitize your healthcare facility', 'healthcare', 'Heart', ARRAY['Patient Records (EMR)', 'Appointment Scheduling', 'Billing & Insurance', 'Pharmacy Management', 'Lab Integration', 'Bed Management', 'Doctor Portal'], ARRAY['React', 'Node.js', 'PostgreSQL', 'HL7 FHIR'], 'Starting from $12,999', true),
('Clinic Management', 'clinic-management', 'Lightweight clinic software for small to medium practices with patient scheduling, medical records, and billing.', 'Simple solution for clinics', 'healthcare', 'Stethoscope', ARRAY['Patient Scheduling', 'Medical Records', 'Prescription Management', 'Billing', 'SMS Reminders', 'Reports'], ARRAY['React', 'Node.js', 'PostgreSQL'], 'Starting from $2,499', false),
('Pharmacy System', 'pharmacy-system', 'Pharmacy management with inventory, prescriptions, sales, expiry tracking, and supplier management.', 'Manage your pharmacy digitally', 'healthcare', 'Pill', ARRAY['Inventory Control', 'Prescription Tracking', 'Expiry Alerts', 'Sales Management', 'Supplier Orders', 'Barcode Support'], ARRAY['React', 'Node.js', 'PostgreSQL'], 'Starting from $1,999', false),
('Lab Management System', 'lab-management', 'Laboratory information system for test management, sample tracking, result generation, and reporting.', 'Streamline lab operations', 'healthcare', 'FlaskConical', ARRAY['Test Cataloging', 'Sample Tracking', 'Result Entry', 'Report Generation', 'Doctor Integration', 'Quality Control'], ARRAY['React', 'Node.js', 'PostgreSQL'], 'Starting from $3,999', false),

-- Hospitality
('Restaurant Management System', 'restaurant-management-system', 'Complete restaurant solution with table management, kitchen display, online ordering, delivery tracking, and inventory.', 'Run your restaurant smoothly', 'hospitality', 'UtensilsCrossed', ARRAY['Table Management', 'Kitchen Display', 'Online Ordering', 'Delivery Tracking', 'Menu Management', 'Inventory Control', 'Staff Scheduling'], ARRAY['React', 'Node.js', 'PostgreSQL', 'Socket.io'], 'Starting from $3,999', true),
('Hotel Management System', 'hotel-management-system', 'Hotel property management with reservations, check-in/out, housekeeping, billing, and guest services.', 'Manage your property efficiently', 'hospitality', 'Hotel', ARRAY['Reservation System', 'Check-in/Check-out', 'Room Management', 'Housekeeping', 'Billing & Invoicing', 'Guest Portal'], ARRAY['React', 'Node.js', 'PostgreSQL'], 'Starting from $5,999', false),
('Food Delivery App', 'food-delivery-app', 'Multi-vendor food delivery platform with customer app, restaurant dashboard, and driver app.', 'Launch your delivery business', 'hospitality', 'Bike', ARRAY['Customer App', 'Restaurant Dashboard', 'Driver App', 'Real-time Tracking', 'Payment Integration', 'Rating System'], ARRAY['React Native', 'Node.js', 'MongoDB', 'Socket.io'], 'Starting from $7,999', false),

-- Retail & E-commerce
('E-commerce Platform', 'ecommerce-platform', 'Full-featured online store with product management, shopping cart, payments, shipping, and order tracking.', 'Sell online professionally', 'ecommerce', 'Store', ARRAY['Product Catalog', 'Shopping Cart', 'Payment Gateway', 'Shipping Integration', 'Order Management', 'Customer Accounts', 'SEO Optimized'], ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'Starting from $4,999', true),
('Multi-vendor Marketplace', 'multi-vendor-marketplace', 'Marketplace platform allowing multiple sellers with commission management, vendor dashboards, and admin controls.', 'Build your own Amazon', 'ecommerce', 'Store', ARRAY['Vendor Management', 'Commission System', 'Product Approval', 'Vendor Payouts', 'Review System', 'Admin Dashboard'], ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'Starting from $9,999', false),
('Retail Analytics', 'retail-analytics', 'Business intelligence platform for retail with sales analytics, customer insights, and inventory forecasting.', 'Data-driven retail decisions', 'retail', 'BarChart', ARRAY['Sales Dashboard', 'Customer Analytics', 'Inventory Forecasting', 'Trend Analysis', 'Custom Reports', 'Data Export'], ARRAY['React', 'Python', 'PostgreSQL', 'TensorFlow'], 'Starting from $3,999', false),

-- Web Development
('Corporate Website', 'corporate-website', 'Professional business website with modern design, CMS, SEO optimization, and lead generation forms.', 'Establish your online presence', 'web_development', 'Globe', ARRAY['Modern Design', 'Content Management', 'SEO Optimized', 'Contact Forms', 'Blog Section', 'Analytics'], ARRAY['React', 'Next.js', 'Tailwind CSS'], 'Starting from $999', false),
('Landing Pages', 'landing-pages', 'High-converting landing pages for marketing campaigns with A/B testing and analytics integration.', 'Convert visitors to customers', 'web_development', 'Layout', ARRAY['Conversion Optimized', 'A/B Testing', 'Analytics Integration', 'Mobile Responsive', 'Fast Loading', 'Lead Capture'], ARRAY['React', 'Next.js', 'Tailwind CSS'], 'Starting from $499', false),
('Web Portal Development', 'web-portal', 'Custom web portals for customers, employees, or partners with secure authentication and role-based access.', 'Secure access for stakeholders', 'web_development', 'LayoutDashboard', ARRAY['User Authentication', 'Role-based Access', 'Dashboard', 'Document Management', 'Notifications', 'API Integration'], ARRAY['React', 'Node.js', 'PostgreSQL'], 'Starting from $2,999', false),
('Progressive Web App', 'progressive-web-app', 'PWA development for app-like experience on web browsers with offline support and push notifications.', 'Web app with native feel', 'web_development', 'Smartphone', ARRAY['Offline Support', 'Push Notifications', 'App-like Experience', 'Fast Loading', 'Installable', 'Cross-platform'], ARRAY['React', 'Service Workers', 'IndexedDB'], 'Starting from $3,499', false),

-- Mobile Apps
('iOS App Development', 'ios-app-development', 'Native iOS application development with Swift for iPhone and iPad with App Store submission support.', 'Native iPhone apps', 'mobile_apps', 'Apple', ARRAY['Native Performance', 'iOS Design Guidelines', 'Push Notifications', 'In-App Purchases', 'App Store Submission', 'Analytics'], ARRAY['Swift', 'SwiftUI', 'CoreData'], 'Starting from $4,999', false),
('Android App Development', 'android-app-development', 'Native Android application development with Kotlin for phones and tablets with Play Store submission.', 'Native Android apps', 'mobile_apps', 'Smartphone', ARRAY['Native Performance', 'Material Design', 'Push Notifications', 'In-App Purchases', 'Play Store Submission', 'Analytics'], ARRAY['Kotlin', 'Jetpack Compose', 'Room'], 'Starting from $4,499', false),
('Cross-platform App', 'cross-platform-app', 'Single codebase mobile apps for both iOS and Android using React Native or Flutter.', 'One app, both platforms', 'mobile_apps', 'Layers', ARRAY['Single Codebase', 'iOS & Android', 'Native Performance', 'Cost Effective', 'Faster Development', 'Easy Updates'], ARRAY['React Native', 'Flutter', 'Firebase'], 'Starting from $5,999', true),

-- Cloud Solutions
('Cloud Migration', 'cloud-migration', 'Migrate your existing systems to cloud infrastructure with AWS, Azure, or Google Cloud.', 'Move to the cloud', 'cloud_solutions', 'Cloud', ARRAY['Infrastructure Assessment', 'Migration Strategy', 'Data Transfer', 'Testing & Validation', 'Performance Optimization', 'Training'], ARRAY['AWS', 'Azure', 'Google Cloud', 'Terraform'], 'Starting from $4,999', false),
('DevOps Setup', 'devops-setup', 'CI/CD pipeline setup, containerization, and infrastructure automation for faster deployments.', 'Automate your deployments', 'cloud_solutions', 'GitBranch', ARRAY['CI/CD Pipeline', 'Docker Setup', 'Kubernetes', 'Monitoring', 'Auto-scaling', 'Security'], ARRAY['Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions'], 'Starting from $2,999', false),
('Serverless Architecture', 'serverless-architecture', 'Build scalable applications with serverless functions reducing infrastructure management overhead.', 'Scale without servers', 'cloud_solutions', 'Zap', ARRAY['Auto-scaling', 'Pay-per-use', 'No Server Management', 'High Availability', 'Global Distribution', 'Event-driven'], ARRAY['AWS Lambda', 'Azure Functions', 'Cloudflare Workers'], 'Starting from $3,499', false),

-- Custom Development
('Custom Software', 'custom-software', 'Bespoke software solutions tailored to your unique business requirements and workflows.', 'Software built for you', 'custom_development', 'Code', ARRAY['Requirements Analysis', 'Custom Design', 'Agile Development', 'Testing', 'Deployment', 'Support'], ARRAY['React', 'Node.js', 'Python', 'PostgreSQL'], 'Starting from $9,999', false),
('API Development', 'api-development', 'RESTful and GraphQL API development with documentation, authentication, and rate limiting.', 'Connect your systems', 'custom_development', 'Link', ARRAY['REST & GraphQL', 'Authentication', 'Rate Limiting', 'Documentation', 'Versioning', 'Monitoring'], ARRAY['Node.js', 'Python', 'PostgreSQL', 'Redis'], 'Starting from $2,499', false),
('System Integration', 'system-integration', 'Connect disparate systems with custom integrations, middleware, and data synchronization.', 'Unify your systems', 'custom_development', 'Plug', ARRAY['API Integration', 'Data Sync', 'Middleware', 'ETL Pipelines', 'Real-time Updates', 'Error Handling'], ARRAY['Node.js', 'Python', 'Apache Kafka', 'RabbitMQ'], 'Starting from $3,999', false),
('Legacy Modernization', 'legacy-modernization', 'Upgrade outdated systems to modern architectures while preserving business logic and data.', 'Modernize old systems', 'custom_development', 'RefreshCw', ARRAY['Code Assessment', 'Incremental Migration', 'Data Migration', 'Testing', 'Performance Boost', 'Documentation'], ARRAY['React', 'Node.js', 'PostgreSQL', 'Docker'], 'Starting from $7,999', false),

-- SaaS Platforms
('SaaS Platform Development', 'saas-development', 'Build multi-tenant SaaS applications with subscription billing, user management, and admin dashboards.', 'Launch your SaaS product', 'custom_development', 'Rocket', ARRAY['Multi-tenancy', 'Subscription Billing', 'User Management', 'Admin Dashboard', 'API Access', 'Analytics'], ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'Starting from $14,999', true),
('White-label Solutions', 'white-label-solutions', 'Customizable software that can be rebranded and sold to your clients.', 'Resell under your brand', 'custom_development', 'Tag', ARRAY['Full Rebranding', 'Multi-client', 'Custom Domains', 'Client Management', 'Billing Integration', 'Support Portal'], ARRAY['React', 'Node.js', 'PostgreSQL'], 'Starting from $11,999', false);
