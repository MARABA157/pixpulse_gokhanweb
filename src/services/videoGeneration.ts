import axios from 'axios';

interface VideoGenerationParams {
  description: string;
  duration: number;
  style: string;
}

interface VideoGenerationResponse {
  videoUrl: string;
  status: 'completed' | 'processing' | 'failed';
  error?: string;
}

// Bu API anahtarını .env dosyasına taşıyın
const API_KEY = process.env.VITE_VIDEO_AI_API_KEY;

export const generateVideo = async (params: VideoGenerationParams): Promise<VideoGenerationResponse> => {
  try {
    // Bu örnek bir API çağrısıdır. Gerçek API endpoint'inizi kullanın
    const response = await axios.post(
      'https://api.videogeneration.ai/v1/generate',
      {
        prompt: params.description,
        duration: params.duration,
        style: params.style,
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      videoUrl: response.data.videoUrl,
      status: 'completed',
    };
  } catch (error) {
    console.error('Video generation error:', error);
    return {
      videoUrl: '',
      status: 'failed',
      error: 'Video oluşturulurken bir hata oluştu',
    };
  }
};
