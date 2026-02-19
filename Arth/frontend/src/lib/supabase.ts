// Frontend API service that communicates with backend
const API_BASE_URL = 'http://localhost:5000/api';

async function apiCall(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
}

export interface Content {
  _id?: string;
  title: string;
  description: string;
  category: 'image' | 'video' | 'story' | 'letter' | 'article' | 'news';
  file_url?: string;
  content_text: string;
  created_at: Date;
}

// Helper functions for content operations
export const contentService = {
  async getAllContent(): Promise<Content[]> {
    return await apiCall('/contents');
  },

  async getContentByCategory(category: string): Promise<Content[]> {
    return await apiCall(`/contents/category/${category}`);
  },

  async createContent(content: Omit<Content, '_id' | 'created_at'>): Promise<Content> {
    return await apiCall('/contents', {
      method: 'POST',
      body: JSON.stringify(content),
    });
  },

  async getContentById(id: string): Promise<Content | null> {
    try {
      return await apiCall(`/contents/${id}`);
    } catch (error: any) {
      if (error.message && error.message.includes('404')) {
        return null;
      }
      throw error;
    }
  }
};
