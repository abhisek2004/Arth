import { useEffect, useState } from 'react';
import { contentService, Content } from '../lib/supabase';
import ContentCard from '../components/ContentCard';
import ContentModal from '../components/ContentModal';
import { Image as ImageIcon } from 'lucide-react';

export default function Media() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  useEffect(() => {
    fetchMediaContents();
  }, []);

  const fetchMediaContents = async () => {
    try {
      // Fetch both image and video categories
      const imageContents = await contentService.getContentByCategory('image');
      const videoContents = await contentService.getContentByCategory('video');
      const allMediaContents = [...imageContents, ...videoContents].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setContents(allMediaContents);
    } catch (error) {
      console.error('Error fetching media contents:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-center mb-12">
        <ImageIcon className="w-10 h-10 mr-3 text-blue-600" />
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Media Gallery</h1>
          <p className="mt-2 text-lg text-gray-600">Browse images and videos</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden bg-white rounded-xl shadow-md animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200" />
              <div className="p-5 space-y-3">
                <div className="w-3/4 h-4 bg-gray-200 rounded" />
                <div className="w-full h-3 bg-gray-200 rounded" />
                <div className="flex items-center justify-between pt-2">
                  <div className="w-20 h-3 bg-gray-200 rounded" />
                  <div className="w-24 h-8 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : contents.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-500">No media content available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contents.map((content) => (
            <ContentCard
              key={content._id ?? content.title}
              content={content}
              onView={setSelectedContent}
            />
          ))}
        </div>
      )}

      <ContentModal
        content={selectedContent}
        onClose={() => setSelectedContent(null)}
      />
    </div>
  );
}
