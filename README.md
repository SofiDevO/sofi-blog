# SofiBlog 

A modern, fast, and SEO-optimized blog platform built with Astro and powered by WordPress as a headless CMS. Features a beautiful design, user authentication, commenting system, and focuses on web development content. 🚀💜

## ✨ Features

- **⚡ Lightning Fast**: Built with Astro for optimal performance and SEO
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **🎨 Modern UI**: Clean, professional design with atomic design principles  
- **🔐 User Authentication**: Login, registration, and user dashboard
- **💬 Comments System**: Interactive commenting with reply functionality
- **🔍 Search**: Advanced search functionality across all content
- **📚 Categories**: Organized content in categories like tutorials, JavaScript, Astro, and more
- **🎯 WordPress Integration**: Headless WordPress CMS via GraphQL API
- **🚀 Vercel Deployment**: Optimized for Vercel with automatic deployments
- **🤖 SEO Optimized**: Sitemap generation, robots.txt, and meta tags

## 🛠️ Tech Stack

- **Frontend**: Astro 5.x, React, TypeScript
- **Styling**: Tailwind CSS, Sass
- **CMS**: WordPress (Headless) + WP GraphQL
- **Deployment**: Vercel
- **Authentication**: JWT tokens
- **Build Tools**: Vite, npm

## ⚠️ Upgrading to Astro v6

If you are migrating from previous versions or experiencing issues with Sass (`@use`) imports or missing environment variables (e.g., `jsonwebtoken` signature errors), please review the [Astro v6 Upgrade Guide](./DOCS.md).

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- WordPress site with WP GraphQL plugin

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SofiDevO/sofi-blog.git
   cd sofi-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file based on `dev.env`:
   ```bash
   cp dev.env .env
   ```
   
   Update the following variables:
   ```env
   SECRET_USER=your_wordpress_username
   SECRET_PASSWORD=your_wordpress_app_password
   WPGRAPHQL_URL=https://your-wordpress-site.com/graphql
   SECRET_KEY=your_jwt_secret_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

Following atomic design principles for scalable component architecture:

```
📦src
 ┣ 📂components
 ┃ ┣ 📂atoms          # Basic building blocks
 ┃ ┃ ┣ 📂HamburgerButton
 ┃ ┃ ┣ 📂NavLinks  
 ┃ ┃ ┣ 📂Title
 ┃ ┃ ┗ 📜...
 ┃ ┣ 📂molecules      # Simple component combinations
 ┃ ┃ ┣ 📂Comment
 ┃ ┃ ┣ 📂SearchForm
 ┃ ┃ ┗ 📜...
 ┃ ┗ 📂organisms      # Complex components
 ┃   ┣ 📂Header
 ┃   ┣ 📂Comments
 ┃   ┣ 📂Posts
 ┃   ┗ 📜...
 ┣ 📂content          # Content collections
 ┣ 📂controllers      # Business logic
 ┣ 📂data            # Data configuration
 ┣ 📂layouts         # Page layouts
 ┣ 📂pages           # Astro pages/routes
 ┃ ┣ 📂api           # API endpoints
 ┃ ┣ 📂blog          # Blog pages
 ┃ ┣ 📂authors       # Author pages
 ┃ ┗ 📜...
 ┣ 📂services        # External API services
 ┣ 📂styles          # Global styles
 ┣ 📂types           # TypeScript types
 ┣ 📂utils           # Utility functions
 ┣ 📜consts.ts       # App constants
 ┗ 📜env.d.ts        # Environment types
```

## 🎨 Categories

The blog focuses on web development content organized in these main categories:

- **📚 Tutoriales** - Step-by-step tutorials
- **🎓 Aprender a Programar** - Learning to code content  
- **🚀 Astro** - Astro framework content
- **💛 JavaScript** - JavaScript tutorials and tips
- **✍️ Escritura** - Writing and documentation

## 🔧 Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production 
- `npm run preview` - Preview production build locally
- `npm start` - Alias for dev command

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

The site is configured to deploy to: `https://sofidev.blog/`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**SofiDev** - [Website](https://sofidev.blog) 

---

Built with ❤️ using Astro and modern web technologies.
