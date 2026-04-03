# 🎵 Music Stream

A Spotify-inspired music streaming platform built as a school project. Hosted entirely on **free cloud services** — no credit card required.

## Tech Stack

- **Frontend**: Next.js 14 (App Router) + Tailwind CSS → [Vercel](https://vercel.com)
- **Backend**: Node.js / Express REST API → [Render](https://render.com)
- **Database**: PostgreSQL via [Supabase](https://supabase.com) (free tier)
- **Auth**: Supabase Auth (email/password)
- **Audio Storage**: Supabase Storage
- **Music**: Royalty-free tracks from [Free Music Archive](https://freemusicarchive.org)

## Features

- 🔐 User authentication (register, login, logout)
- 🎵 Music player with play/pause, skip, progress bar, volume control
- 🔍 Search songs by title or artist
- 📁 Browse by genre and artist
- ❤️ Save songs to favorites
- 📱 Responsive dark-themed UI

## Project Structure

```
music-stream/
├── frontend/          # Next.js app
├── backend/           # Express REST API
├── supabase/          # Database schema & seed data
│   ├── schema.sql
│   └── seed.sql
└── README.md
```

## Setup Instructions

### 1. Supabase (Database & Auth)

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** and run `supabase/schema.sql`
4. Then run `supabase/seed.sql`
5. Go to **Storage** and create two **public** buckets: `audio` and `covers`
6. Download royalty-free MP3s from [freemusicarchive.org](https://freemusicarchive.org) and upload to the `audio` bucket
7. Update the `audio_url` values in the `songs` table to match your Storage URLs:
   ```
   https://<your-project>.supabase.co/storage/v1/object/public/audio/<filename>.mp3
   ```
8. Note your **Project URL** and **anon key** from Settings > API

### 2. Backend (Express API)

```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=4000
SUPABASE_URL=https://<your-project>.supabase.co
SUPABASE_SERVICE_KEY=<your-service-role-key>
FRONTEND_URL=http://localhost:3000
```

Start the dev server:
```bash
npm run dev
```

### 3. Frontend (Next.js)

```bash
cd frontend
npm install
```

Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

Start the dev server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo, set **Root Directory** to `backend`
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`
6. Add environment variables: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `FRONTEND_URL`, `PORT`

> ⚠️ Free Render services spin down after 15 min of inactivity. First request after idle takes ~30s.

### Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo, set **Root Directory** to `frontend`
3. Add environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_API_URL`
4. Deploy!

## Free Tier Limits

| Service  | Limit                                      |
|----------|---------------------------------------------|
| Supabase | 500MB database, 1GB storage, 50K MAUs       |
| Render   | 750 hrs/month, spins down after 15min idle   |
| Vercel   | 100GB bandwidth, serverless functions        |

## License

This project is for educational purposes. All music content is royalty-free.
