# 🚀 BUZZDAQ Deployment Guide

Complete step-by-step guide to deploy your Next.js BUZZDAQ application to Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier works!)
- Git installed locally

## Step 1: Push to GitHub

1. Initialize git in the buzzdaq-next directory:
```bash
cd buzzdaq-next
git init
git add .
git commit -m "Initial commit: BUZZDAQ Next.js app"
```

2. Create a new repository on GitHub (don't initialize with README)

3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/buzzdaq-next.git
git branch -M main
git push -u origin main
```

## Step 2: Create Vercel Postgres Database

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on **Storage** in the top menu
3. Click **Create Database**
4. Select **Postgres**
5. Choose a name (e.g., "buzzdaq-db")
6. Select your preferred region
7. Click **Create**

## Step 3: Get Database Connection Strings

After creating the database:

1. Go to your database in Vercel Dashboard
2. Click on the **.env.local** tab
3. Copy all the environment variables (they'll look like):
   ```
   POSTGRES_URL="..."
   POSTGRES_PRISMA_URL="..."
   POSTGRES_URL_NON_POOLING="..."
   POSTGRES_USER="..."
   POSTGRES_HOST="..."
   POSTGRES_PASSWORD="..."
   POSTGRES_DATABASE="..."
   ```

## Step 4: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New...** → **Project**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. **Add Environment Variables**:
   - Click **Environment Variables**
   - Add each variable from Step 3
   - Add one more:
     ```
     CRON_SECRET=your-random-secret-here-12345
     ```
     (Generate a random string - this protects your cron endpoint)

6. Click **Deploy**

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

Then add environment variables through the dashboard.

## Step 5: Initialize Database

After deployment completes:

1. Visit your deployed app URL (e.g., `https://buzzdaq-next.vercel.app`)
2. Navigate to `/api/setup` (e.g., `https://buzzdaq-next.vercel.app/api/setup`)
3. You should see:
   ```json
   {
     "success": true,
     "message": "Database initialized and seeded successfully"
   }
   ```

**⚠️ IMPORTANT**: After running setup once, you should delete or protect the `/app/api/setup/route.ts` file to prevent unauthorized database resets.

## Step 6: Configure Cron Job

The cron job is already configured in `vercel.json`! Vercel will automatically:

1. Read the `vercel.json` configuration
2. Set up a cron job that runs every 5 minutes
3. Call `/api/cron/update-market` with the `CRON_SECRET`

To verify the cron job is working:

1. Go to your Vercel project
2. Click on **Settings** → **Cron Jobs**
3. You should see the job listed

## Step 7: Test Your Application

1. Visit your deployed URL
2. You should see the BUZZDAQ dashboard with 4 buzzword stocks
3. Prices will update every 5 minutes based on real news feeds
4. Navigate between Dashboard, Trading, and Portfolio views

## Step 8: Monitor (Optional)

### Check Cron Job Logs

1. Go to Vercel Dashboard → Your Project
2. Click **Deployments** → Latest deployment
3. Click **Functions** → Find `api/cron/update-market`
4. View logs to see market updates

### Check Database

1. Go to your Postgres database in Vercel
2. Click on **Data** tab
3. You can query your data:
   ```sql
   SELECT * FROM tickers;
   SELECT * FROM prices ORDER BY timestamp DESC LIMIT 20;
   ```

## Troubleshooting

### Error: "Cannot connect to database"

- Verify environment variables are set correctly in Vercel
- Check that POSTGRES_URL includes the correct connection string
- Ensure your Vercel project is linked to the database

### Error: "Unauthorized" on cron endpoint

- Verify CRON_SECRET is set in environment variables
- Check that the cron job is using the correct secret
- Redeploy after changing environment variables

### Prices not updating

- Check cron job logs in Vercel Functions
- Verify the cron schedule in vercel.json (*/5 * * * * = every 5 minutes)
- Test the endpoint manually:
  ```bash
  curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
       https://your-app.vercel.app/api/cron/update-market
  ```

### UI not loading

- Check browser console for errors
- Verify all dependencies installed correctly
- Check build logs in Vercel

## Environment Variables Checklist

Make sure these are all set in Vercel:

- [ ] `POSTGRES_URL`
- [ ] `POSTGRES_PRISMA_URL`
- [ ] `POSTGRES_URL_NON_POOLING`
- [ ] `POSTGRES_USER`
- [ ] `POSTGRES_HOST`
- [ ] `POSTGRES_PASSWORD`
- [ ] `POSTGRES_DATABASE`
- [ ] `CRON_SECRET`

## Local Development Setup

To run locally with the Vercel database:

1. Create `.env.local` file (copy from `.env.local.example`)
2. Add all environment variables from Vercel
3. Run:
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:3000`

## Architecture Overview

```
User Request
    ↓
Next.js App (Vercel Edge)
    ↓
SWR Polling → /api/market → Vercel Postgres
    ↓
UI Updates (Real-time)

Meanwhile...
Vercel Cron (every 5 min)
    ↓
/api/cron/update-market
    ↓
Fetch RSS Feeds (BBC, NYT, Reddit)
    ↓
Count Keywords
    ↓
Calculate New Prices
    ↓
Update Vercel Postgres
```

## Next Steps

1. **Custom Domain**: Add your own domain in Vercel Settings
2. **Analytics**: Enable Vercel Analytics for usage insights
3. **Monitoring**: Set up error tracking (Sentry, etc.)
4. **Features**: Add user authentication, trading functionality, etc.

## Security Best Practices

1. ✅ Cron endpoint is protected with secret
2. ✅ Environment variables are not in code
3. ✅ Database uses SSL connections
4. 🔜 Add rate limiting to API endpoints
5. 🔜 Add user authentication
6. 🔜 Remove or protect /api/setup after initial run

## Cost Considerations

**Vercel Free Tier** includes:
- 100GB bandwidth/month
- 1,000 GB-hours compute/month
- Cron jobs (up to 2 per project)
- 1 Postgres database (up to 256MB)

**This app should stay well within free tier limits!**

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Hero UI Docs**: https://heroui.com

## Conclusion

Your BUZZDAQ app is now live! 🎉

The market updates automatically every 5 minutes based on real news feeds, and your users can watch buzzword stocks fluctuate in real-time.

Happy trading! 📈
