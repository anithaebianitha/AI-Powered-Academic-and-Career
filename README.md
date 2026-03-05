# AI-Powered Academic and Career Recommendation Framework

Production-ready MERN application that helps students assess skills, discover career paths, identify skill gaps, and generate learning roadmaps.

## Tech Stack
- **Frontend:** React.js + Bootstrap + Chart.js
- **Backend:** Node.js + Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcrypt
- **AI Logic:** Rule-based skill matching and simple ML-style scoring

## Project Structure
```
backend/
  controllers/
  middleware/
  models/
  routes/
  scripts/
  utils/
  server.js
frontend/
  public/
  src/
    components/
    context/
    pages/
    services/
    App.js
```

## Features
- Student registration/login with encrypted passwords
- JWT-protected profile and dashboard
- Skill assessment (7 categories, 1–5 ratings)
- Career recommendations (top 3 by match score)
- Skill gap analysis
- Learning roadmap generation (courses/videos/projects)
- Admin panel for career CRUD and student reports
- Chart-based dashboard visualization
- PDF download for recommendation reports

## Backend Setup
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

## Frontend Setup
```bash
cd frontend
npm install
npm start
```

## API Endpoints
### Auth
- `POST /api/register`
- `POST /api/login`

### Student
- `GET /api/profile`
- `POST /api/skill-assessment`
- `GET /api/recommend-careers`
- `GET /api/skill-gap`
- `GET /api/roadmap`

### Admin
- `POST /api/career`
- `GET /api/careers`
- `PUT /api/career/:id`
- `DELETE /api/career/:id`
- `GET /api/admin/reports`

## Deployment Notes
- Set `MONGO_URI`, `JWT_SECRET`, and `PORT` in backend env.
- Set `REACT_APP_API_URL` in frontend env for production API URL.
- Build frontend with `npm run build` and serve via Nginx or static host.
