// API Configuration for SmartMeet AI
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const API_URL = API_BASE_URL;

// API Endpoints
export const API_ENDPOINTS = {
  // Meetings
  CREATE_MEETING: `${API_BASE_URL}/api/v1/meetings/create`,
  JOIN_MEETING: `${API_BASE_URL}/api/v1/meetings/join`,
  GET_MEETING: (id: string) => `${API_BASE_URL}/api/v1/meetings/${id}`,
  
  // Video Upload
  UPLOAD_VIDEO: `${API_BASE_URL}/api/v1/railway/upload`,
  UPLOAD_THUMBNAIL: `${API_BASE_URL}/api/v1/railway/upload-thumbnail`,
  
  // Storage
  GET_STORAGE_INFO: `${API_BASE_URL}/api/v1/railway/storage-info`,
  DELETE_VIDEO: (id: string) => `${API_BASE_URL}/api/v1/railway/delete/${id}`,
  
  // Health
  HEALTH: `${API_BASE_URL}/health`,
  DOCS: `${API_BASE_URL}/docs`,
} as const;

// API Client
export const apiClient = {
  async get(endpoint: string) {
    const response = await fetch(endpoint);
    return response.json();
  },
  
  async post(endpoint: string, data?: any) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    return response.json();
  },
  
  async upload(endpoint: string, formData: FormData) {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },
  
  async delete(endpoint: string) {
    const response = await fetch(endpoint, {
      method: 'DELETE',
    });
    return response.json();
  },
};

export default apiClient;
