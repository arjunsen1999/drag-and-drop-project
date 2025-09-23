📘 Next.js UI Demo Application
📖 Overview

This is a Next.js single-page application that demonstrates:

✅ Google reCAPTCHA validation

✅ Client-side pagination (10 items per page)

✅ Search filter for posts

✅ Drag-and-drop reordering within the current page

✅ API integration using a mock REST API (simulated in apis/mock.api.ts)

The project is designed as a frontend coding exercise to showcase UI development, API handling, and best practices.


📂 How to Run After Downloading ZIP

Download the project

If you received this project as a .zip file, unzip it.

You’ll see a folder (for example: my-app 2).

Open the folder

cd my-app 2

Install dependencies
npm install

Start development server
npm run dev


The app will be available at 👉 http://localhost:3000
.

Build for production (optional)

npm run build
npm start

Environment Variables

A .env.local file is already included in this project.

It contains the following test key:

NEXT_PUBLIC_SITE_KEY=6LedYtIrAAAAAHLmAMAeYOdLpXqgPVSiKjRaZmlY


This is Google’s public test key → it always passes validation.

For production, generate your own keys from the Google reCAPTCHA Admin Console
.

🖥️ Pages & Functionality

1. Landing Page (/)

Shows a Google reCAPTCHA widget (ImRobotComponent).

User must solve reCAPTCHA before moving forward.

After solving, clicking “Load More” navigates to ?tab=list.

2. List Page (?tab=list)

Displays posts fetched from mock API (mock.api.ts).

Features:

Search Bar → filters posts by name instantly.

Pagination → 10 items per page with next/prev navigation.

Drag & Drop → reorder posts within the current page.

Loading Spinner → smooth transition when fetching posts.

📡 Mock API Details

The fetchPosts function in apis/mock.api.ts simulates an API with:

100 posts generated in memory.

Optional search filter (case-insensitive).

Pagination using limit and page.

1-second delay to mimic network latency.

Example Response:

{
  "posts": [
    { "_id": "1", "name": "Post 1" },
    { "_id": "2", "name": "Post 2" }
  ],
  "total": 100,
  "currentPage": 1,
  "limit": 10,
  "totalPage": 10
}

⚡ Optimization Techniques

Loading State → Shows spinner while data is being fetched.

Pagination + Search → Reduces unnecessary re-fetching.

Drag-and-Drop → Implemented with @hello-pangea/dnd.

Environment Variables → Safe handling of reCAPTCHA key.

Responsive UI → Built with Tailwind CSS.

SEO-Friendly → Powered by Next.js.