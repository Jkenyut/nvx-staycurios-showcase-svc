# NVX StayCurios Showcase


<h3 align="center">🚀 A Showcase Application for the StayCurios Platform 🚀</h3>

<p align="center">
  An interactive web application designed to demonstrate the powerful features and seamless API integrations of the StayCurios platform.
</p>

<p align="center">
  <!-- Badges/Shields -->
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License">
  <img src="https://img.shields.io/badge/React-18-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5.x-purple?logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css" alt="Tailwind CSS">
</p>

<!-- Replace with a screenshot or GIF of your application -->
<p align="center">
  <img src="https://raw.githubusercontent.com/m-satria-saputro/nvx-staycurios-showcase/main/public/showcase.png" alt="NVX StayCurios Showcase Preview">
</p>

---

## ✨ Key Features

-   ✅ **Interactive Demos:** Hands-on examples showcasing StayCurios platform capabilities.
-   ✅ **Seamless API Integration:** Demonstrates how to effectively connect with and consume StayCurios APIs.
-   ✅ **Dynamic Content Presentation:** Highlights best practices for displaying dynamic content fetched from the platform.
-   ✅ **Fully Responsive Design:** A clean, modern UI that looks great on all devices, from mobile to desktop.
-   ✅ **Extensible & Customizable:** Built with a modular structure that is easy to extend and adapt for your own projects.

## 🛠️ Tech Stack

This project is built with a modern, performant, and developer-friendly tech stack.

-   **Framework:** [React](https://react.dev/) (via [Vite](https://vitejs.dev/))
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **API Client:** [Axios](https://axios-http.com/) (or native Fetch API)
-   **Package Manager:** [pnpm](https://pnpm.io/) (or `npm`/`yarn`)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### 1. Prerequisites

Make sure you have the following installed:
-   [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
-   [pnpm](https://pnpm.io/installation) (or `npm`/`yarn`)

### 2. Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/m-satria-saputro/nvx-staycurios-showcase.git](https://github.com/m-satria-saputro/nvx-staycurios-showcase.git)
    cd nvx-staycurios-showcase
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set Up Environment Variables:**
    This project requires API credentials to connect to the StayCurios platform.

   -   Create a new file named `.env` in the root of the project.
   -   Add the necessary environment variables as shown in the example file `.env.example`.
       ```env
       VITE_STAYCURIOS_API_KEY="YOUR_API_KEY_HERE"
       VITE_STAYCURIOS_API_ENDPOINT="[https://api.staycurios.com/v1](https://api.staycurios.com/v1)"
       ```

### 3. Running the Development Server

Start the development server with:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

### 4. Building for Production

To create an optimized production build, run:

```bash
pnpm build
```

This command will generate a `dist` directory with all the static assets ready for deployment.

## 📂 Project Structure

The project follows a standard Vite + React project structure, organized for clarity and scalability.

```
nvx-staycurios-showcase/
├── public/                 # Static assets (favicon, images)
├── src/
│   ├── assets/             # Static assets managed by the bundler (CSS, fonts)
│   ├── components/         # Reusable UI components (Button, Card, etc.)
│   ├── hooks/              # Custom React hooks (e.g., useApi)
│   ├── lib/                # API clients, utility functions
│   ├── pages/              # Main page components
│   ├── App.tsx             # Root application component
│   └── main.tsx            # Application entry point
├── .env.example            # Example environment variables
├── package.json
└── README.md
```

## 🚢 Deployment

The easiest way to deploy this application is by using [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/)

Remember to add your environment variables (e.g., `VITE_STAYCURIOS_API_KEY`) to the project settings on your hosting provider.

## 🤝 Contributing

Contributions from the community are highly welcome! To contribute:

1.  **Fork** the repository.
2.  Create a new **feature branch** (`git checkout -b feature/YourAmazingFeature`).
3.  **Commit** your changes with clear, descriptive messages.
4.  **Push** to the branch (`git push origin feature/YourAmazingFeature`).
5.  Open a **Pull Request** for review.

Please ensure your code adheres to the project's coding standards.

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/license/mit). See the `LICENSE` file for more details.

## 📬 Contact

**Satria Nur Saputro**

-   Email: [satrianursaputro06@gmail.com](mailto:satrianursaputro06@gmail.com)

---

Built with passion and curiosity.
