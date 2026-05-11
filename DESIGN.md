# Parental Awareness Hub — Understanding Children

## Tone & Context
Warm, emotionally intelligent social awareness platform for parents. Modern emotional wellness aesthetic — professional, approachable, emotionally resonant. Inspired by contemporary parenting/wellness platforms but with distinctive warm-pastel soft-shadow identity. Every interaction feels supportive and non-judgmental.

## Color Palette (OKLCH)
| Name       | L    | C     | H   | Usage                               |
|------------|------|-------|-----|-------------------------------------|
| Background | 0.96 | 0.007 | 54  | Warm cream/beige, approachable      |
| Card       | 1.0  | 0.003 | 0   | Pure white, soft-shadow elevation   |
| Primary    | 0.55 | 0.09  | 180 | Muted teal, calm and safe           |
| Secondary  | 0.72 | 0.08  | 140 | Soft sage green, growth/wellness    |
| Accent     | 0.62 | 0.12  | 125 | Warm purple, emotional support      |
| Foreground | 0.25 | 0.02  | 54  | Dark warm brown, readable text      |
| Destructive| 0.58 | 0.18  | 25  | Warm red, alerts and caution        |

## Typography
Display & Body: General Sans (warm, friendly, modern sans-serif). Mono: Geist Mono (for data/input). Type scale: 12px (xs), 14px (sm), 16px (base), 18px (lg), 20px (xl), 24px (2xl), 32px (3xl).

## Shape Language
Borders: 6px (subtle), 12px (cards), 16px (modals). No sharp corners. Soft shadows: 0 4px 16px rgba(0,0,0,0.06) — elevation without drama. Glass effect replaced with soft-shadow card effect: `box-shadow: 0 4px 16px rgba(0,0,0,0.06)`, `background: white or bg-muted-light`, `border: 1px solid oklch(var(--border) / 0.2)`.

## Structural Zones
| Zone            | Background                  | Treatment                             |
|-----------------|-----------------------------|-----------------------------------------|
| Navbar          | Card (soft-shadow, cream)   | Logo, nav links, auth, theme toggle    |
| Hero Section    | Background (warm cream)     | Emotionally resonant tagline, CTA      |
| Learning Cards  | Card (soft-shadow)          | 6 modules in grid, hover elevation     |
| Content Section | Background + card overlay   | Articles, infographics, tips           |
| Chatbot         | Card (soft-shadow, float)   | Bottom-right floating, warm accent     |
| Footer          | Muted background            | Support links, resources, contact      |

## Spacing & Rhythm
Base unit: 4px. Padding: 12px/16px/24px/32px. Gaps: 16px/24px. Density: relaxed (breathing room for emotional warmth). Card padding: 24px. Section edges: 24px padding from viewport edges.

## Component Patterns
Buttons: primary/secondary teal, soft-shadow on hover, warm accent for CTA. Inputs: soft card background, border on focus, muted text. Selects: card bg with soft shadow. Modals: overlay with white card, soft shadows, slide-in animation. Notifications: toast at bottom-right with soft shadow and warm accent.

## Motion & Animation
Base transition: `cubic-bezier(0.4, 0, 0.2, 1)` (0.3s default). Entrance: fade-in + slide-up (300ms ease-out). Hover: soft shadow deepening (0 4px 16px → 0 8px 24px). Button: color shift on hover/active. Card: shadow elevation on hover. Floating chatbot: gentle bob animation (infinite, 3s). Toast: slide-in from bottom-right (0.3s). All animations via Framer Motion.

## Constraints
- No dark glassmorphism or neon glows — warm and approachable instead.
- No arbitrary colors — use token palette exclusively.
- No full-page gradients — depth via layered soft shadows and card hierarchy.
- No bouncy animations — smooth, intentional motion only.
- Soft shadows over glow effects — refined and professional.

## Signature Detail
Soft-shadow cards on warm cream background create emotional warmth and accessibility. Muted teal + sage green + warm purple accents convey calm, support, and growth. Soft shadows (not glows) elevate surfaces with refined professionalism. Cards breathe through padding and spacing, never cramped. Typography is warm and inviting without being childish.

## Differentiation
Unlike generic wellness platforms, Parental Awareness Hub leads with **warm palettes, soft shadows, and emotional design**. No dark mode defaults or neon colors — this is a supportive, approachable platform for serious parenting conversations. The aesthetic is mature and professional, yet emotionally warm and non-judgmental. Design serves the mission: helping parents understand their children better.

