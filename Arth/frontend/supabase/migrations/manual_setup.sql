-- Create contents table
CREATE TABLE IF NOT EXISTS public.contents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  category text NOT NULL CHECK (category IN ('image', 'video', 'story', 'letter', 'article', 'news')),
  file_url text,
  content_text text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contents ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all content
CREATE POLICY "Anyone can view content"
  ON public.contents
  FOR SELECT
  USING (true);

-- Allow anyone to insert content (for demo purposes)
CREATE POLICY "Anyone can create content"
  ON public.contents
  FOR INSERT
  WITH CHECK (true);

-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public)
VALUES ('content-files', 'content-files', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to storage bucket
CREATE POLICY "Public Access to content files"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'content-files');

-- Allow anyone to upload files
CREATE POLICY "Anyone can upload content files"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'content-files');