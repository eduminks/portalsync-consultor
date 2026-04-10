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

### Theme Toggle (Light/Dark/Cyberpunk Mode)
- **Functionality**: Cycle between light, dark, and cyberpunk neon color schemes
- **Purpose**: User preference and modern UX expectation with additional cyberpunk aesthetic option
- **Trigger**: Click theme toggle button in header
- **Progression**: Click toggle → Theme cycles (Light → Dark → Cyberpunk → Light) → Theme preference saved → Smooth color transition → All components update with theme-specific effects
- **Success criteria**: Theme persists across sessions, smooth transitions, all three themes are equally polished, cyberpunk theme includes neon glow effects

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

Uma paleta moderna e vibrante que equilibra profissionalismo com inovação tecnológica. Três temas distintos oferecem experiências visuais únicas:

**Light Mode**: Leve, limpo e profissional com toques vibrantes de roxo e turquesa
- **Primary Color**: Violeta Vibrante `oklch(58% 0.24 265)` - Energia, tecnologia e criatividade
- **Accent Color**: Turquesa Elétrico `oklch(65% 0.22 180)` - Destaque moderno e confiável
- **Background**: Quase Branco `oklch(98% 0.005 240)` - Base neutra e clara
- **Card**: Branco Puro `oklch(100% 0 0)` - Elevação e separação visual

**Dark Mode**: Sofisticado e imersivo com cores vibrantes que se destacam
- **Primary Color**: Roxo Brilhante `oklch(65% 0.25 265)` - Maior luminosidade para fundos escuros
- **Accent Color**: Turquesa Claro `oklch(70% 0.24 180)` - Contraste dinâmico
- **Background**: Preto Azulado `oklch(10% 0.02 240)` - Profundidade sofisticada
- **Card**: Grafite Escuro `oklch(14% 0.03 240)` - Camadas e hierarquia visual

**Cyberpunk Mode**: Estética neon futurista com efeitos de brilho intensos
- **Primary Color**: Magenta Neon `oklch(72% 0.28 320)` - Rosa elétrico hipnótico
- **Accent Color**: Verde Neon `oklch(75% 0.27 140)` - Contraste cibernético marcante
- **Secondary**: Ciano Neon `oklch(68% 0.26 180)` - Complemento tecnológico
- **Background**: Preto Violeta `oklch(8% 0.04 300)` - Base escura com toque roxo
- **Special Effects**: Todas as interações incluem halos neon (box-shadow), text-shadow em títulos, bordas luminosas

- **Foreground/Background Pairings**:
  - Light mode: Fundo `oklch(98% 0.005 240)` + Texto `oklch(15% 0.02 240)` - Ratio 18.2:1 ✓
  - Dark mode: Fundo `oklch(10% 0.02 240)` + Texto `oklch(98% 0.005 240)` - Ratio 19.4:1 ✓
  - Cyberpunk: Fundo `oklch(8% 0.04 300)` + Texto `oklch(95% 0.08 320)` - Ratio 16.8:1 ✓
  - Primary button: `oklch(58% 0.24 265)` + Texto Branco `oklch(100% 0 0)` - Ratio 6.2:1 ✓
  - Accent: `oklch(65% 0.22 180)` + Texto Branco `oklch(100% 0 0)` - Ratio 4.8:1 ✓

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
- Matrix-style binary rain animation in hero background
- Floating code symbols animated across the hero section
- Form field focus with subtle glow and label float
- Success states with checkmark animation and confetti micro-interaction
- **Cyberpunk Mode**: Enhanced neon glow effects on all interactive elements, pulsing shadows, and intensified particle animations

## Component Selection

### Components
- **Navigation**: Custom sticky header with logo, menu links, and theme cycler (Light/Dark/Cyberpunk) - transparent on hero, solid background on scroll
- **Hero**: Custom full-height section with gradient background, matrix-style animation canvas, animated text using framer-motion, floating code symbols
- **Service Cards**: shadcn Card components with hover effects, icons from Phosphor, custom hover states with theme-aware glows
- **Tech Stack**: Custom grid layout with Badge components for tech logos/names
- **About Section**: Card with custom layout, potential use of Separator for visual breaks
- **Contact Form**: shadcn Form with Input, Textarea, Select (for service interest), Button - full validation with react-hook-form and zod
- **Theme Cycler**: Custom button with sun/moon/lightning icons from Phosphor, positioned in header, cycles through three themes
- **Toast Notifications**: sonner for form submission feedback
- **Footer**: Custom component with company info, links, social icons

### Customizations
- **Gradient Backgrounds**: Custom CSS with animated gradients using repeating-radial-gradient and background-blend-mode
- **Scroll Progress Bar**: Custom component tracking scroll position with fixed bar at top
- **Animated Section Wrapper**: Custom component using Intersection Observer and framer-motion for scroll-triggered animations
- **Magnetic Buttons**: Custom hover effect using framer-motion for CTAs
- **Glass Morphism Cards**: Custom styling with backdrop-filter and semi-transparent backgrounds
- **Matrix Rain Animation**: Canvas-based binary code rain effect in hero background
- **Cyberpunk Neon Effects**: CSS-based glow effects (box-shadow, text-shadow, drop-shadow) activated in cyberpunk theme
- **Theme-Aware Components**: Dynamic styling based on active theme with enhanced effects for cyberpunk mode

### States
- **Buttons**: Default (gradient background), Hover (scale + enhanced shadow + brightness), Active (scale down 0.98), Focus (ring), Disabled (opacity 0.5 + no interaction), Cyberpunk (neon glow shadows)
- **Form Inputs**: Default (border subtle), Focus (border accent + glow), Error (border red + error message), Success (border green + checkmark), Disabled (opacity 0.6), Cyberpunk (glowing borders)
- **Cards**: Default (subtle shadow), Hover (lifted shadow + subtle scale 1.02 + border glow), Cyberpunk (neon border glow)
- **Theme Cycler**: Sun icon (light mode), Moon icon (dark mode), Lightning icon (cyberpunk mode), smooth icon transitions with rotation animation

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
