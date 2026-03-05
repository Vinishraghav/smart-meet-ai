# SmartMeet AI - Manual Railway Deployment (FREE)

## Step-by-Step Manual Deployment

### Step 1: Go to Railway
1. Visit https://railway.app
2. Click "Sign up with GitHub"
3. Authorize Railway to access your GitHub

### Step 2: Deploy Your Project
1. Click "New Project" → "Deploy from GitHub repo"
2. Select `smart-meet-ai` repository
3. Click "Deploy"

### Step 3: Add PostgreSQL Database
1. In your Railway project, click "+ New Service"
2. Select "PostgreSQL"
3. Service name: `smart-meet-db`
4. Plan: "Free"
5. Click "Add PostgreSQL"

### Step 4: Configure Environment Variables
1. Click on your web service
2. Go to "Variables" tab
3. Add these variables:
   ```
   DATABASE_URL = (Railway provides this automatically)
   PORT = 8000
   PYTHON_VERSION = 3.11
   ```

### Step 5: Deploy Again
1. Click "Deploy" on your web service
2. Railway will build and deploy your app
3. Wait for deployment to complete

### Step 6: Get Your App URL
1. Click on your web service
2. Click "Settings" → "Domains"
3. Copy your Railway URL
4. Your app will be available at: `https://your-app.railway.app`

### Step 7: Test Your App
1. Visit: `https://your-app.railway.app/health`
2. Visit: `https://your-app.railway.app/docs`
3. Test video upload API endpoints

## What You Get (FREE)

✅ **PostgreSQL Database** - Unlimited
✅ **500MB File Storage** - For videos
✅ **100GB Bandwidth** - Per month
✅ **Automatic HTTPS** - SSL certificate
✅ **Custom Domain** - Railway domain
✅ **Zero Cost** - $0/month

## API Endpoints Available

```
POST /api/v1/meetings/create     # Create meeting
POST /api/v1/meetings/join       # Join meeting
POST /api/v1/railway/upload      # Upload video
POST /api/v1/railway/upload-thumbnail  # Upload thumbnail
GET  /api/v1/railway/storage-info # Get storage info
DELETE /api/v1/railway/delete/{id} # Delete video
```

## Next Steps After Deployment

1. **Test the API** at `/docs`
2. **Upload videos** using the upload endpoints
3. **Share your app** with others
4. **Monitor usage** in Railway dashboard

## Upgrade Options

- **Pro Plan**: $5/month for unlimited storage
- **Team Plan**: $20/month for additional features

## Support

If you have issues:
1. Check Railway logs in dashboard
2. Verify environment variables
3. Ensure PostgreSQL is connected
4. Test locally first

---

**Your SmartMeet AI will be live and ready for video recording!** 🎥🚀
