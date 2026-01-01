# Responsive Design Guide

## Overview

The Masbate Today News website is fully responsive and optimized for all devices and screen resolutions, from mobile phones (320px) to large desktop displays (1920px+).

## Breakpoints

The website uses Tailwind CSS breakpoints with custom additions:

- **xs**: 475px (Extra small devices)
- **sm**: 640px (Small devices - phones)
- **md**: 768px (Medium devices - tablets)
- **lg**: 1024px (Large devices - desktops)
- **xl**: 1280px (Extra large devices)
- **2xl**: 1536px (2X large devices)
- **3xl**: 1920px (3X large devices - 4K displays)

## Responsive Features Implemented

### 1. **Viewport Configuration**
- ✅ Proper viewport meta tag in layout
- ✅ User-scalable enabled for accessibility
- ✅ Maximum scale set to 5x for zoom support

### 2. **Typography Scaling**
- ✅ Responsive font sizes using Tailwind classes
- ✅ Base font size adjusts on mobile (14px) for better readability
- ✅ Headings scale from mobile to desktop:
  - Mobile: `text-2xl` (24px)
  - Tablet: `text-3xl` (30px)
  - Desktop: `text-4xl` (36px)
  - Large: `text-5xl` (48px)

### 3. **Layout Components**

#### Header
- ✅ Logo scales: `text-lg sm:text-xl md:text-2xl`
- ✅ Mobile hamburger menu
- ✅ Touch-friendly buttons (min 44px height)
- ✅ Language toggle hidden on mobile, visible on larger screens

#### Footer
- ✅ Grid: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
- ✅ Responsive padding and spacing

#### Sidebar
- ✅ Hidden on mobile, visible on desktop (lg breakpoint)
- ✅ Responsive padding and font sizes

### 4. **Video Hero Section**
- ✅ Height scales: `h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]`
- ✅ Title: `text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl`
- ✅ Subtitle with line-clamp on mobile
- ✅ Touch-friendly control buttons (44px minimum)
- ✅ Responsive padding: `p-4 sm:p-6 md:p-8 lg:p-12`

### 5. **Article Cards**
- ✅ Image heights: `h-40 sm:h-44 md:h-48` (featured: `h-48 sm:h-56 md:h-64`)
- ✅ Title with line-clamp for mobile
- ✅ Responsive text sizes
- ✅ Flexible metadata layout (stacks on mobile)

### 6. **Article Detail Page**
- ✅ Responsive featured image: `h-64 sm:h-80 md:h-96 lg:h-[500px]`
- ✅ Title scales: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
- ✅ Content padding adjusts per screen size
- ✅ Social share buttons with abbreviated text on mobile

### 7. **Forms**
- ✅ Full-width inputs on mobile
- ✅ Touch-friendly buttons (44px minimum height)
- ✅ Responsive padding and spacing
- ✅ Grid layouts adapt: 1 column → 2 columns

### 8. **Navigation**
- ✅ Mobile-first hamburger menu
- ✅ Desktop horizontal navigation
- ✅ Touch-friendly menu items
- ✅ Smooth transitions

### 9. **Touch Optimization**
- ✅ Minimum 44px touch targets (Apple/Google guidelines)
- ✅ `touch-manipulation` class for better touch response
- ✅ Reduced tap highlight on mobile
- ✅ Proper spacing between interactive elements

### 10. **Images**
- ✅ Next.js Image component with responsive sizes
- ✅ Proper `sizes` attribute for optimal loading
- ✅ Aspect ratio preservation
- ✅ Lazy loading for performance

## Container Widths

- **Mobile**: Full width with padding (`px-4`)
- **Tablet**: Full width with more padding (`px-6`)
- **Desktop**: Max-width container with padding (`px-8`)
- **Large Desktop**: Max-width 1400px for ultra-wide screens

## Grid Systems

### Article Grids
- Mobile: 1 column
- Tablet: 2 columns (`md:grid-cols-2`)
- Desktop: Maintains 2 columns with sidebar

### Main Layout
- Mobile: Single column
- Desktop: 3 columns content + 1 column sidebar (`lg:grid-cols-4`)

## Spacing

Responsive spacing using Tailwind:
- `gap-4 sm:gap-6` - Adapts spacing based on screen size
- `p-4 sm:p-6 md:p-8` - Progressive padding increases
- `mb-4 sm:mb-6` - Responsive margins

## Text Truncation

- `line-clamp-2` on mobile for titles
- `line-clamp-3` on tablets
- Full text on desktop
- Prevents layout breaking on small screens

## Performance Optimizations

1. **Responsive Images**: Next.js Image with proper sizes
2. **Conditional Rendering**: Sidebar hidden on mobile
3. **Lazy Loading**: Components load as needed
4. **Touch Optimization**: Reduced animations on touch devices

## Testing Checklist

### Mobile (320px - 640px)
- [ ] All text is readable without zooming
- [ ] Buttons are easily tappable (44px minimum)
- [ ] Navigation menu works smoothly
- [ ] Images load correctly
- [ ] Forms are easy to fill
- [ ] No horizontal scrolling

### Tablet (640px - 1024px)
- [ ] Two-column layouts work well
- [ ] Sidebar appears appropriately
- [ ] Typography scales properly
- [ ] Touch interactions are smooth

### Desktop (1024px+)
- [ ] Full layout with sidebar
- [ ] Optimal use of screen space
- [ ] Hover effects work
- [ ] Large images display well

### Large Desktop (1920px+)
- [ ] Content doesn't stretch too wide
- [ ] Max-width containers prevent excessive width
- [ ] Typography remains readable

## Browser Compatibility

Tested and optimized for:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (iOS and macOS)
- ✅ Mobile browsers (Chrome, Safari, Samsung Internet)

## Accessibility

- ✅ Proper viewport scaling
- ✅ Touch-friendly targets
- ✅ Readable font sizes
- ✅ Proper contrast ratios
- ✅ Keyboard navigation support

## Future Enhancements

- [ ] Add container queries for more granular control
- [ ] Implement responsive images with srcset
- [ ] Add print stylesheet
- [ ] Optimize for foldable devices
- [ ] Add landscape/portrait orientation handling

