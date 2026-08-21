# ETN Melody E-Commerce

Full-stack, API-backed e-commerce platform for ETN Melody’s compact audio range.

## Stack

- Frontend: React, Vite, React Router, Tailwind CSS, Axios, React Hook Form
- Backend: Node.js, Express, MongoDB/Mongoose, JWT, bcrypt

## Run locally

1. Copy `backend/.env.example` to `backend/.env` and set `MONGODB_URI` plus a secure `JWT_SECRET`.
2. Copy `frontend/.env.example` to `frontend/.env` if the API URL differs.
3. Install dependencies: `npm run install:all`
4. Seed catalog and admin: `cd backend && npm run seed`
5. Run both services: `npm run dev`

Frontend runs at `http://localhost:5173`; the REST API at `http://localhost:5000`.

Seeded admin credentials are `admin@etnmelody.in` / `Admin@123`; change these after first use.

If the catalog is already populated but the admin login is missing or its password needs to be reset, run `npm run admin:create --prefix backend`. This creates/updates only the admin account and does not delete products. You can override the defaults with `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `backend/.env`. After signing in at `http://localhost:5173/login`, administrators are redirected to `http://localhost:5173/admin`.

## Architecture

`backend/src` contains Mongoose models, auth/error middleware, REST routes, and a seed script. `frontend/src` contains reusable storefront components, auth/cart context, Axios client, and pages. Products and categories are always loaded through the API; guest cart state uses local storage and authenticated cart state uses MongoDB.

## API overview

- `/api/auth` — registration, login, session profile
- `/api/products`, `/api/categories` — paginated catalog search and filters
- `/api/cart`, `/api/orders` — protected customer cart and ordering
- `/api/admin` — role-protected dashboard, product/order/customer endpoints

Razorpay is represented as a payment-method abstraction at checkout; keys never enter the frontend and can be added in backend environment configuration.
