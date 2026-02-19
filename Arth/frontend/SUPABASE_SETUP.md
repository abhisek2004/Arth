# Supabase Setup Guide

## 1. Environment Variables

Make sure your `.env` file has the correct variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 2. Database Setup

Run the migration to create the database schema:

```sql
-- This creates the contents table and storage bucket
-- File: supabase/migrations/20260210185111_create_content_platform_schema.sql
```

## 3. Storage Bucket Setup

If you're getting "Bucket not found" errors, you need to create the storage bucket manually in Supabase:

### Option 1: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to "Storage" in the left sidebar
3. Click "Create bucket"
4. Name it `content-files`
5. Set it as "Public" (for demo purposes)
6. Click "Create"

### Option 2: Using SQL in Supabase SQL Editor

Run this SQL query:

```sql
-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('content-files', 'content-files', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for the bucket
CREATE POLICY "Public Access to content files"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'content-files');

CREATE POLICY "Anyone can upload content files"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'content-files');
```

## 4. Testing

After setup, you should be able to:

- Upload images and videos (they'll be stored in the bucket)
- Upload text-based content (stories, letters, articles, news) without files
- View all content in the Media, Writing, and News pages

## 5. Troubleshooting

If you still get errors:

1. Check that your Supabase URL and anon key are correct
2. Verify the database table `contents` exists
3. Confirm the storage bucket `content-files` exists and is public
4. Check browser console for detailed error messages
