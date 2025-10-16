export type MarkdownFile = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
};

const STORAGE_KEY = 'markdown-files';

export const markdownStorage = {
  getAll(): MarkdownFile[] {
    if (typeof window === 'undefined') return [];
    
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (error) {
        console.error('Failed to parse stored markdown files:', error);
        return [];
      }
    }
    return [];
  },

  getById(id: string): MarkdownFile | undefined {
    return this.getAll().find((file) => file.id === id);
  },

  add(title: string, content: string): MarkdownFile {
    const newFile: MarkdownFile = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const files = this.getAll();
    const updatedFiles = [...files, newFile];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFiles));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('markdown-storage-update'));
    
    return newFile;
  },

  update(id: string, title: string, content: string): void {
    const files = this.getAll();
    const updatedFiles = files.map((file) =>
      file.id === id
        ? { ...file, title, content, updatedAt: Date.now() }
        : file
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFiles));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('markdown-storage-update'));
  },

  delete(id: string): void {
    const files = this.getAll();
    const updatedFiles = files.filter((file) => file.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFiles));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('markdown-storage-update'));
  },
};

