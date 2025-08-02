# Render Deployment Guide

This guide will help you deploy the Shopping Cart backend to Render.

## 📋 Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be pushed to GitHub

## 🚀 Deployment Methods

### Method 1: Using Render Dashboard (Recommended)

1. **Connect GitHub Repository**:
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub account and select this repository
   - Choose the `render-deployment` branch

2. **Configure Service**:
   ```
   Name: shopping-cart-backend
   Region: Choose closest to your users
   Branch: render-deployment
   Root Directory: backend
   Runtime: Go
   Build Command: go build -o main .
   Start Command: ./main
   ```

3. **Set Environment Variables**:
   ```
   JWT_SECRET=your_super_secure_jwt_secret_key_minimum_32_characters
   GIN_MODE=release
   ```

4. **Deploy**: Click "Create Web Service"

### Method 2: Using render.yaml (Infrastructure as Code)

1. **Auto-deploy with render.yaml**:
   - The `render.yaml` file in the root directory contains all configuration
   - Render will automatically detect and use this configuration
   - Just connect your repository and Render will handle the rest

## ⚙️ Configuration Files

### Files Created for Deployment:

- `render.yaml` - Render service configuration
- `backend/Dockerfile` - Container configuration (optional)
- Updated `backend/main.go` - PORT environment variable support
- Updated `frontend/src/config.js` - Production API URL support

## 🔧 Environment Variables

Set these in your Render service dashboard:

```bash
JWT_SECRET=your_super_secure_jwt_secret_key_minimum_32_characters
GIN_MODE=release
PORT=8080  # Automatically set by Render
```

## 🌐 After Deployment

1. **Note your backend URL**: 
   - Will be something like: `https://shopping-cart-backend-abc123.onrender.com`

2. **Update Frontend Configuration**:
   ```javascript
   // Update frontend/src/config.js
   const API_BASE_URL = 'https://your-actual-render-url.onrender.com';
   ```

3. **Redeploy Frontend**:
   ```bash
   cd frontend
   npm run build
   npm run deploy  # Deploy to GitHub Pages
   ```

## 🚀 Testing Your Deployment

After deployment, test your endpoints:

```bash
# Replace with your actual Render URL
curl https://your-shopping-cart-backend.onrender.com/users

# Test login
curl -X POST https://your-shopping-cart-backend.onrender.com/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass123"}'
```

## 📊 Render Features

### Free Tier Includes:
- ✅ **750 hours/month** of runtime
- ✅ **Automatic HTTPS** with SSL certificates
- ✅ **Git-based deployments** with auto-deploy
- ✅ **Custom domains** support
- ✅ **Health checks** and monitoring
- ✅ **Logs and metrics** dashboard

### Limitations:
- ⚠️ **Spins down after 15 minutes** of inactivity (cold starts)
- ⚠️ **512MB RAM** limit on free tier
- ⚠️ **SQLite database resets** on each deployment (use PostgreSQL for persistence)

## 🔄 Updates and Redeployment

Render will automatically redeploy when you push to the connected branch:

```bash
# Make changes and push
git add .
git commit -m "Update backend"
git push origin render-deployment
```

## 🗄️ Database Considerations

### Current Setup (SQLite):
- Database resets on each deployment
- Good for development/demo purposes
- Data is not persistent

### Production Recommendation:
- Use Render's **PostgreSQL** database add-on
- Update database configuration in `backend/database/database.go`
- Add database URL to environment variables

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check Go version compatibility
   - Verify all dependencies in go.mod
   - Check build logs in Render dashboard

2. **Runtime Errors**:
   - Verify environment variables are set
   - Check application logs in Render dashboard
   - Ensure PORT environment variable is used

3. **CORS Issues**:
   - Update CORS origins in main.go
   - Add your frontend URL to allowed origins

### Solutions:

```go
// Update CORS in main.go
r.Use(cors.New(cors.Config{
    AllowOrigins: []string{
        "http://localhost:3000", 
        "https://ricky30feb.github.io",
        "https://your-frontend-domain.com",
    },
    // ... other config
}))
```

## 📝 Next Steps

1. **Deploy Backend** to Render
2. **Update Frontend** with Render backend URL
3. **Test Integration** between frontend and backend
4. **Set up Database** (PostgreSQL for production)
5. **Configure Custom Domain** (optional)

## 🔗 Useful Links

- [Render Documentation](https://render.com/docs)
- [Render Go Guide](https://render.com/docs/deploy-go)
- [Render Dashboard](https://dashboard.render.com)
- [Environment Variables Guide](https://render.com/docs/environment-variables)
