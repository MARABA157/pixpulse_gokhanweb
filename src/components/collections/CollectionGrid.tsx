import React from 'react';
import { Link } from 'react-router-dom';
import { Collection } from '../../types/artwork';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';

interface CollectionGridProps {
  collections: Collection[];
  onDelete?: (id: string) => void;
  onEdit?: (collection: Collection) => void;
}

const CollectionGrid: React.FC<CollectionGridProps> = ({
  collections,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {collections.map((collection) => (
        <motion.div
          key={collection.id}
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <Link to={`/collections/${collection.id}`}>
            <div className="h-48 bg-gray-200 relative">
              {collection.cover_image ? (
                <img
                  src={collection.cover_image}
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No cover image
                </div>
              )}
            </div>
          </Link>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Link to={`/collections/${collection.id}`}>
                <h3 className="text-lg font-semibold hover:text-blue-600">
                  {collection.name}
                </h3>
              </Link>
              <div className="flex space-x-2">
                {onEdit && (
                  <button
                    onClick={() => onEdit(collection)}
                    className="p-1 text-gray-600 hover:text-blue-600"
                  >
                    <Edit2 size={16} />
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(collection.id)}
                    className="p-1 text-gray-600 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
            {collection.description && (
              <p className="text-sm text-gray-600 line-clamp-2">
                {collection.description}
              </p>
            )}
            <div className="mt-4 text-sm text-gray-500">
              {collection.artwork_count || 0} artworks
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CollectionGrid;
