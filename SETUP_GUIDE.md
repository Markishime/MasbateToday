# Setup Guide for Masbate Today News

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Firebase Setup

#### Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password and Google)
4. Create Firestore database
5. Create Storage bucket
6. Get your Firebase config from Project Settings > General > Your apps

#### Set Environment Variables
Create `.env.local` file:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_ADMIN_EMAIL=fel.monares@masbatetoday.com
```

#### Deploy Security Rules
```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (select Firestore and Storage)
firebase init

# Deploy rules
firebase deploy --only firestore:rules,storage:rules
```

#### Create Admin User
1. In Firebase Console > Authentication, create a user with email: `fel.monares@masbatetoday.com`
2. In Firestore, create a document:
   - Collection: `admins`
   - Document ID: [the user's UID from Authentication]
   - Fields:
     - `email`: "fel.monares@masbatetoday.com"
     - `role`: "admin"
     - `createdAt`: [timestamp]

### 3. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

### 4. Admin Login
1. Go to http://localhost:3000/admin/login
2. Sign in with the admin email and password
3. You'll be redirected to the admin dashboard

## Optional Setup

### Weather Widget
1. Get API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Add to `.env.local`:
```env
NEXT_PUBLIC_WEATHER_API_KEY=your_key
```

### Google AdSense
1. Get your AdSense client ID
2. Add to `.env.local`:
```env
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxxxxxx
```
3. Add AdSense script to `app/layout.tsx` (in the `<head>` section)

### PWA Icons
1. Create two icon files:
   - `public/icon-192.png` (192x192 pixels)
   - `public/icon-512.png` (512x512 pixels)
2. These will be used for the PWA manifest

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables
4. Deploy

### Firebase Hosting
```bash
npm run build
firebase init hosting
firebase deploy --only hosting
```

## Troubleshooting

### "Unauthorized: Not an admin user"
- Make sure you created the admin document in Firestore
- Check that the document ID matches the user's UID
- Verify the email matches `NEXT_PUBLIC_ADMIN_EMAIL`

### Images not loading
- Check Firebase Storage rules are deployed
- Verify Storage bucket is properly configured
- Check image URLs in Firestore documents

### Build errors
- Make sure all environment variables are set
- Check that Firebase config is correct
- Verify all dependencies are installed

## Next Steps

1. Customize colors and branding in `tailwind.config.ts`
2. Add your logo to the header
3. Configure social media links in `components/Footer.tsx`
4. Set up custom domain
5. Add Google Analytics
6. Configure email notifications (optional)

