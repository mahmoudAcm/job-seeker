'use client';
import { type EdgeStoreRouter } from '@/src/app/api/edgestore/[...edgestore]/route';
import { createEdgeStoreProvider } from '@edgestore/react';

export const { EdgeStoreProvider, useEdgeStore } = createEdgeStoreProvider<EdgeStoreRouter>({
  maxConcurrentUploads: 1
});
