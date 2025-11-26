# CarbonTrack – Coal Emissions Monitoring Platform

CarbonTrack is a full‑stack web application for tracking, analyzing, and reporting carbon emissions from coal mining operations. It provides real‑time monitoring dashboards, emissions analytics, neutralisation tracking, and sinks management, with a modern React frontend and a Node.js/Express + MongoDB backend.

---

## Project Structure

```text
404 Founders/
├─ backend/           # Node.js / Express API
│  ├─ server.js       # Entry point
│  ├─ package.json
│  ├─ config/
│  │  └─ db.js        # MongoDB connection
│  ├─ controller/
│  │  ├─ dataController.js
│  │  ├─ emissionController.js
│  │  └─ userController.js
│  ├─ middleware/
│  │  ├─ authMiddleware.js
│  │  └─ errorMiddleware.js
│  ├─ model/
│  │  ├─ emissionModel.js
│  │  └─ userModel.js
│  ├─ routes/
│  │  ├─ dataRoutes.js
│  │  ├─ emissionRoutes.js
│  │  └─ userRoutes.js
│  └─ utils/
│     └─ generateToken.js
│
└─ frontend/          # React + Vite SPA
   ├─ package.json
   ├─ vite.config.js
   ├─ index.html
   └─ src/
      ├─ App.jsx
      ├─ main.jsx
      ├─ App.css / index.css
      ├─ EmissionsContext.jsx
      ├─ components/
      │  ├─ Hero.jsx
      │  ├─ Navbar.jsx
      │  ├─ ImageUpload.jsx
      │  ├─ AnalysisResults.jsx
      │  ├─ DoughnutChart.jsx
      │  ├─ TrendsChart.jsx
      │  └─ NeutralizationChart.jsx
      ├─ context/
      │  └─ AuthContext.jsx
      ├─ data/
      │  ├─ india.geojson
      │  └─ indiaGeoJson.js
      ├─ pages/
      │  ├─ Home.jsx
      │  ├─ Dashboard.jsx
      │  ├─ Emissions.jsx
      │  ├─ Neutralisation.jsx
      │  ├─ Sinks.jsx
      │  ├─ Reports.jsx
      │  ├─ MapPage.jsx
      │  └─ AmbeePage.jsx
      └─ utils/
         ├─ api.js
         └─ api.jsx
```

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- Tailwind‑style utility classes (via CSS)
- Context API for auth and emissions state
- Chart components for emissions / neutralisation visualization

**Backend**
- Node.js / Express
- MongoDB (via Mongoose)
- JWT authentication
- REST APIs for users, emissions, and external data (e.g. Ambee, map data)

---

## Getting Started

### 1. Prerequisites

- Node.js (LTS recommended)
- npm or yarn
- MongoDB instance (local or cloud, e.g. MongoDB Atlas)

### 2. Backend Setup

From the `backend` folder:

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (example):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/carbontrack
JWT_SECRET=your_jwt_secret
AMBIENT_API_KEY=your_ambee_or_external_api_key
```

Run the backend server:

```bash
npm start
```

By default the API will run on `http://localhost:5000` (check `server.js` if different).

### 3. Frontend Setup

From the `frontend` folder:

```bash
cd frontend
npm install
```

Create a `.env` file (location depends on how `api.js` is coded), e.g.:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Run the frontend dev server:

```bash
npm run dev
```

Open the printed URL (usually `http://localhost:5173`).

---

## Core Features

### Home & Marketing Pages
- Hero section with overview and primary CTA.
- Feature highlights, “How it Works”, “Why Choose Us”, testimonials and CTA sections.
- Glassmorphism navbar and full‑screen hero background.

### Authentication
- User registration & login.
- JWT‑based auth stored client‑side.
- Protected routes for dashboards and reports using `AuthContext`.

### Emissions & Analytics
- Upload and analyze emissions data via `ImageUpload` and `AnalysisResults`.
- Emissions charts using `DoughnutChart`, `TrendsChart`, `NeutralizationChart`.
- Emissions context provider for sharing data across pages.

### Operational Views
- `Dashboard.jsx` – High‑level KPIs and trends.
- `Emissions.jsx` – Detailed emissions breakdowns.
- `Neutralisation.jsx` – Neutralisation projects and progress.
- `Sinks.jsx` – Carbon sinks tracking.
- `Reports.jsx` – Reporting and export‑oriented views.
- `MapPage.jsx` + `AmbeePage.jsx` – Geo‑visualisation and external air‑quality / emissions data (using `india.geojson` and Ambee‑style APIs).

---

## API Overview (Backend)

High‑level REST endpoints (exact routes in `routes/*.js`):

- `POST /api/users/register` – Create a new user.
- `POST /api/users/login` – Authenticate and return JWT.
- `GET /api/users/profile` – Get current user data (auth required).

- `GET /api/emissions` – List emissions records.
- `POST /api/emissions` – Create a new emission entry.
- `GET /api/emissions/:id` – Get details for a specific emission.

- `GET /api/data/...` – External / Ambee / map‑related data (see `dataRoutes.js`, `dataController.js`).

Authentication is typically handled via `Authorization: Bearer <token>` headers and `authMiddleware.js`.

---

## Development Tips

- If either `npm start` (backend) or `npm run dev` (frontend) fails, check:
  - `.env` files exist and values are valid.
  - MongoDB is running and accessible from `MONGO_URI`.
  - `VITE_API_BASE_URL` matches your backend URL.

- To add new pages:
  - Create a component under `src/pages/`.
  - Register it in `App.jsx` with `react-router-dom` routes.
  - Use `Navbar.jsx` for navigation links.

---

## Scripts

**Backend (`backend/package.json`):**
- `npm start` – Start Express server.

**Frontend (`frontend/package.json`):**
- `npm run dev` – Start Vite dev server.
- `npm run build` – Production build.
- `npm run preview` – Preview production build locally.
- `npm run lint` – Lint frontend code (if configured).

---

## Future Improvements

- Add automated tests (Jest / React Testing Library, supertest for backend).
- CI/CD pipeline and deployment docs (e.g. Render, Vercel, or Azure).
- Role‑based access control for different user types.
- More granular emissions forecasting and what‑if analysis.

---

## License

Internal / proprietary project. Add a license here if you plan to open‑source it.
