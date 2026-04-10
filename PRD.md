# Planning Guide

A modern, futuristic landing page for PortalSync - a technology consultancy specializing in software development, system integrations, ERP solutions, and commercial automation systems.

**Experience Qualities**:
1. **Professional** - Conveys enterprise-level expertise and reliability through clean layouts and structured information architecture
2. **Innovative** - Demonstrates cutting-edge capabilities through smooth animations, modern design patterns, and futuristic aesthetics
3. **Trustworthy** - Builds credibility through clear service descriptions, professional presentation, and accessible contact methods

**Complexity Level**: Content Showcase (information-focused) - This is a multi-section marketing landing page designed to present services, expertise, and company information with interactive elements and a contact form, but without complex application state management.

## Essential Features

### Hero Section with Animated Introduction
- **Functionality**: Eye-catching opening section with company tagline, value proposition, and call-to-action
- **Purpose**: Immediately communicate what PortalSync does and capture visitor attention
- **Trigger**: Page load
- **Progression**: Fade-in animation on mount → Floating/gradient background effects → CTA button hover states → Click navigates to contact
- **Success criteria**: Hero loads within 1 second, animations are smooth (60fps), text is readable, CTA is prominent

### Services Showcase Grid
- **Functionality**: Display core service offerings (Software Development, ERP Consulting, System Integrations, Commercial Automation)
- **Purpose**: Clearly communicate specialized services and expertise areas
- **Trigger**: Scroll into view
- **Progression**: Cards appear in viewport → Stagger animation triggers → Hover reveals more details → Click expands service information
- **Success criteria**: All four services visible, icons appropriate, descriptions clear and concise

### Technology Stack & Expertise
- **Functionality**: Showcase technologies, frameworks, and platforms the company specializes in
- **Purpose**: Build technical credibility and show depth of expertise
- **Trigger**: Scroll into view
- **Progression**: Section enters viewport → Tech logos/badges animate in → Hover highlights individual technologies
- **Success criteria**: Technologies are recognizable, layout is clean, animations enhance rather than distract

### About/Company Section
- **Functionality**: Brief company overview, mission, and startup partnership mention
- **Purpose**: Humanize the brand and establish company credibility
- **Trigger**: Scroll into view
- **Progression**: Text fades in → Optional stat counters animate up → Read more interaction if needed
- **Success criteria**: Concise text (2-3 paragraphs), clearly communicates company values

### Contact Form
- **Functionality**: Multi-field form (name, email, company, service interest, message) with validation
- **Purpose**: Primary conversion point for lead generation
- **Trigger**: User scrolls to contact section or clicks CTA
- **Progression**: User focuses field → Label animates → User fills form → Validation on blur → Submit → Loading state → Success/error toast
- **Success criteria**: All fields validate correctly, form submits successfully (stored in KV), clear success feedback, accessible

### Theme Toggle (Light/Dark Mode)
- **Functionality**: Switch between light and dark color schemes
- **Purpose**: User preference and modern UX expectation
- **Trigger**: Click theme toggle button in header
- **Progression**: Click toggle → Theme preference saved → Smooth color transition → All components update
- **Success criteria**: Theme persists across sessions, smooth transitions, both themes are equally polished

### Scroll Animations & Progress
- **Functionality**: Elements animate as they enter viewport, optional scroll progress indicator
- **Purpose**: Create engaging, dynamic experience that guides user through content
- **Trigger**: Scroll events
- **Progression**: User scrolls → Elements detect viewport intersection → Animations trigger on enter
- **Success criteria**: Animations are smooth, performant, and enhance rather than distract

## Edge Case Handling

- **Form Validation Errors**: Clear inline error messages below each field with specific guidance
- **Network Failures**: Toast notification if form submission fails with retry option
- **Missing Form Fields**: Required field indicators, disable submit until valid
- **Rapid Theme Switching**: Debounce theme toggle to prevent animation jank
- **Long Form Messages**: Textarea with character counter and appropriate max length
- **Mobile Navigation**: Hamburger menu for smaller screens with smooth slide-in drawer
- **Slow Network**: Skeleton loaders for sections, optimized images, lazy loading
- **Accessibility**: Keyboard navigation, ARIA labels, focus management, screen reader support

## Design Direction

The design should evoke feelings of technological sophistication, professional reliability, and forward-thinking innovation. It should feel like a cutting-edge tech company that enterprises can trust - combining futuristic aesthetics (gradients, glass morphism, smooth animations) with professional structure (clear hierarchy, organized layouts, readable typography). The experience should be immersive yet functional, impressive yet accessible.

## Color Selection

A sophisticated tech-forward palette built around deep blues and electric accents that conveys innovation and professionalism.

- **Primary Color**: Deep Electric Blue `oklch(0.45 0.19 252)` - Represents technology, trust, and innovation; used for primary CTAs and key interactive elements
- **Secondary Colors**: 
  - Midnight Blue `oklch(0.15 0.08 252)` - Deep backgrounds for dark mode, creating depth
  - Soft Slate `oklch(0.92 0.01 252)` - Light backgrounds and cards in light mode
- **Accent Color**: Cyber Cyan `oklch(0.75 0.15 195)` - Attention-grabbing highlight for hover states, important badges, and interactive elements
- **Foreground/Background Pairings**:
  - Light mode background (Soft Slate `oklch(0.98 0.005 252)`): Dark text `oklch(0.15 0.02 252)` - Ratio 14.2:1 ✓
  - Dark mode background (Midnight `oklch(0.12 0.06 252)`): Light text `oklch(0.97 0.01 252)` - Ratio 16.8:1 ✓
  - Primary buttons (Electric Blue `oklch(0.45 0.19 252)`): White text `oklch(1 0 0)` - Ratio 6.8:1 ✓
  - Accent (Cyber Cyan `oklch(0.75 0.15 195)`): Dark text `oklch(0.15 0.02 252)` - Ratio 9.2:1 ✓

## Font Selection

Typography should communicate technical precision while remaining approachable and highly readable across all sections.

**Primary Font**: Space Grotesk - A geometric sans-serif with technical character that maintains warmth and readability
**Secondary Font**: JetBrains Mono - For code snippets, technical details, or accent elements to reinforce tech credibility

- **Typographic Hierarchy**:
  - Hero Heading (H1): Space Grotesk Bold / 56px / -0.02em tracking / line-height 1.1
  - Section Headings (H2): Space Grotesk Bold / 40px / -0.01em tracking / line-height 1.2
  - Subsection Headings (H3): Space Grotesk Semibold / 28px / normal tracking / line-height 1.3
  - Body Text: Space Grotesk Regular / 17px / normal tracking / line-height 1.6
  - Small Text/Captions: Space Grotesk Regular / 14px / normal tracking / line-height 1.5
  - Technical Labels: JetBrains Mono Medium / 13px / normal tracking / uppercase

## Animations

Animations should create a sense of fluid, responsive interaction that feels both futuristic and professional - smooth scroll-triggered reveals, subtle hover states, and purposeful micro-interactions that guide attention without overwhelming.

**Key Animation Patterns**:
- Scroll-triggered fade-up for content sections (300ms ease-out)
- Staggered card reveals in service grid (100ms delay between each)
- Smooth color transitions for theme switching (200ms)
- Magnetic hover effects on CTAs with scale (1.02) and shadow
- Background gradient animations (subtle, slow-moving for depth)
- Form field focus with subtle glow and label float
- Success states with checkmark animation and confetti micro-interaction

## Component Selection

### Components
- **Navigation**: Custom sticky header with logo, menu links, and theme toggle - transparent on hero, solid background on scroll
- **Hero**: Custom full-height section with gradient background, animated text using framer-motion
- **Service Cards**: shadcn Card components with hover effects, icons from Phosphor, custom hover states
- **Tech Stack**: Custom grid layout with Badge components for tech logos/names
- **About Section**: Card with custom layout, potential use of Separator for visual breaks
- **Contact Form**: shadcn Form with Input, Textarea, Select (for service interest), Button - full validation with react-hook-form and zod
- **Theme Toggle**: Custom button with sun/moon icons from Phosphor, positioned in header
- **Toast Notifications**: sonner for form submission feedback
- **Footer**: Custom component with company info, links, social icons

### Customizations
- **Gradient Backgrounds**: Custom CSS with animated gradients using repeating-radial-gradient and background-blend-mode
- **Scroll Progress Bar**: Custom component tracking scroll position with fixed bar at top
- **Animated Section Wrapper**: Custom component using Intersection Observer and framer-motion for scroll-triggered animations
- **Magnetic Buttons**: Custom hover effect using framer-motion for CTAs
- **Glass Morphism Cards**: Custom styling with backdrop-filter and semi-transparent backgrounds

### States
- **Buttons**: Default (gradient background), Hover (scale + enhanced shadow + brightness), Active (scale down 0.98), Focus (ring), Disabled (opacity 0.5 + no interaction)
- **Form Inputs**: Default (border subtle), Focus (border accent + glow), Error (border red + error message), Success (border green + checkmark), Disabled (opacity 0.6)
- **Cards**: Default (subtle shadow), Hover (lifted shadow + subtle scale 1.02 + border glow)
- **Theme Toggle**: Light icon visible in light mode, dark icon in dark mode, smooth rotation on toggle

### Icon Selection
- **Navigation**: List/X (hamburger menu), MoonStars/Sun (theme toggle)
- **Services**: Code, Database, GitBranch, ChartBar (representing different service areas)
- **Contact**: Envelope, Phone, MapPin, PaperPlane (submit button)
- **Social/Footer**: GithubLogo, LinkedinLogo, InstagramLogo
- **Decorative**: Lightning, Sparkle, Rocket (for accent elements)

### Spacing
- **Container Max Width**: 1280px with px-6 (mobile) / px-12 (desktop)
- **Section Padding**: py-16 (mobile) / py-24 (desktop)
- **Card Padding**: p-6 (mobile) / p-8 (desktop)
- **Grid Gaps**: gap-6 (mobile) / gap-8 (desktop)
- **Element Spacing**: Space-y-4 for related content, space-y-8 for section breaks
- **Form Field Spacing**: space-y-6 for field groups

### Mobile
- **Navigation**: Hamburger menu opening full-screen drawer with smooth slide-in animation
- **Hero**: Single column, heading size reduced to 36px, maintain visual hierarchy
- **Services Grid**: Single column stack on mobile, 2 columns on tablet (md:), 4 columns desktop (lg:)
- **Contact Form**: Full width fields, larger touch targets (min 44px height)
- **Typography**: Scale down 20-30% on mobile while maintaining hierarchy
- **Spacing**: Reduce section padding to py-12, container px-4
- **Animations**: Simplified on mobile for performance (reduce-motion respected)
