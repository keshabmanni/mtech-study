---
name: Vintage Diner Gazette
colors:
  surface: '#fef9f0'
  surface-dim: '#ded9d1'
  surface-bright: '#fef9f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3ea'
  surface-container: '#f2ede4'
  surface-container-high: '#ece8df'
  surface-container-highest: '#e7e2d9'
  on-surface: '#1d1c16'
  on-surface-variant: '#444748'
  inverse-surface: '#32302a'
  inverse-on-surface: '#f5f0e7'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#7c5800'
  on-secondary: '#ffffff'
  secondary-container: '#febf39'
  on-secondary-container: '#6f4f00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#3d0700'
  on-tertiary-container: '#e6512e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffdea6'
  secondary-fixed-dim: '#fbbc36'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4200'
  tertiary-fixed: '#ffdad2'
  tertiary-fixed-dim: '#ffb4a3'
  on-tertiary-fixed: '#3d0700'
  on-tertiary-fixed-variant: '#8b1b00'
  background: '#fef9f0'
  on-background: '#1d1c16'
  surface-variant: '#e7e2d9'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: 0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: 0.05em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.06em
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0.01em
  body-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-lg:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.08em
  label-md:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Space Mono
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.12em
spacing:
  gutter: 0px
  gutter-loose: 1rem
  margin: 1.5rem
  margin-mobile: 0.75rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system draws direct inspiration from mid-century newspaper tabloids, vintage diner placemats, and neo-brutalist editorial layouts. The visual language conveys tangible print nostalgia, craftsmanship, and playful directness. It pairs utilitarian structure with tongue-in-cheek mid-century charm, evoking the immediate warmth of stepping into an iconic retro diner or flipping through a tactile, freshly printed food daily.

The target audience seeks authenticity, high-personality dining, craft hospitality, and distinct digital presence free from modern corporate blandness. The aesthetic rejects soft blurs, floaty elevations, and passive minimalism in favor of deliberate editorial brutalism: rigid tabular cells, crisp high-contrast black framing lines, graphic diagonal hatching patterns, and bold vintage headline cuts.

## Colors

The palette is rooted in newsprint physical materiality:
- **Primary (`#121212`)**: Deep carbon ink used for typography, heavy borders, geometric outlines, and solid stamps.
- **Secondary (`#F5B731`)**: Warm diner mustard gold, used for high-impact callout tiles, action buttons, pricing arrows, and attention stamps.
- **Tertiary (`#D94826`)**: Vintage vermillion red, reserved for badges, urgent alerts, special dispatches, and decorative stamp borders.
- **Neutral (`#F4EFE6`)**: Aged newsprint cream, replacing sterile digital white to create a warm, tactile, pulp-paper base. Sub-surfaces use `#EAE3D2` for contrasting table row striping or inset data cells.

Interactive states adhere strictly to high-contrast inversion: resting amber inverted to solid carbon ink on hover, or pure paper-fill with immediate 2.5px solid border definition.

## Typography

Typography functions as both voice and visual scaffolding. 
- **Headlines (`Space Grotesk`)**: Used in heavy weights (`700`), frequently set in full uppercase with expansive tracking (`0.05em` to `0.1em`) to mimic vintage wood-type printing press blocks and bold diner marquee boards.
- **Body (`Space Grotesk`)**: Clean, highly readable, structured in dense columns reminiscent of newspaper articles.
- **Labels & Numbers (`Space Mono`)**: Monospaced type for prices, nutrition stamps, ingredient indexes, and micro-metadata. 

All primary titles, navigation headers, and subheaders favor uppercase formatting with robust character tracking.

## Elevation & Depth

This design system deliberately eschews soft drop shadows, atmospheric blurs, and pseudo-skeuomorphic lighting. Depth is tactile, graphic, and mechanical:

- **Hard Contrast Hard-Shadows**: When physical lift is needed (e.g., interactive cards or pressed buttons), elevation is achieved strictly through sharp, unblurred directional drop shadows: `box-shadow: 4px 4px 0px #121212`. Hover states collapse this offset to `0px 0px 0px`, simulating mechanical depression.
- **Diagonal Hatching**: Secondary depth and decorative texture are rendered using 45-degree repeating line stripes (`repeating-linear-gradient(45deg, #121212, #121212 1px, transparent 0, transparent 4px)`), evoking copperplate printing and newspaper section breakers.
- **Layered Insets**: Sub-modules achieve hierarchy through surface contrast (e.g., layering a `#F5B731` highlight cell inside an off-white `#F4EFE6` master frame).

## Shapes

The shape system is strictly sharp (`roundedness: 0`). 

All buttons, tiles, inputs, modal containers, and photo wrappers feature `0px` border-radius. This crisp, rectilinear geometry reinforces the printing press block aesthetic and ensures border lines connect at sharp 90-degree junctions without awkward seams. 

Special decorative elements (such as price badges, seal stamps, or category medallions) may utilize pure geometric circles or chamfered/notched corners, but standard UI primitives remain resolutely rectangular.

## Components

### Buttons
- **Primary**: Solid `#F5B731` background, 2.5px solid `#121212` border, uppercase `Space Grotesk` bold text, sharp corners. Features a `3px 3px 0px #121212` drop shadow that collapses on active press (`transform: translate(3px, 3px)`).
- **Secondary / Action Invert**: Solid `#121212` background with `#F4EFE6` text.
- **Icon / Arrow Action Square**: Compact square cells (e.g., `44px x 44px`) filled with secondary amber, holding a thick carbon angled arrow (`↗`), embedded directly at the corner of pricing blocks.

### Cards & Menu Cells
- Built as contiguous grid cells with a shared `2.5px solid #121212` perimeter.
- Split horizontally into discrete functional zones: top media/illustration cell, middle editorial description, and bottom action/pricing footer.
- Footers feature split sub-cells dividing the price tag (`Space Mono` bold) and immediate action triggers.

### Inputs & Form Fields
- Set against off-white background with a `2px solid #121212` stroke.
- Monospaced helper labels (`label-sm`) positioned above the field or pinned as uppercase sub-headers.
- Focus state switches the background to bright parchment tint with a prominent `3px 3px 0px #121212` hard shadow.

### Checkboxes & Radios
- **Checkboxes**: Pure square boxes (`20px x 20px`), `2px solid #121212`. Checked state fills solid `#121212` with a high-contrast `#F5B731` or `#F4EFE6` graphic checkmark or solid black fill.
- **Radios**: Sharp square border containing a solid nested black square when active.

### Chips & Badges
- High-contrast pill-free stamps: framed by `1.5px solid #121212`, uppercase `Space Mono`, with micro tracking.
- Accent badges adopt a yellow `#F5B731` fill or a textured striped hatching background.

### Editorial Dividers & Banner Bands
- Horizontal section breakers adorned with dense diagonal hatching bars (`h-3` to `h-4`).
- Ticker ribbons featuring repetitive running uppercase text flanked by top and bottom 2.5px solid black rules.