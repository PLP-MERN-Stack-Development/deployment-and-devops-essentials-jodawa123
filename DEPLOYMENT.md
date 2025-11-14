# Deployment Guide

This document provides detailed step-by-step instructions for deploying the MERN stack application.

## Prerequisites Checklist

- [ ] GitHub repository created and code pushed
- [ ] MongoDB Atlas cluster created and connection string obtained
- [ ] Accounts created for deployment platforms
- [ ] Environment variables documented

## Step 1: MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select a cloud provider and region
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set user privileges to "Read and write to any database"
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For production, add `0.0.0.0/0` (allows all IPs)
   - For development, add your current IP

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `mern-app`)

## Step 2: Backend Deployment

### Option A: Render

1. **Sign Up/Login**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   ```
   Name: mern-backend
   Environment: Node
   Region: Choose closest to you
   Branch: main
   Root Directory: (leave empty)
   Build Command: cd backend && npm install
   Start Command: cd backend && npm start
   ```

4. **Set Environment Variables**
   - Scroll to "Environment Variables"
   - Add the following:
     ```
     NODE_ENV = production
     PORT = 10000
     MONGODB_URI = your-mongodb-connection-string
     JWT_SECRET = generate-a-random-secret-key
     JWT_EXPIRE = 7d
     FRONTEND_URL = https://your-frontend-url.vercel.app
     RATE_LIMIT_WINDOW_MS = 900000
     RATE_LIMIT_MAX_REQUESTS = 100
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Copy the service URL (e.g., `https://mern-backend.onrender.com`)

### Option B: Railway

1. **Sign Up/Login**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Railway will auto-detect Node.js
   - Set root directory to `backend/`
   - Update start command if needed

4. **Set Environment Variables**
   - Go to "Variables" tab
   - Add all environment variables (same as Render)

5. **Deploy**
   - Railway will automatically deploy
   - Get your service URL from the "Settings" tab

### Option C: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGODB_URI=your-connection-string
   heroku config:set JWT_SECRET=your-secret
   heroku config:set JWT_EXPIRE=7d
   heroku config:set FRONTEND_URL=your-frontend-url
   ```

5. **Deploy**
   ```bash
   git subtree push --prefix backend heroku main
   ```

## Step 3: Frontend Deployment

### Option A: Vercel

1. **Sign Up/Login**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Set Environment Variables**
   - Add:
     ```
     VITE_API_URL = https://your-backend-url.onrender.com
     ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment
   - Copy your deployment URL

### Option B: Netlify

1. **Sign Up/Login**
   - Go to [netlify.com](https://www.netlify.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New site from Git"
   - Connect to GitHub
   - Select your repository

3. **Configure Build Settings**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

4. **Set Environment Variables**
   - Go to "Site settings" → "Environment variables"
   - Add:
     ```
     VITE_API_URL = https://your-backend-url.onrender.com
     ```

5. **Deploy**
   - Click "Deploy site"
   - Wait for deployment
   - Get your site URL

### Option C: GitHub Pages

1. **Update GitHub Actions Secrets**
   - Go to repository Settings → Secrets → Actions
   - Add `GITHUB_TOKEN` (usually auto-generated)

2. **Update Frontend CD Workflow**
   - Uncomment GitHub Pages deployment in `.github/workflows/frontend-cd.yml`

3. **Push to Main**
   - The workflow will automatically deploy
   - Your site will be at `https://username.github.io/repo-name`

## Step 4: Update Frontend API URL

After deploying the backend, update the frontend environment variable:

1. Go to your frontend deployment platform
2. Update `VITE_API_URL` to your backend URL
3. Redeploy the frontend

## Step 5: Verify Deployment

1. **Test Backend Health Check**
   ```
   GET https://your-backend-url.onrender.com/health
   ```
   Should return:
   ```json
   {
     "status": "OK",
     "timestamp": "...",
     "uptime": 123,
     "environment": "production"
   }
   ```

2. **Test Frontend**
   - Visit your frontend URL
   - Try registering a new user
   - Create a task
   - Verify everything works

3. **Test API Endpoints**
   - Use Postman or curl to test API endpoints
   - Verify authentication works
   - Test CRUD operations

## Step 6: Set Up CI/CD

### GitHub Actions Setup

1. **Add Repository Secrets**
   - Go to repository Settings → Secrets → Actions
   - Add required secrets (see README.md)

2. **Verify Workflows**
   - Go to "Actions" tab
   - Workflows should run automatically on push
   - Check that they complete successfully

3. **Configure Deployment Secrets**
   - Add platform-specific secrets:
     - Render: `RENDER_SERVICE_ID`, `RENDER_API_KEY`
     - Vercel: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
     - etc.

## Step 7: Custom Domain (Optional)

### Backend Custom Domain

1. **Render**
   - Go to service settings
   - Click "Custom Domains"
   - Add your domain
   - Follow DNS configuration instructions

2. **Railway**
   - Go to service settings
   - Click "Domains"
   - Add custom domain
   - Configure DNS

### Frontend Custom Domain

1. **Vercel**
   - Go to project settings
   - Click "Domains"
   - Add your domain
   - Configure DNS

2. **Netlify**
   - Go to site settings
   - Click "Domain management"
   - Add custom domain
   - Configure DNS

## Troubleshooting

### Backend Issues

- **503 Error**: Check if MongoDB connection is working
- **CORS Error**: Verify `FRONTEND_URL` is set correctly
- **500 Error**: Check server logs in deployment platform

### Frontend Issues

- **API Connection Failed**: Verify `VITE_API_URL` is correct
- **Build Fails**: Check build logs for errors
- **Blank Page**: Check browser console for errors

### CI/CD Issues

- **Workflow Fails**: Check Actions tab for error details
- **Deployment Fails**: Verify secrets are set correctly
- **Tests Fail**: Check test database connection

## Next Steps

1. Set up monitoring (UptimeRobot, Sentry)
2. Configure SSL certificates (usually automatic)
3. Set up database backups
4. Document API endpoints
5. Add error tracking
6. Set up performance monitoring

---

For more detailed information, refer to the main [README.md](./README.md).


