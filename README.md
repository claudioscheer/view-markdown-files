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

## Usage

1. **Create** a new markdown file by clicking "New File"
2. **Edit** existing files by clicking the edit icon
3. **View** files in full-screen mode by clicking the eye icon
4. **Delete** files with confirmation by clicking the trash icon

## PWA Installation

- **Android**: Open in Chrome → Menu → "Install app"
- **iOS**: Open in Safari → Share → "Add to Home Screen"

## Tech Stack

- React Router v7
- TypeScript
- Tailwind CSS
- shadcn/ui
- react-markdown
- LocalStorage API

## License

MIT