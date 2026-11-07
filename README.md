# LinkSnap

Turn screenshots of tools, sites and articles into a searchable, categorized library of links.

**Live app:** [linksnapai.vercel.app](https://linksnapai.vercel.app) · no sign-up needed · installable as a PWA

## Why I built it

I screenshot useful tools and articles all the time, then never find them again. A gallery can't search them, and retyping a URL from an image is slow. LinkSnap reads the screenshot, works out what the product is, and saves it as a link you can actually search.

## Features

- **Screenshot or URL in, structured entry out:** name, official URL, category, description, pricing and platforms
- **Search and filter** your saved items by category
- **Local-first:** your library lives in your browser's storage, with no account and no server-side database
- **Bring your own Gemini API key:** the key stays on your device and is only sent to the analysis endpoint for each request
- **Installable PWA** with offline viewing of saved items
- **Export** your library to PDF

## How it works

```
Browser (React PWA) ──image / URL + your API key──▶ /api/analyze (Vercel function) ──▶ Gemini 2.5 Flash-Lite
        ▲                                                                                     │
        └──────────────────────── structured JSON (name, url, category, …) ◀──────────────────┘
```

- `api/analyze.ts` is a Vercel serverless function. It validates the request, strips HTML and control characters from input, only accepts `http`/`https` URLs, and asks Gemini for a JSON response with a fixed schema.
- `services/storageService.ts` persists the library in `localStorage`. Nothing is stored server-side.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS · Gemini API (`@google/generative-ai`) · Vercel serverless functions · vite-plugin-pwa · jsPDF

## Running locally

```bash
git clone https://github.com/sumanthkatta-dev/linksnap.git
cd linksnap
npm install
npm run dev
```

Open the app, paste a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey) in Settings, and drop in a screenshot.

## Project structure

```
api/analyze.ts        Serverless endpoint that calls Gemini
components/           UI (uploader, bookmark list, filters, settings, docs pages)
services/             Gemini client, API-key handling, local storage
public/               PWA manifest, icons, robots.txt, llms.txt
```

## Roadmap

- Bulk import of a whole screenshots folder
- Optional sync across devices
- Full-text search across descriptions and tags
