# 🛍️ LS Fashion Store | Premium E-Commerce Platform

![Vercel Deployment](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Shopify](https://img.shields.io/badge/Shopify_Storefront_API-96BF48?style=for-the-badge&logo=shopify&logoColor=white)

LS Fashion Store is a state-of-the-art, high-performance web application engineered for luxury fashion retail. Featuring modern glassmorphism UI aesthetics, dynamic collection filtering, and seamless real-time integration with the **Shopify Storefront API**.

---

## 🌐 Live Experience

Experience the live storefront with real-time checkout and dynamic inventory synchronization:

🔗 **[Visit LS Fashion Store Live](https://ls-fashion-store.netlify.app)** 

---

## ✨ Highlights & Key Features

* 👗 **Dynamic Collection Filtering:** URL-driven state parameters supporting seamless navigation across **Unstitched**, **Western Wear**, **Accessories**, **Footwear**, and **Fragrances**.
* ⚡ **Headless Shopify Integration:** Direct GraphQL/REST Storefront API integration fetching real-time product data, variants, pricing, and stock status.
* 🎨 **Contemporary Aesthetic:** Designed with sleek glassmorphic overlays, vibrant high-resolution visual sliders, and responsive typography tailored for luxury retail.
* 🛒 **Interactive Slide-Over Cart:** Client-side cart state management allowing fast product management and smooth shopping transitions.
* 📱 **Mobile-First Responsive Layout:** Fluid layouts engineered for desktop browsers, tablets, and mobile screens.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | React.js (Powered by Vite) |
| **Styling Framework** | Tailwind CSS + Custom Utility Classes |
| **Routing** | React Router DOM v6 |
| **Backend & CMS** | Headless Shopify Storefront API |
| **Deployment & Hosting**| netlify

---

## 📂 System Architecture Overview

```text
src/
 ├── assets/          # Static branding assets, icons, and hero slider images
 ├── components/      # Reusable UI components (Navbar, CartDrawer, HeroSlider, Footer)
 ├── pages/           # Application views (HomePage, ShopPage, ProductDetail)
 ├── services/        # Shopify Storefront API fetchers and GraphQL queries
 └── App.jsx          # Root layout and client-side routing definitions
