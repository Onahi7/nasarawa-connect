-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('hero-images', 'hero-images', true),
  ('member-images', 'member-images', true);

-- Create hero_images table
CREATE TABLE public.hero_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create members table
CREATE TABLE public.members (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  image_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_users table for admin access
CREATE TABLE public.admin_users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.hero_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Anyone can view active hero images" 
ON public.hero_images 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Anyone can view active members" 
ON public.members 
FOR SELECT 
USING (is_active = true);

-- RLS Policies for admin access
CREATE POLICY "Admins can manage hero images" 
ON public.hero_images 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

CREATE POLICY "Admins can manage members" 
ON public.members 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

CREATE POLICY "Admins can view admin users" 
ON public.admin_users 
FOR SELECT 
USING (auth.uid() = user_id);

-- Storage policies for hero images
CREATE POLICY "Anyone can view hero images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'hero-images');

CREATE POLICY "Admins can upload hero images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'hero-images' AND EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

CREATE POLICY "Admins can update hero images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'hero-images' AND EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

CREATE POLICY "Admins can delete hero images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'hero-images' AND EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

-- Storage policies for member images
CREATE POLICY "Anyone can view member images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'member-images');

CREATE POLICY "Admins can upload member images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'member-images' AND EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

CREATE POLICY "Admins can update member images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'member-images' AND EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

CREATE POLICY "Admins can delete member images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'member-images' AND EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE user_id = auth.uid()
));

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_hero_images_updated_at
  BEFORE UPDATE ON public.hero_images
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_members_updated_at
  BEFORE UPDATE ON public.members
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data
INSERT INTO public.hero_images (title, description, image_url, display_order) VALUES
  ('Welcome to NAPPS', 'Transform education in Nasarawa State', '/placeholder.svg', 1),
  ('Quality Education', 'Excellence in private school standards', '/placeholder.svg', 2),
  ('Future Leaders', 'Building tomorrow''s leaders today', '/placeholder.svg', 3);

INSERT INTO public.members (name, position, bio, image_url, display_order) VALUES
  ('Dr. Adamu Hassan', 'State Chairman', 'Leading educational transformation in Nasarawa State with over 20 years of experience.', '/placeholder.svg', 1),
  ('Mrs. Fatima Aliyu', 'Secretary General', 'Dedicated to improving educational standards and member welfare.', '/placeholder.svg', 2),
  ('Prof. John Musa', 'Academic Director', 'Expert in curriculum development and educational policy.', '/placeholder.svg', 3),
  ('Mrs. Grace Ocheni', 'Treasurer', 'Financial management and strategic planning specialist.', '/placeholder.svg', 4);