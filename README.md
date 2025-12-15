# Market — Angular E‑Commerce SPA

A modern, responsive Angular single‑page e‑commerce application featuring:
- Public product catalog via FakeStoreAPI
- Role‑based views (Admin / User)
- Admin product CRUD persisted in LocalStorage (with createdAt)
- Shopping cart stored in LocalStorage (add/update/remove/total)
- Client‑side authentication (admin/user) + route guards
- i18n with ngx‑translate, Bootstrap UI, FontAwesome icons
- Deployed on GitHub Pages (static hosting)

Live Demo: https://salemabdelrahman.github.io/Market/  
Repository: https://github.com/Salemabdelrahman/Market

## Features

- Public Catalog
  - List products, view details, filter by category (FakeStoreAPI)
- Authentication
  - Client‑side login with two roles: admin/user (stored in LocalStorage)
  - Guards to protect `/admin/*` routes
- Admin
  - Create/Update/Delete products stored in LocalStorage (`admin_products`)
  - Auto‑generated `id` and `createdAt`
- Cart
  - LocalStorage‑based cart: add/remove/update/clear, compute totals
- i18n
  - ngx‑translate with JSON dictionaries in `assets/i18n`
- UI/UX
  - Bootstrap styling, FontAwesome icons
  - Not Found page with animated stars and astronaut (moved to TypeScript lifecycle)

## Tech Stack

- Angular, TypeScript, RxJS
- Angular Router, Guards
- ngx‑translate
- Bootstrap, SCSS, FontAwesome
- FakeStoreAPI (public data source)
- LocalStorage (Admin products + Cart + Auth session)

## Architecture Overview

- Services
  - `ProductService`: reads FakeStoreAPI; merges Admin products from LocalStorage for user views
  - [AdminProductsService](cci:2://file:///d:/My_Projects/market/src/app/core/services/admin-product-service.ts:5:0-75:1): CRUD to LocalStorage (`admin_products`)
  - `AuthService`: client‑side users/roles (admin/user), state in LocalStorage
  - `CartService`: LocalStorage cart with reactive stream
- Guards
  - [AuthGuard](cci:2://file:///d:/My_Projects/market/src/app/core/guards/auth.guard.ts:4:0-24:1): redirects unauthenticated users to `/login`, and enforces `role: 'admin'` for admin routes
- Pages
  - User: All Products, Product Details, Cart
  - Admin: Products (CRUD), Cart (if present)
  - Login, Not Found

## Project Structure (excerpt)

