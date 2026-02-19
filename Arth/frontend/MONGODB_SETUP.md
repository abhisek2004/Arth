# MongoDB Setup Guide

This application has been migrated from Supabase to MongoDB for database storage.

## Configuration

### 1. Environment Variables

Update your `.env` file with your MongoDB connection string:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
```

### 2. Database Structure

The application uses the following MongoDB collection structure:

**Collection: `contents`**

```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String, // 'image', 'video', 'story', 'letter', 'article', 'news'
  file_url: String, // Optional - file reference or URL
  content_text: String,
  created_at: Date
}
```

**Database Name**: `content_platform`

## Migration Notes

### Key Changes Made:

1. **Replaced Supabase client** with MongoDB Node.js driver
2. **Updated database queries** to use MongoDB syntax
3. **Modified data structures** to use MongoDB's `_id` instead of `id`
4. **Removed Supabase storage** dependencies (file uploads now use placeholder approach)
5. **Updated all components** to work with MongoDB data structure

### File Storage

For file uploads, the current implementation uses placeholders. For production use, consider integrating with:

- Cloudinary
- AWS S3
- Firebase Storage
- Your own file server

### Services Provided

The `contentService` in `src/lib/supabase.ts` provides:

```typescript
// Get all content
await contentService.getAllContent();

// Get content by category
await contentService.getContentByCategory("image");

// Create new content
await contentService.createContent(contentData);

// Get content by ID
await contentService.getContentById(id);
```

## Testing

1. Make sure your MongoDB connection string is correct
2. Start your development server: `npm run dev`
3. Try uploading content through the Upload page
4. Verify content appears in the Home and category pages

## Troubleshooting

- Ensure MongoDB Atlas cluster is running and accessible
- Check that IP whitelist includes your development machine
- Verify database user has read/write permissions
- Check MongoDB connection string format
