# Vercel Deployment Guide

## 🚀 How to Deploy to Vercel

### 1. **Prepare for Deployment**

The app is now ready for Vercel deployment with the following improvements:

- ✅ API routes for articles management
- ✅ Server-side authentication with cookies
- ✅ Proper error handling
- ✅ Vercel configuration

### 2. **Environment Variables**

Set these environment variables in your Vercel dashboard:

```bash
ADMIN_USERNAME=rajatdwaghare
ADMIN_PASSWORD=briefbase@1996
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

### 3. **Deployment Steps**

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables
   - Deploy

### 4. **What Works on Vercel**

✅ **Articles API**: Full CRUD operations
✅ **Authentication**: Secure cookie-based sessions
✅ **Admin Panel**: Complete functionality
✅ **Static Generation**: Articles are pre-rendered
✅ **Dynamic Routes**: Individual article pages work

### 5. **Limitations (Current)**

⚠️ **Data Persistence**: 
- Articles are stored in JSON file (not persistent)
- Changes are lost on each deployment
- **Solution**: Add a database (see below)

### 6. **Production Improvements Needed**

#### **Option A: Add Database (Recommended)**

```bash
# Install database packages
npm install @vercel/postgres
# or
npm install @planetscale/database
```

#### **Option B: Use Vercel KV (Key-Value Store)**

```bash
npm install @vercel/kv
```

#### **Option C: Use External Database**

- Supabase (PostgreSQL)
- PlanetScale (MySQL)
- MongoDB Atlas
- Firebase Firestore

### 7. **Current API Endpoints**

- `GET /api/articles` - Get all articles
- `POST /api/articles` - Create article
- `GET /api/articles/[id]` - Get single article
- `PUT /api/articles/[id]` - Update article
- `DELETE /api/articles/[id]` - Delete article
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify` - Verify session

### 8. **Testing Locally**

```bash
npm run dev
```

Visit:
- `http://localhost:3001/articles` - View articles
- `http://localhost:3001/admin` - Admin panel
- `http://localhost:3001/admin/login` - Login

### 9. **Next Steps for Production**

1. **Add Database**: Choose one of the options above
2. **Update API Routes**: Use database instead of JSON file
3. **Add Error Monitoring**: Sentry or similar
4. **Add Analytics**: Vercel Analytics
5. **Add CDN**: Vercel Edge Network (automatic)

## 🎯 **Ready to Deploy!**

Your app is now ready for Vercel deployment. The main limitation is data persistence, but the core functionality works perfectly on Vercel.
