# VS Code 

Here’s your altered README adapted to fit your ChefAI project built using modern React tools, without Firebase mentions, and aligning with your hackathon concept:

⸻


# 🍳 ChefAI – AI Recipe Generator

ChefAI is a smart web application built using modern React tools. It helps users generate personalized recipes based on the ingredients they already have, with dietary filters like vegetarian, vegan, and gluten-free.

Built with ❤ by *Team Nova Vertex*.

---

## 🚀 Features

- *React 18* – Modern and fast UI rendering
- *Vite* – Super-fast development and bundling
- *Redux Toolkit* – Efficient global state management
- *TailwindCSS* – Utility-first CSS for sleek and responsive UI
- *React Router v6* – Simple and powerful routing
- *Framer Motion* – Smooth animations for transitions and components
- *React Hook Form* – Clean and fast form management
- *Responsive Design* – Works on all devices, from desktop to mobile
- *Recipe Intelligence* – Recipes adapt to your selected ingredients and preferences
- *Alternative Suggestions* – Ingredient substitutes for rare items

---

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

---

## 🛠 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chefai.git
   cd chefai

	2.	Install dependencies:

npm install
# or
yarn install


	3.	Start the development server:

npm run dev
# or
yarn dev



⸻

📁 Project Structure

chefai/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable components (Sidebar, RecipeCard, Filters, etc.)
│   ├── pages/          # Main pages (Home, Auth, Profile)
│   ├── styles/         # Tailwind and global styles
│   ├── App.jsx         # Main app wrapper
│   ├── Routes.jsx      # Routing configuration
│   └── main.jsx        # App entry point
├── .env                # Environment variables
├── index.html          # Main HTML template
├── package.json        # Project config and dependencies
├── tailwind.config.js  # Tailwind configuration
└── vite.config.js      # Vite build configuration


⸻

🧩 Adding Routes

To add new pages, update the Routes.jsx file:

import { useRoutes } from "react-router-dom";
import Home from "pages/Home";
import Login from "pages/Login";
import Profile from "pages/Profile";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/profile", element: <Profile /> },
  ]);

  return routes;
};

export default AppRoutes;


⸻

🎨 Styling

Tailwind CSS is used with the following features:
	•	Typography plugin for readable recipe instructions
	•	Aspect Ratio plugin for responsive recipe images
	•	Container queries for layout responsiveness
	•	Fluid Typography for adaptive text sizing
	•	Custom animations using Framer Motion

⸻

📱 Responsive Design

The layout is fully responsive:
	•	Sidebar navigation for larger screens
	•	Collapsible or stacked sections on mobile
	•	Ingredient selector and recipe viewer adapt based on screen size

⸻

📦 Deployment

To build the application for production:

npm run build

Then, deploy it on any static hosting platform like:
	•	Netlify
	•	Vercel
	•	GitHub Pages

⸻

👥 Team Nova Vertex
	•	Shreya Sharma
	•	[Add other team members here]

⸻

🏁 License

This project is open-source and built for educational and hackathon use only.

---

 
