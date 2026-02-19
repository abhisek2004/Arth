import { useState } from 'react';
import { Eye, Calendar } from 'lucide-react';
import { Content } from '../lib/supabase';

interface ContentCardProps {
  content: Content;
  onView: (content: Content) => void;
}

export default function ContentCard({ content, onView }: ContentCardProps) {
  const [imageError, setImageError] = useState(false);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      image: 'bg-purple-100 text-purple-700',
      video: 'bg-red-100 text-red-700',
      story: 'bg-green-100 text-green-700',
      letter: 'bg-yellow-100 text-yellow-700',
      article: 'bg-blue-100 text-blue-700',
      news: 'bg-orange-100 text-orange-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getThumbnail = () => {
    if (content.file_url && !imageError) {
      // Ensure the file URL is properly formatted as a data URL
      let imageUrl = content.file_url;
      if (!imageUrl.startsWith('data:') && !imageUrl.startsWith('http')) {
        // If it's not already a data URL or HTTP URL, it might be a raw base64 string
        // Determine the file type from the first few characters
        const mimeType = imageUrl.startsWith('/9j/') ? 'image/jpeg' :
          imageUrl.startsWith('iVBOR') ? 'image/png' :
            'image/jpeg'; // default fallback
        imageUrl = `data:${mimeType};base64,${imageUrl}`;
      }

      // Debug: log the file URL to see what we're getting
      console.log('Image file URL:', imageUrl.substring(0, 100) + '...');
      return (
        <img
          src={imageUrl}
          alt={content.title}
          className="object-cover w-full h-48"
          onError={(e) => {
            console.error('Image load error:', e);
            setImageError(true);
          }}
          onLoad={() => console.log('Image loaded successfully')}
        />
      );
    }
    if (content.category === 'video' && content.file_url) {
      // Handle video thumbnails similarly if they are base64 encoded
      let videoThumbnail = content.file_url;
      if (content.file_url && !content.file_url.startsWith('data:') && !content.file_url.startsWith('http')) {
        videoThumbnail = `data:image/jpeg;base64,${content.file_url}`;
      }

      return (
        <div className="flex items-center justify-center w-full h-48 bg-gradient-to-br from-red-400 to-pink-500">
          <div className="text-6xl text-white">▶</div>
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-full h-48 bg-gradient-to-br from-blue-400 to-cyan-500">
        <div className="text-5xl font-bold text-white">
          {content.title.charAt(0).toUpperCase()}
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-hidden transition-shadow duration-300 bg-white shadow-md rounded-xl hover:shadow-xl group">
      <div className="relative overflow-hidden">
        {getThumbnail()}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(content.category)}`}>
            {content.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2">
          {content.title}
        </h3>
        <p className="mb-4 text-sm text-gray-600 line-clamp-2">
          {content.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {new Date(content.created_at).toLocaleDateString()}
          </div>
          <button
            onClick={() => onView(content)}
            className="flex items-center px-4 py-2 space-x-1 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </button>
        </div>
      </div>
    </div>
  );
}
