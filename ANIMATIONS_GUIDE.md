# Framer Motion Animations Guide

## Overview

All pages now feature smooth Framer Motion animations for enhanced user experience. The animations are implemented consistently across the entire website.

## Components Created

### 1. **VideoHero Component** (`components/VideoHero.tsx`)
- Full-screen video hero section for landing page
- Supports YouTube embeds and direct video files
- Play/pause, mute/unmute, and fullscreen controls
- Animated text overlays with staggered entrance
- Responsive design with gradient overlays

### 2. **PageTransition Component** (`components/PageTransition.tsx`)
- Smooth page transitions on route changes
- Fade and slide animations
- Applied to all main pages

### 3. **SectionAnimation Component** (`components/SectionAnimation.tsx`)
- Scroll-triggered animations for sections
- Fade-in and slide-up effects
- Configurable delay for staggered animations
- Uses `viewport={{ once: true }}` for performance

## Animation Patterns Used

### Page-Level Animations
- **Initial Load**: Fade in with slight upward movement
- **Exit**: Fade out with slight downward movement
- **Duration**: 0.5-0.8 seconds for smooth transitions

### Section Animations
- **Staggered Children**: Articles and cards animate in sequence
- **Scroll Triggered**: Animations start when section enters viewport
- **Variants**: Reusable animation variants for consistency

### Interactive Animations
- **Hover Effects**: Scale and color transitions on buttons/cards
- **Tap Effects**: Scale down on button clicks
- **Icon Animations**: Rotate and scale on hover

## Pages Enhanced

### ✅ Homepage (`app/page.tsx`)
- Video hero section with animated text
- Staggered article card animations
- Section-by-section fade-ins
- Smooth transitions between sections

### ✅ Masbate News (`app/masbate/page.tsx`)
- Animated page header
- Staggered article grid
- Infinite scroll with smooth loading

### ✅ National News (`app/national/page.tsx`)
- Page transition animations
- Staggered article cards
- Smooth sidebar entrance

### ✅ Blogs (`app/blogs/page.tsx`)
- Consistent animation pattern
- Staggered blog post cards
- Smooth page transitions

### ✅ Videos (`app/videos/page.tsx`)
- Scale animations for video cards
- Staggered grid layout
- Smooth page transitions

### ✅ Article Detail (`app/article/[id]/page.tsx`)
- Animated header with metadata
- Featured image fade-in
- Content section animations
- Related articles with stagger

### ✅ Contact Page (`app/contact/page.tsx`)
- Form animations
- Contact info cards
- Smooth transitions

### ✅ Support Page (`app/support/page.tsx`)
- Donation card animations
- Icon hover effects
- Staggered list items
- Button interactions

### ✅ Search Page (`app/search/page.tsx`)
- Search bar animations
- Filter panel transitions
- Staggered results

## Animation Variants

### Container Variants
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
```

### Item Variants
```typescript
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};
```

## Performance Considerations

1. **Viewport Once**: Animations only trigger once when entering viewport
2. **Lazy Loading**: Components load animations only when needed
3. **Reduced Motion**: Respects user's motion preferences (can be added)
4. **Optimized Transitions**: Short durations (0.3-0.8s) for snappy feel

## Customization

### Adjusting Animation Speed
Modify `duration` values in animation variants:
```typescript
transition: { duration: 0.5 } // Change to 0.3 for faster, 0.8 for slower
```

### Changing Stagger Delay
Modify `staggerChildren` in container variants:
```typescript
transition: { staggerChildren: 0.1 } // Change to 0.05 for faster, 0.2 for slower
```

### Adding New Animations
Use the existing patterns:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {/* Content */}
</motion.div>
```

## Video Hero Configuration

The video hero section can be configured in `app/page.tsx`:

```typescript
<VideoHero
  videoUrl={featuredVideo?.videoUrl}        // Direct video file URL
  videoEmbed={featuredVideo?.videoEmbed}   // YouTube embed URL
  title="Masbate Today News"                // Hero title
  subtitle="Your trusted source..."        // Hero subtitle
  overlay={true}                            // Show gradient overlay
/>
```

## Best Practices

1. **Consistency**: Use the same animation patterns across similar elements
2. **Performance**: Keep animations under 1 second
3. **Accessibility**: Don't rely solely on animations for important information
4. **Mobile**: Test animations on mobile devices for smoothness
5. **Stagger**: Use staggered animations for lists/grids to avoid overwhelming users

## Future Enhancements

- [ ] Add reduced motion support
- [ ] Implement page transition animations with Next.js router
- [ ] Add loading skeleton animations
- [ ] Create animation presets for common patterns
- [ ] Add parallax scrolling effects

