# ChefAI - AI-Powered Cooking Assistant

## Features
- User authentication
- Recipe creation and management
- Favorite recipes
- AI recipe generation
- Responsive design

## Setup

### Backend
1. Create `.env` file in `/server`:
```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
GOOGLE_VISION_API_KEY=your_key
USDA_API_KEY=your_key
GEMINI_API_KEY=your_key
```

2. Install dependencies:
```bash
cd server
npm install
```

3. Start server:
```bash
node index.js
```

### Frontend
1. Create `.env` file in `/client`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

2. Install dependencies:
```bash
cd client
npm install
```

3. Start frontend:
```bash
npm run dev
```

### Deployment
- Deploy backend to services like Render or Heroku
- Deploy frontend to Vercel or Netlify

## Production Scripts

### In `server/package.json`
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

### In `client/package.json`
```json
"scripts": {
  "build": "vite build",
  "preview": "vite preview"
}
