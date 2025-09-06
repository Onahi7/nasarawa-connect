-- Create announcements table
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  show_on_all_pages BOOLEAN NOT NULL DEFAULT false,
  background_color TEXT DEFAULT '#1e40af',
  text_color TEXT DEFAULT '#ffffff',
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_settings table for dynamic content
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  setting_type TEXT NOT NULL DEFAULT 'text' CHECK (setting_type IN ('text', 'textarea', 'boolean', 'number', 'json')),
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create page_content table for dynamic page sections
CREATE TABLE public.page_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL,
  section_name TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'text' CHECK (content_type IN ('text', 'html', 'image', 'video', 'json')),
  content TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_name, section_name)
);

-- Enable RLS
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Anyone can view active announcements" 
ON public.announcements 
FOR SELECT 
USING (is_active = true AND (start_date IS NULL OR start_date <= now()) AND (end_date IS NULL OR end_date >= now()));

CREATE POLICY "Anyone can view public site settings" 
ON public.site_settings 
FOR SELECT 
USING (is_public = true);

CREATE POLICY "Anyone can view active page content" 
ON public.page_content 
FOR SELECT 
USING (is_active = true);

-- RLS Policies for admin access
CREATE POLICY "Admins can manage announcements" 
ON public.announcements 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

CREATE POLICY "Admins can manage site settings" 
ON public.site_settings 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

CREATE POLICY "Admins can manage page content" 
ON public.page_content 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON public.announcements
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (setting_key, setting_value, setting_type, description, is_public) VALUES
  ('site_title', 'NAPPS Nasarawa State - Official Portal', 'text', 'Main site title for SEO', true),
  ('site_description', 'Official NAPPS Nasarawa State portal for private schools registration, data capturing, and dues payment in collaboration with Nasarawa State Ministry of Education.', 'textarea', 'Main site description for SEO', true),
  ('contact_email', 'info@nappsnasarawa.com', 'text', 'Primary contact email', true),
  ('contact_phone', '+234 XXX XXX XXXX', 'text', 'Primary contact phone', true),
  ('office_address', 'NAPPS Secretariat, Nasarawa State, Nigeria', 'text', 'Office address', true),
  ('facebook_url', '', 'text', 'Facebook page URL', true),
  ('twitter_url', '', 'text', 'Twitter profile URL', true),
  ('linkedin_url', '', 'text', 'LinkedIn profile URL', true),
  ('enable_registration', 'true', 'boolean', 'Enable/disable registration functionality', false),
  ('maintenance_mode', 'false', 'boolean', 'Enable maintenance mode', false);

-- Insert sample announcement
INSERT INTO public.announcements (title, message, type, is_active, show_on_all_pages, background_color, text_color) VALUES
  ('Welcome to NAPPS Portal', 'Register your private school for the 2024/2025 academic session. Deadline: December 31, 2024', 'info', true, true, '#1e40af', '#ffffff');