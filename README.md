
# DevSEO Tools 🛠️

**DevSEO Tools** is a comprehensive, full-stack web portal designed for modern SEO professionals and developers. It serves as a central hub for specialized utilities that bridge the gap between technical web development and search engine optimization, featuring a high-performance "Glassmorphism" interface.

## 🚀 Key Features

-   **Centralized Tool Hub**: Access a suite of internal applications including the **Meta Scraper**, **Domain Checker**, **Link Converter**, and **URL Path Separator** from a single dashboard.
    
-   **Dynamic Portfolio Integration**: Showcases active projects with real-time descriptions, tech stacks, and direct links to live versions or repositories.
    
-   **Interactive Tech Stack Visualization**: Displays the primary technologies used across the ecosystem with branded iconography and categorization.
    
-   **Performance Optimized**: Built with a focus on speed and low latency, utilizing server-side rendering where necessary to ensure quick utility access.
    
-   **Modern Visual Language**: A sophisticated dark-themed UI featuring backdrop blurs, neon accents, and responsive card layouts optimized for high-resolution monitors.
    

## 🛠️ Technical Stack

-   **Frontend**: React.js 18+ for building a reactive and modular user interface.
    
-   **Backend Support**: Express.js (Node.js) for handling server-side API logic and scraping tasks.
    
-   **Styling**: Custom CSS with advanced utility classes for complex animations and "Glassmorphism" effects.
    
-   **Icons & UI**: Lucide React and FontAwesome for a professional, developer-oriented visual experience.
    
-   **Deployment**: Configured for Vercel/Render with automated build pipelines.
    

## 📁 Project Structure

Plaintext

```
├── api/               # Serverless backend functions and API routes
├── src/               # React application source code
│   ├── components/    # Reusable UI (Navbar, ToolCards, TechItems)
│   ├── pages/         # High-level views (Home, Tools, Portfolio)
│   ├── data/          # JSON configurations for tools and projects
│   └── App.jsx        # Routing and global state
├── public/            # Static assets and icons
└── package.json       # Project dependencies and scripts

```

## ⚙️ Development & Setup

1.  **Clone the repository**:
    
    Bash
    
    ```
    git clone https://github.com/your-username/devseo-tools.git
    cd devseo-tools
    
    ```
    
2.  **Install dependencies**:
    
    Bash
    
    ```
    npm install
    
    ```
    
3.  **Run Development Server**:
    
    Bash
    
    ```
    npm run dev
    
    ```
    
4.  **Environment Variables**: Create a `.env` file in the root directory if any external API keys (like Google Search Console or TMDB) are required for specific sub-tools.
    

## 📖 Available Utilities

-   **Meta Scraper**: Inspect SEO tags and social previews for any URL.
    
-   **Domain Checker**: Filter unique prospects from massive URL lists.
    
-   **Link Converter**: Format rich text into HTML/Markdown/BBCode.
    
-   **Path Separator**: Analyze directory structures of internal site links.
    

----------

_Developed by [Shakeeb](https://shakeeb-sa.github.io/) to empower the next generation of technical SEOs._
