import { useState, useEffect } from 'react';
import { markdownDB, type MarkdownFile } from '~/lib/db';

export function useMarkdownStorage() {
  const [files, setFiles] = useState<MarkdownFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadFiles() {
      try {
        const allFiles = await markdownDB.getAll();
        if (mounted) {
          setFiles(allFiles);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Failed to load files:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadFiles();

    // Listen for database updates from other components
    const handleDBUpdate = () => {
      loadFiles();
    };

    window.addEventListener('markdown-db-update', handleDBUpdate);
    
    return () => {
      mounted = false;
      window.removeEventListener('markdown-db-update', handleDBUpdate);
    };
  }, []);

  return {
    files,
    isLoading,
    addFile: markdownDB.add.bind(markdownDB),
    updateFile: markdownDB.update.bind(markdownDB),
    deleteFile: markdownDB.delete.bind(markdownDB),
    getFile: markdownDB.getById.bind(markdownDB),
  };
}

export { type MarkdownFile } from '~/lib/db';

