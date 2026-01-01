# Masbate Today News

A modern news website focused on local news, events, and updates from Masbate, Philippines, with additional coverage of national Philippine news.

## Features

- **Modern Tech Stack**: Next.js 14 with TypeScript, Tailwind CSS, and Firebase
- **Admin Dashboard**: Single admin user (Fel C. Monares) can manage all content
- **Public Viewing**: Anonymous browsing for all visitors, no registration required
- **Content Management**: Upload and manage news articles, blogs, videos, and images
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark Mode**: Toggle between light and dark themes
- **SEO Optimized**: Meta tags, sitemap, and robots.txt
- **PWA Support**: Offline viewing and push notifications
- **Monetization**: AdSense, donations, sponsored content, and premium articles

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Data Fetching**: React Query (TanStack Query)
- **Rich Text Editor**: React Quill

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Firebase project with:
  - Authentication enabled (Email/Password and Google)
  - Firestore database
  - Storage bucket
  - Cloud Functions (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MasbateToday
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_ADMIN_EMAIL=fel.monares@masbatetoday.com
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_key (optional)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=your_adsense_client_id (optional)
```

4. Set up Firebase:

   a. Create an admin user in Firestore:
   ```javascript
   // In Firebase Console > Firestore, create a document:
   // Collection: admins
   // Document ID: [admin_user_uid]
   // Fields:
   //   email: "fel.monares@masbatetoday.com"
   //   role: "admin"
   //   createdAt: [timestamp]
   ```

   b. Deploy Firestore security rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

   c. Deploy Storage security rules:
   ```bash
   firebase deploy --only storage:rules
   ```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
MasbateToday/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── article/           # Article detail pages
│   ├── masbate/           # Masbate news category
│   ├── national/          # National news category
│   ├── blogs/             # Blog posts
│   ├── videos/            # Video gallery
│   ├── contact/           # Contact page
│   ├── support/           # Support/donations page
│   ├── search/            # Search page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Header.tsx         # Site header/navigation
│   ├── Footer.tsx         # Site footer
│   ├── ArticleCard.tsx    # Article card component
│   ├── HeroCarousel.tsx   # Hero carousel
│   ├── Sidebar.tsx        # Sidebar with widgets
│   └── ...
├── lib/                   # Utility functions
│   ├── firebase/          # Firebase configuration and functions
│   ├── hooks/             # Custom React hooks
│   └── utils.ts           # Helper functions
├── types/                 # TypeScript type definitions
├── public/                # Static assets
└── firestore.rules        # Firestore security rules
```

## Admin Setup

1. Create a Firebase user account with the admin email (fel.monares@masbatetoday.com)
2. Create an admin document in Firestore under the `admins` collection
3. Log in at `/admin/login` using email/password or Google sign-in

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Firebase Hosting

1. Build the project:
```bash
npm run build
```

2. Deploy to Firebase:
```bash
firebase init hosting
firebase deploy --only hosting
```

## Features in Detail

### Content Management
- Create, edit, and delete articles
- Upload images and videos
- Rich text editor for article content
- Schedule publishing
- Mark articles as featured, sponsored, or premium

### Public Features
- Browse articles by category
- Search functionality
- Reading progress indicator
- Social sharing (Facebook, Twitter, WhatsApp)
- Related articles suggestions
- Newsletter subscription
- Contact form for tips/submissions

### Monetization
- Google AdSense integration
- Donation options (PayPal, GCash, Patreon)
- Sponsored content support
- Premium content with Stripe (optional)

## Customization

### Colors
Edit `tailwind.config.ts` to customize the color scheme:
- Primary: Blue (Masbate local news)
- Secondary: Green (National news)
- Accent: Red (Breaking news)

### Admin Contact
Update admin information in:
- `components/Footer.tsx`
- `app/contact/page.tsx`
- Environment variables

## Performance

- Image optimization via Next.js Image component
- Static site generation for better SEO
- Code splitting and lazy loading
- PWA for offline access

## Security

- Firebase Authentication for admin access
- Firestore security rules prevent unauthorized writes
- Storage rules restrict uploads to admins only
- Environment variables for sensitive data

## Support

For issues or questions, contact:
- **Admin**: Fel C. Monares
- **Phone**: 0963688771
- **Location**: Cawayan, Masbate, Philippines

## License

This project is proprietary and confidential.

## Timeline

Estimated development time for a solo developer: 4-6 weeks

- Week 1-2: Setup, core features, admin dashboard
- Week 3-4: Public pages, content management, styling
- Week 5: Monetization, PWA, SEO optimization
- Week 6: Testing, bug fixes, deployment

## Notes

- Ensure Firebase project is properly configured before deployment
- Add PWA icons (icon-192.png and icon-512.png) to the public folder
- Configure Google AdSense and other monetization services
- Set up custom domain in Vercel/Firebase Hosting
- Test all features thoroughly before going live
