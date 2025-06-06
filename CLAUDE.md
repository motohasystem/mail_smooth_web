# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MailSmooth is a web-based text processing tool designed to prepare email newsletters (メルマガ) for text-to-speech conversion. It's deployed as a Progressive Web App at https://motohasystem.github.io/mail_smooth_web/.

The application performs three main text transformations:
- URL replacement: Converts URLs to "(URL)" for better speech readability
- Separator removal: Removes repetitive symbols (=====, -----, ━━━━━, etc.)
- Text splitting: Divides text into chunks based on character limits

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build for production (outputs to /docs for GitHub Pages)
npm run build

# Run tests
npm test
```

## Architecture

### Core Components

- **src/mailbody_tinker.ts**: Main text processing logic containing URL detection, separator removal, and text splitting algorithms
- **src/main.ts**: Application entry point handling UI interactions and PWA setup
- **src/clipboard_manager.ts**: Manages clipboard operations for copy functionality
- **src/service-worker.js**: PWA service worker for offline functionality and share target handling

### Build System

The project uses Parcel v2 for bundling with specific configuration:
- Production builds output to `/docs` directory (for GitHub Pages hosting)
- Public URL is set to `/mail_smooth_web/` for correct asset paths
- Service worker generation for PWA functionality
- TypeScript compilation with strict mode enabled

### Testing

Jest is configured with TypeScript support:
- Test files: `src/*.test.ts`
- Custom transformer for JavaScript files
- Run individual tests: `npm test -- mailbody_tinker.test.ts`

### Deployment

The application can be deployed via:
1. **GitHub Pages**: Push to main branch, build outputs to `/docs`
2. **Docker**: `docker-compose up` runs Nginx container on port 4444

## Key Implementation Details

- The app registers as a Web Share Target to receive shared text from other applications
- Bootstrap 5.2.3 is used for UI styling
- TypeScript strict mode is enabled - ensure all types are properly defined
- The service worker enables offline functionality and handles shared text