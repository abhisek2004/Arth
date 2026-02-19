import { X, Calendar } from 'lucide-react';
import { Content } from '../lib/supabase';

interface ContentModalProps {
  content: Content | null;
  onClose: () => void;
}

export default function ContentModal({ content, onClose }: ContentModalProps) {
  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{content.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {content.file_url && (content.category === 'image' || content.category === 'video') && (
            <div className="mb-6 rounded-lg overflow-hidden">
              {content.category === 'image' ? (
                <img src={content.file_url} alt={content.title} className="w-full" />
              ) : (
                <video src={content.file_url} controls className="w-full" />
              )}
            </div>
          )}

          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {content.category}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(content.created_at).toLocaleDateString()}
            </div>
          </div>

          {content.description && (
            <p className="text-gray-700 mb-4 text-lg">{content.description}</p>
          )}

          {content.content_text && (
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {content.content_text}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
