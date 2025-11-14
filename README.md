# 🚀 MERN Stack Deployment Project

A full-stack MERN (MongoDB, Express, React, Node.js) application with complete CI/CD pipeline setup and production deployment configurations.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
  - [Backend Deployment](#backend-deployment)
  - [Frontend Deployment](#frontend-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring and Health Checks](#monitoring-and-health-checks)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Backend (Express.js)
- ✅ RESTful API with Express.js
- ✅ MongoDB with Mongoose ODM
- ✅ JWT-based authentication
- ✅ Secure HTTP headers with Helmet
- ✅ Rate limiting
- ✅ Request logging with Morgan
- ✅ Input validation with express-validator
- ✅ Error handling middleware
- ✅ Connection pooling for MongoDB
- ✅ Health check endpoint
- ✅ Production-ready error handling

### Frontend (React)
- ✅ Modern React with Vite
- ✅ React Router for navigation
- ✅ Code splitting and lazy loading
- ✅ React Query for data fetching
- ✅ Responsive UI design
- ✅ Protected routes
- ✅ Task management interface
- ✅ User authentication (Login/Register)
- ✅ Dashboard with statistics

### DevOps
- ✅ GitHub Actions CI/CD pipelines
- ✅ Automated testing
- ✅ Automated linting
- ✅ Automated deployment
- ✅ Multiple deployment platform configurations
- ✅ Environment variable management

## 📁 Project Structure

```
.
├── backend/                 # Express.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── tests/              # Test files
│   ├── server.js           # Entry point
│   └── package.json
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context
│   │   ├── utils/          # Utility functions
│   │   └── App.jsx         # Main app component
│   └── package.json
├── .github/
│   └── workflows/          # GitHub Actions workflows
│       ├── backend-ci.yml  # Backend CI
│       ├── frontend-ci.yml # Frontend CI
│       ├── backend-cd.yml   # Backend CD
│       └── frontend-cd.yml # Frontend CD
├── deployment/             # Deployment configs
│   ├── render.yaml         # Render config
│   ├── vercel.json         # Vercel config
│   ├── netlify.toml        # Netlify config
│   └── railway.json        # Railway config
└── README.md

```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher) or **yarn**
- **MongoDB Atlas** account (or local MongoDB instance)
- **Git** for version control

### Required Accounts

- [GitHub](https://github.com) - For source code and CI/CD
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - For database hosting
- **Backend Hosting** (choose one):
  - [Render](https://render.com)
  - [Railway](https://railway.app)
  - [Heroku](https://www.heroku.com)
- **Frontend Hosting** (choose one):
  - [Vercel](https://vercel.com)
  - [Netlify](https://www.netlify.com)
  - [GitHub Pages](https://pages.github.com)

## 🚀 Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd deployment-and-devops-essentials-jodawa123
```

### 2. Install Dependencies

```bash
# Install all dependencies (backend + frontend)
npm run install:all

# Or install separately
cd backend && npm install
cd ../frontend && npm install
```

### 3. Set Up Environment Variables

#### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cd backend
cp env.example .env
```

Edit `.env` with your configuration:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your-mongodb-atlas-connection-string
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

#### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory:

```bash
cd frontend
cp env.example .env
```

Edit `.env` with your configuration:

```env
VITE_API_URL=http://localhost:5000
VITE_NODE_ENV=development
```

### 4. Set Up MongoDB Atlas

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get your connection string and add it to `backend/.env`

### 5. Run the Application

#### Start Backend (Terminal 1)

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

#### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🌍 Environment Variables

### Backend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Environment mode (development/production) | Yes |
| `PORT` | Server port | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | Yes |
| `JWT_EXPIRE` | JWT token expiration time | No |
| `FRONTEND_URL` | Frontend URL for CORS | Yes |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in milliseconds | No |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | No |

### Frontend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes |
| `VITE_NODE_ENV` | Environment mode | No |

## 🚢 Deployment

### Backend Deployment

#### Option 1: Deploy to Render

1. **Create a Render Account**
   - Sign up at [render.com](https://render.com)

2. **Create a New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `mern-backend`
     - **Environment**: `Node`
     - **Build Command**: `cd backend && npm install`
     - **Start Command**: `cd backend && npm start`
     - **Root Directory**: Leave empty

3. **Set Environment Variables**
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key
   - `FRONTEND_URL`: Your frontend URL
   - `PORT`: `10000` (Render default)

4. **Deploy**
   - Render will automatically deploy on every push to main branch

#### Option 2: Deploy to Railway

1. **Create a Railway Account**
   - Sign up at [railway.app](https://railway.app)

2. **Create a New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Railway will auto-detect Node.js
   - Set root directory to `backend/`
   - Add environment variables (same as Render)

4. **Deploy**
   - Railway will automatically deploy

#### Option 3: Deploy to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-connection-string
   heroku config:set JWT_SECRET=your-secret
   heroku config:set FRONTEND_URL=your-frontend-url
   ```

4. **Deploy**
   ```bash
   git subtree push --prefix backend heroku main
   ```

### Frontend Deployment

#### Option 1: Deploy to Vercel

1. **Create a Vercel Account**
   - Sign up at [vercel.com](https://vercel.com)

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

3. **Set Environment Variables**
   - `VITE_API_URL`: Your backend API URL

4. **Deploy**
   - Vercel will automatically deploy on every push

#### Option 2: Deploy to Netlify

1. **Create a Netlify Account**
   - Sign up at [netlify.com](https://www.netlify.com)

2. **Import Project**
   - Click "New site from Git"
   - Connect your GitHub repository
   - Configure:
     - **Base directory**: `frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `frontend/dist`

3. **Set Environment Variables**
   - `VITE_API_URL`: Your backend API URL

4. **Deploy**
   - Netlify will automatically deploy

#### Option 3: Deploy to GitHub Pages

1. **Update GitHub Actions Secrets**
   - Add `GITHUB_TOKEN` to repository secrets

2. **Push to Main Branch**
   - The workflow will automatically deploy

## 🔄 CI/CD Pipeline

This project includes GitHub Actions workflows for continuous integration and deployment.

### CI Workflows

#### Backend CI (`backend-ci.yml`)
- Runs on push/PR to `main` or `develop`
- Tests on Node.js 18.x and 20.x
- Runs linter
- Runs tests
- Checks build

#### Frontend CI (`frontend-ci.yml`)
- Runs on push/PR to `main` or `develop`
- Tests on Node.js 18.x and 20.x
- Runs linter
- Builds the application
- Verifies build output

### CD Workflows

#### Backend CD (`backend-cd.yml`)
- Runs on push to `main`
- Runs tests
- Deploys to chosen platform (Render/Railway/Heroku)

#### Frontend CD (`frontend-cd.yml`)
- Runs on push to `main`
- Builds the application
- Deploys to chosen platform (Vercel/Netlify/GitHub Pages)

### Setting Up GitHub Secrets

For automated deployment, add these secrets to your GitHub repository:

**Settings → Secrets and variables → Actions → New repository secret**

#### Backend Secrets
- `MONGODB_URI_TEST`: MongoDB connection string for testing
- `RENDER_SERVICE_ID`: Render service ID (if using Render)
- `RENDER_API_KEY`: Render API key (if using Render)
- `RAILWAY_TOKEN`: Railway token (if using Railway)
- `HEROKU_API_KEY`: Heroku API key (if using Heroku)
- `HEROKU_APP_NAME`: Heroku app name (if using Heroku)

#### Frontend Secrets
- `VITE_API_URL`: Backend API URL
- `VERCEL_TOKEN`: Vercel token (if using Vercel)
- `VERCEL_ORG_ID`: Vercel organization ID (if using Vercel)
- `VERCEL_PROJECT_ID`: Vercel project ID (if using Vercel)
- `NETLIFY_AUTH_TOKEN`: Netlify auth token (if using Netlify)
- `NETLIFY_SITE_ID`: Netlify site ID (if using Netlify)

## 📊 Monitoring and Health Checks

### Health Check Endpoint

The backend includes a health check endpoint:

```
GET /health
```

Response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345,
  "environment": "production"
}
```

### Monitoring Setup

#### Uptime Monitoring
- Use services like [UptimeRobot](https://uptimerobot.com) or [Pingdom](https://www.pingdom.com)
- Monitor the `/health` endpoint
- Set up alerts for downtime

#### Error Tracking
- Consider integrating [Sentry](https://sentry.io) for error tracking
- Add Sentry SDK to both backend and frontend

#### Performance Monitoring
- Use [New Relic](https://newrelic.com) or [Datadog](https://www.datadoghq.com)
- Monitor API response times
- Track database query performance

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Body: { name, email, password }
Response: { success, token, user }
```

#### Login
```
POST /api/auth/login
Body: { email, password }
Response: { success, token, user }
```

#### Get Current User
```
GET /api/auth/me
Headers: { Authorization: Bearer <token> }
Response: { success, user }
```

### Task Endpoints

#### Get All Tasks
```
GET /api/tasks
Headers: { Authorization: Bearer <token> }
Response: { success, count, data }
```

#### Get Single Task
```
GET /api/tasks/:id
Headers: { Authorization: Bearer <token> }
Response: { success, data }
```

#### Create Task
```
POST /api/tasks
Headers: { Authorization: Bearer <token> }
Body: { title, description?, status?, priority? }
Response: { success, data }
```

#### Update Task
```
PUT /api/tasks/:id
Headers: { Authorization: Bearer <token> }
Body: { title?, description?, status?, priority? }
Response: { success, data }
```

#### Delete Task
```
DELETE /api/tasks/:id
Headers: { Authorization: Bearer <token> }
Response: { success, message }
```

## 🐛 Troubleshooting

### Common Issues

#### Backend won't start
- Check MongoDB connection string
- Verify all environment variables are set
- Check if port is already in use

#### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Ensure backend is running

#### Deployment fails
- Check build logs in deployment platform
- Verify environment variables are set
- Ensure all dependencies are in `package.json`

#### CI/CD pipeline fails
- Check GitHub Actions logs
- Verify secrets are set correctly
- Ensure test database is accessible

## 📝 Submission Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] CI/CD pipelines configured and working
- [ ] Environment variables properly configured
- [ ] Health check endpoint working
- [ ] README.md updated with deployment URLs
- [ ] Screenshots of CI/CD pipeline added
- [ ] All tests passing

## 🔗 Deployment URLs

**Update these with your actual deployment URLs:**

- **Frontend URL**: `https://your-frontend-url.vercel.app`
- **Backend API URL**: `https://your-backend-url.onrender.com`
- **Health Check**: `https://your-backend-url.onrender.com/health`

## 📸 CI/CD Pipeline Screenshots

Add screenshots of your GitHub Actions workflows running successfully here.

## 📄 License

ISC

## 👥 Contributors

Add your name here

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Render/Railway/Heroku for backend hosting
- Vercel/Netlify for frontend hosting
- GitHub Actions for CI/CD

---

**Note**: Remember to update the deployment URLs and add screenshots of your CI/CD pipeline before submission!
