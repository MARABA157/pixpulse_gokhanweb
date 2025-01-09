import React from 'react';
import LoadingSpinner from '../ui/LoadingSpinner';

interface GenerationDisplayProps {
  loading: boolean;
  image: string | null;
  video: string | null;
  style: string;
}

export default function GenerationDisplay({ loading, image, video, style }: GenerationDisplayProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="relative min-h-[300px] rounded-lg overflow-hidden bg-gray-50">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <LoadingSpinner />
            <p className="mt-4 text-gray-500">
              {!image ? 'Görsel oluşturuluyor...' : 'Görsel canlandırılıyor...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!image && !video) {
    return (
      <div className="relative min-h-[300px] rounded-lg overflow-hidden bg-gray-50">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 space-y-2">
          <p>AI sanat oluşturmak için butona tıklayın</p>
          <p className="text-sm">Önce görsel oluşturulacak, sonra canlandırılacak</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {image && (
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={image}
            alt="Generated AI Art"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            Oluşturulan Görsel
          </div>
        </div>
      )}

      {video && (
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <iframe
            src={video}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {style}
          </div>
        </div>
      )}
    </div>
  );
}