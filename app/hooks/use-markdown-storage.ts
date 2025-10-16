import { useState, useEffect } from 'react';
import { markdownStorage, type MarkdownFile } from '~/lib/markdown-storage';

export function useMarkdownStorage() {
  const [files, setFiles] = useState<MarkdownFile[]>([]);

  useEffect(() => {
    // Initial load
    setFiles(markdownStorage.getAll());

    // Listen for storage updates from other components
    const handleStorageUpdate = () => {
      setFiles(markdownStorage.getAll());
    };

    window.addEventListener('markdown-storage-update', handleStorageUpdate);
    
    return () => {
      window.removeEventListener('markdown-storage-update', handleStorageUpdate);
    };
  }, []);

  return {
    files,
    addFile: markdownStorage.add.bind(markdownStorage),
    updateFile: markdownStorage.update.bind(markdownStorage),
    deleteFile: markdownStorage.delete.bind(markdownStorage),
    getFile: markdownStorage.getById.bind(markdownStorage),
  };
}

