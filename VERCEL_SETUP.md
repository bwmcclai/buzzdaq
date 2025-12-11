# Vercel Production Setup Guide

## Setting up Environment Variables in Vercel

After pushing your code to GitHub (master branch), follow these steps to configure your Vercel deployment:

### Step 1: Connect Your Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `bwmcclai/buzzdaq`
4. Make sure the **master** branch is selected as the production branch

### Step 2: Configure Environment Variables

Before deploying, you need to add your database connection strings as environment variables:

1. In the Vercel project settings, go to **Settings** → **Environment Variables**
2. Add the following environment variables:

#### Required Environment Variables:

| Variable Name | Value |
|--------------|-------|
| `POSTGRES_URL` | `postgres://38b4f10455911ff5548cba89268c03a92a811227d42a3474cc0653251270bf21:sk_F9MMAfpjI58vuBq0MknFb@db.prisma.io:5432/postgres?sslmode=require` |
| `DATABASE_URL` | `postgres://38b4f10455911ff5548cba89268c03a92a811227d42a3474cc0653251270bf21:sk_F9MMAfpjI58vuBq0MknFb@db.prisma.io:5432/postgres?sslmode=require` |
| `PRISMA_DATABASE_URL` | `prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19GOU1NQWZwakk1OHZ1QnEwTWtuRmIiLCJhcGlfa2V5IjoiMDFLQzdHRVcxNzdLV043NTQ2Uk1aOEVEWjQiLCJ0ZW5hbnRfaWQiOiIzOGI0ZjEwNDU1OTExZmY1NTQ4Y2JhODkyNjhjMDNhOTJhODExMjI3ZDQyYTM0NzRjYzA2NTMyNTEyNzBiZjIxIiwiaW50ZXJuYWxfc2VjcmV0IjoiM2MyZmY2MmYtNDM5MC00ZDRhLTgyNWUtMDExODg5YzY1NDgxIn0.hQExftHWHatuWfmy32ZIG3MGIo6Hxy1SBNF8OO3kl3Y` |

**Important:** Make sure to apply these to all environments (Production, Preview, and Development)

### Step 3: Initialize the Database

After your first deployment, you need to initialize the database with tables and seed data:

1. Navigate to your deployed app URL: `https://your-app.vercel.app/api/setup`
2. This will create the necessary database tables and seed initial data
3. You should see a success message

### Step 4: Verify Deployment

1. Visit your app at `https://your-app.vercel.app`
2. You should see the dashboard with stock data loading
3. If you see any errors, check the Vercel logs in the dashboard

## Local Development Setup

For local development, the environment variables are already configured in `.env.local` (which is gitignored for security).

To run locally:
```bash
npm run dev
```

Visit `http://localhost:3000` to see your app.

## Troubleshooting

### Database Connection Errors

If you see connection errors:
1. Verify all environment variables are set correctly in Vercel
2. Make sure the connection strings don't have extra spaces or quotes
3. Check that your Prisma database is active and accessible

### Build Errors

If the build fails:
1. Check the Vercel build logs for specific errors
2. Ensure all dependencies are listed in `package.json`
3. Verify TypeScript has no errors

### Cron Job Setup (Optional)

To enable automatic market updates:
1. In Vercel dashboard, go to **Settings** → **Cron Jobs**
2. Add a new cron job:
   - Path: `/api/cron/update-market`
   - Schedule: `0 12 * * *` (once daily at 12:00 PM UTC)

**Note:** Vercel's Hobby tier limits cron jobs to once per day. This will update stock prices daily based on buzzword trends from the past 24 hours.

If you upgrade to Pro tier, you can increase the frequency:
- Every hour: `0 * * * *`
- Every 5 minutes: `*/5 * * * *`

## Important Notes

- The `.env.local` file is gitignored and should never be committed
- Keep your database credentials secure
- Vercel environment variables are separate from your local `.env.local`
- Always test locally before pushing to production
