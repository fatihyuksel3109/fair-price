# FairPrice Estimator - MVP

## Overview
FairPrice Estimator is a web app that helps designers, developers, and other professionals estimate the fair price for a job based on predefined criteria. Users answer a series of questions to determine job complexity, duration, and requirements, after which the system provides a fair price range based on static pricing rules.

## Tech Stack
- **Framework**: Next.js (App Router)
- **UI Library**: ShadCN (for components)
- **State Management**: Context API (for storing responses)
- **Styling**: Tailwind CSS
- **Hosting**: Vercel

## Features (MVP - Static Pricing Model)
1. **Interactive Question Flow**: Users are guided through a series of predefined questions.
2. **Rule-Based Price Estimation**: Pricing is calculated based on predefined static values.
3. **Category-Based Suggestions**: Different job types (e.g., web design, mobile development, UI/UX design, SEO services, copywriting, video editing, digital marketing, and branding) have tailored pricing rules.
4. **Dark Mode Support**.
5. **Responsive Design**: Works across all devices.

## Job Categories Supported
- **Web Development** (Frontend, Backend, Full Stack, Web Apps)
- **Mobile Development** (iOS, Android, React Native, Flutter)
- **UI/UX Design** (Wireframing, Prototyping, Full Design Systems)
- **SEO & Digital Marketing** (Keyword Optimization, Ad Campaigns, Social Media Management)
- **Graphic Design & Branding** (Logos, Business Cards, Branding Kits)
- **Content Creation** (Copywriting, Technical Writing, Blog Posts, Video Editing)
- **Consulting & Strategy** (Business Strategy, Tech Consulting, Market Research)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/fatihyuksel3109/fair-price-estimator.git
   cd fairprice-estimator
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser.

## Folder Structure
```
/fairprice
├── app/
│   ├── context/
│   │   └── EstimationContext.tsx
│   ├── favicon.ico
│   ├── globals.css (Styling)
│   ├── layout.tsx (Global Layout)
│   └── page.tsx
├── /components (Reusable UI components)
├── /utils (Static pricing rules)
├── next.config.js
├── package.json
├── README.md
```

## Future Enhancements (AI-Driven Phase)
- **AI-Powered Dynamic Pricing**: Use OpenAI API to analyze market trends and generate real-time pricing suggestions.
- **User History & Analytics**: Allow users to save past estimates and track industry trends.
- **Customization & Negotiation**: Users can tweak parameters to refine estimates.
- **API for Market-Based Adjustments**: Fetch real-time freelance pricing data from sources like Upwork, Fiverr, and industry benchmarks.

## Contribution
Contributions are welcome! Feel free to fork the project and submit a PR.

## License
MIT License
