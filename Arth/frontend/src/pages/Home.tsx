import { useEffect, useState } from 'react';
import { contentService, Content } from '../lib/supabase';
import ContentCard from '../components/ContentCard';
import ContentModal from '../components/ContentModal';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      const contentsData = await contentService.getAllContent();
      setContents(contentsData);
    } catch (error) {
      console.error('Error fetching contents:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Discover Artificial Research & Technology Hub
        </h1>
        <p className="text-lg text-gray-600">
          Explore our collection of images, videos, stories, and more
        </p>
      </div>

      {contents.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-500">No content yet. Be the first to upload!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contents.map((content) => (
            <ContentCard
              key={content.id}
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
