import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contentService, Content } from '../lib/supabase';
import { Upload as UploadIcon, Loader2, CheckCircle } from 'lucide-react';

export default function Upload() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'image',
    content_text: '',
    image_url: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fileUrl = null;

      // Use image URL if provided, otherwise process uploaded file
      if (formData.image_url) {
        fileUrl = formData.image_url;
      } else if (file && (formData.category === 'image' || formData.category === 'video' || formData.category === 'pdf')) {
        // Convert file to base64 for storage
        fileUrl = await new Promise<string>((resolve) => {
          const fileReader = new FileReader();
          fileReader.onload = (e) => {
            const result = e.target?.result as string;
            console.log('File converted to base64, length:', result.length);
            console.log('File type:', result.substring(0, 50));
            resolve(result);
          };
          fileReader.readAsDataURL(file);
        });
      }

      const newContent: Omit<Content, '_id' | 'created_at'> = {
        title: formData.title,
        description: formData.description,
        category: formData.category as Content['category'],
        content_text: formData.content_text,
        ...(fileUrl && { file_url: fileUrl })
      };

      await contentService.createContent(newContent);

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error: any) {
      console.error('Error uploading content:', error);
      let errorMessage = 'Error uploading content. Please try again.';

      if (error.message) {
        errorMessage = error.message;
      } else if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Auto-set category based on file type
      if (selectedFile.type === 'application/pdf') {
        setFormData(prev => ({ ...prev, category: 'pdf' }));
      } else if (selectedFile.type.startsWith('image/')) {
        setFormData(prev => ({ ...prev, category: 'image' }));
      } else if (selectedFile.type.startsWith('video/')) {
        setFormData(prev => ({ ...prev, category: 'video' }));
      }
    }
  };

  const needsFile = formData.category === 'image' || formData.category === 'video' || formData.category === 'pdf';
  const needsText = ['story', 'letter', 'article', 'news'].includes(formData.category);
  const canHaveImage = true; // All categories can have an image

  return (
    <div className="max-w-3xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
      <div className="p-8 bg-white shadow-lg rounded-2xl">
        <div className="flex items-center mb-8">
          <UploadIcon className="w-8 h-8 mr-3 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Upload Content</h1>
            <p className="mt-1 text-gray-600">Share your images, videos, or writings</p>
          </div>
        </div>

        {success ? (
          <div className="py-12 text-center">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h2 className="mb-2 text-2xl font-bold text-gray-900">Content Uploaded!</h2>
            <p className="text-gray-600">Redirecting to homepage...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter a catchy title"
              />
            </div>

            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="pdf">PDF Document</option>
                <option value="story">Story</option>
                <option value="letter">Letter</option>
                <option value="article">Article</option>
                <option value="news">News</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of your content"
              />
            </div>

            <div>
              <label htmlFor="image_url" className="block mb-2 text-sm font-medium text-gray-700">
                Image URL (Optional)
              </label>
              <input
                type="url"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              <p className="mt-1 text-sm text-gray-500">Add an online image link for thumbnail. This works for all content types.</p>
            </div>

            {needsFile && (
              <div>
                <label htmlFor="file" className="block mb-2 text-sm font-medium text-gray-700">
                  {formData.category === 'image' ? 'Image' : formData.category === 'video' ? 'Video' : 'PDF Document'} File
                </label>
                <input
                  type="file"
                  id="file"
                  accept={formData.category === 'image' ? 'image/*' : formData.category === 'video' ? 'video/*' : '.pdf'}
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {file && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            )}

            {needsText && (
              <div>
                <label htmlFor="content_text" className="block mb-2 text-sm font-medium text-gray-700">
                  Content Text *
                </label>
                <textarea
                  id="content_text"
                  name="content_text"
                  required
                  value={formData.content_text}
                  onChange={handleInputChange}
                  rows={12}
                  className="w-full px-4 py-3 font-mono border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your content here..."
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full py-4 font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadIcon className="w-5 h-5 mr-2" />
                  Upload Content
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
