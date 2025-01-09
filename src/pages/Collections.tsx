import React from 'react';
import { useCollections } from '../hooks/useCollections';
import CollectionGrid from '../components/collections/CollectionGrid';
import CreateCollection from '../components/collections/CreateCollection';
import { useAuthContext } from '../contexts/AuthContext';

export default function Collections() {
  const { user } = useAuthContext();
  const { collections, loading, createCollection } = useCollections();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Koleksiyonlarım</h1>
        {user && <CreateCollection onCreate={createCollection} />}
      </div>
      
      <CollectionGrid collections={collections} loading={loading} />
    </div>
  );
}