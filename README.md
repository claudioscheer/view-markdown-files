# Markdown Viewer

A minimal, mobile-first PWA for storing and viewing markdown files with local storage.

## Features

- 📝 **Create, edit, and delete** markdown files
- 📱 **Mobile-first design** with responsive layout
- 🔄 **PWA support** - install as a native app
- 💾 **Local storage** - files persist between sessions
- 🎨 **Clean UI** built with shadcn/ui components
- 📖 **Full-screen reading** with auto-hiding header
- ⚡ **Fast navigation** with React Router

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

```bash
npm run build
```

## Deployment

### GitHub Pages (Automatic)

The app automatically deploys to GitHub Pages on every push to `main`.

**Setup (one-time):**

1. Go to your repository on GitHub: `https://github.com/claudioscheer/view-markdown-files`
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Wait for the workflow to complete (check **Actions** tab)
5. Your app will be live at: `https://claudioscheer.github.io/view-markdown-files/`

**To deploy a new version:**
```bash
git add .
git commit -m "your changes"
git push
```

The GitHub Action will automatically build and deploy!

## Usage

1. **Create** a new markdown file by clicking "New File"
2. **Edit** existing files by clicking the edit icon
3. **View** files in full-screen mode by clicking the eye icon
4. **Delete** files with confirmation by clicking the trash icon

## PWA Installation

- **Android**: Open in Chrome → Menu → "Install app"
- **iOS**: Open in Safari → Share → "Add to Home Screen"

## Tech Stack

- React Router v7 (SPA mode)
- TypeScript
- Tailwind CSS
- shadcn/ui
- react-markdown
- vite-plugin-pwa (Workbox)
- LocalStorage API

## PWA Features

- ✅ **Auto-updates** - New versions install automatically
- ✅ **Offline support** - Works without internet after first load
- ✅ **Smart caching** - Assets cached with automatic invalidation
- ✅ **Installable** - Add to home screen on any device

## License

MIT