# BOTANICA 🌿

**A personal plant care journal to organize your collection, track growth, and document every stage of your plants' journey.**

🌐 **Live application:** [BOTANICA](https://larissambraga.github.io/Botanica/)

## About the Project

BOTANICA is a responsive plant management application designed to make plant care more organized and enjoyable.

Users can register plants, manage watering schedules, upload photos, and create journal entries to document their plants' progress.

The project combines a nature-inspired interface with practical functionality, focusing on usability, accessibility, performance, and a polished user experience.

## Features

- **Plant Collection:** Add, view, and manage plants.
- **Plant Profiles:** Store plant names, species, categories, planting dates, and descriptions.
- **Watering Schedule:** Set watering frequencies for individual plants.
- **Photo Upload:** Add and update plant photos.
- **Plant Journal:** Create journal entries with notes and images.
- **Dashboard:** View collection statistics and recently added plants.
- **Data Persistence:** Store plant information using browser local storage.
- **Form Validation:** Validate required fields and provide user feedback.
- **Responsive Design:** Adapt the interface to different screen sizes.

## Performance, Accessibility & SEO

The project went through a frontend optimization and production-readiness pass, focusing on improving loading performance, accessibility, and search engine visibility.

Key improvements included:

- Optimized plant images by reducing image dimensions and file sizes.
- Implemented responsive image delivery with `srcSet` and `sizes`.
- Added asynchronous image decoding.
- Improved Google Fonts loading with resource preconnect and stylesheet preloading.
- Removed duplicated CSS rules to improve stylesheet maintainability.
- Improved text and background contrast to address WCAG accessibility findings.
- Added descriptive page titles and meta descriptions.
- Added alternative text to plant images.
- Reviewed responsive behavior across different screen sizes.
- Ran production builds and Lighthouse audits to evaluate the improvements.

## Tech Stack

- React 19
- TypeScript
- Vite 8
- CSS
- Lucide React
- Framer Motion
- Browser Local Storage

## Deployment

BOTANICA is deployed using **GitHub Pages**.

**Production URL:**  
https://larissambraga.github.io/Botanica/

The application is built for production using Vite and deployed from the generated `dist` directory.

No backend services or environment variables are required for the current application. Plant data is stored locally in the user's browser.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/LarissaMBraga/botanica.git
```

2. Navigate to the project directory:

```bash
cd botanica
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL provided by Vite.

### Production Build

Generate an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── Common/
│   ├── Dashboard/
│   ├── Journal/
│   ├── Layout/
│   ├── Plants/
│   └── UI/
├── data/
├── hooks/
├── pages/
├── types/
├── utils/
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

## Future Improvements

- User authentication and individual plant collections.
- Cloud-based data synchronization.
- Plant care reminders and notifications.
- More detailed growth tracking.

## Author

**Larissa Moreira Braga**

- [GitHub](https://github.com/LarissaMBraga)
- [Portfolio](https://larissabraga.dev)
- [LinkedIn](https://www.linkedin.com/in/larissa-braga128/)
