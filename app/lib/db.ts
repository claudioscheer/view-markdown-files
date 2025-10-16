import { openDB } from 'idb';

export type MarkdownFile = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
};

interface MarkdownDB {
  files: {
    key: string;
    value: MarkdownFile;
    indexes: {
      'by-title': string;
      'by-updated': number;
    };
  };
}

const DB_NAME = 'markdown-viewer';
const DB_VERSION = 1;
const STORE_NAME = 'files';

let dbInstance: any = null;

async function getDB() {
  if (dbInstance) return dbInstance;

  dbInstance = await openDB<MarkdownDB>(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('by-title', 'title');
        store.createIndex('by-updated', 'updatedAt');
      }
    },
  });

  return dbInstance;
}

export const markdownDB = {
  async getAll(): Promise<MarkdownFile[]> {
    const db = await getDB();
    const files = await db.getAll(STORE_NAME);
    return files.sort((a: MarkdownFile, b: MarkdownFile) => b.updatedAt - a.updatedAt);
  },

  async getById(id: string): Promise<MarkdownFile | undefined> {
    const db = await getDB();
    return await db.get(STORE_NAME, id);
  },

  async add(title: string, content: string): Promise<MarkdownFile> {
    const db = await getDB();
    const newFile: MarkdownFile = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await db.add(STORE_NAME, newFile);
    
    // Dispatch event for reactivity
    window.dispatchEvent(new CustomEvent('markdown-db-update'));
    
    return newFile;
  },

  async update(id: string, title: string, content: string): Promise<void> {
    const db = await getDB();
    const file = await db.get(STORE_NAME, id);
    
    if (file) {
      const updatedFile: MarkdownFile = {
        ...file,
        title,
        content,
        updatedAt: Date.now(),
      };
      await db.put(STORE_NAME, updatedFile);
      
      // Dispatch event for reactivity
      window.dispatchEvent(new CustomEvent('markdown-db-update'));
    }
  },

  async delete(id: string): Promise<void> {
    const db = await getDB();
    await db.delete(STORE_NAME, id);
    
    // Dispatch event for reactivity
    window.dispatchEvent(new CustomEvent('markdown-db-update'));
  },

  async searchByTitle(query: string): Promise<MarkdownFile[]> {
    const db = await getDB();
    const allFiles = await db.getAll(STORE_NAME);
    return allFiles.filter((file: MarkdownFile) => 
      file.title.toLowerCase().includes(query.toLowerCase())
    );
  },

  async count(): Promise<number> {
    const db = await getDB();
    return await db.count(STORE_NAME);
  },

  // Export all data as JSON for backup
  async exportAll(): Promise<string> {
    const files = await this.getAll();
    return JSON.stringify(files, null, 2);
  },

  // Import data from JSON backup
  async importAll(jsonData: string): Promise<void> {
    const files: MarkdownFile[] = JSON.parse(jsonData);
    const db = await getDB();
    
    const tx = db.transaction(STORE_NAME, 'readwrite');
    for (const file of files) {
      await tx.store.put(file);
    }
    await tx.done;
    
    window.dispatchEvent(new CustomEvent('markdown-db-update'));
  },
};

