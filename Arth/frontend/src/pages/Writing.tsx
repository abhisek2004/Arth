import { useEffect, useState } from 'react';
import { contentService, Content } from '../lib/supabase';
import ContentCard from '../components/ContentCard';
import ContentModal from '../components/ContentModal';
import { Loader2, FileText } from 'lucide-react';

export default function Writing() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  useEffect(() => {
    fetchWritingContents();
  }, []);

  const fetchWritingContents = async () => {
    try {
      // Fetch all writing categories
      const storyContents = await contentService.getContentByCategory('story');
      const letterContents = await contentService.getContentByCategory('letter');
      const articleContents = await contentService.getContentByCategory('article');
      const allWritingContents = [...storyContents, ...letterContents, ...articleContents].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setContents(allWritingContents);
    } catch (error) {
      console.error('Error fetching writing contents:', error);
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
      <div className="flex items-center justify-center mb-12">
        <FileText className="w-10 h-10 mr-3 text-blue-600" />
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Writing Collection</h1>
          <p className="mt-2 text-lg text-gray-600">Stories, letters, and articles</p>
        </div>
      </div>

      {contents.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-gray-500">No writing content available yet.</p>
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
