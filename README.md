# Duronto Courier — Parcel Delivery Platform

A full-stack courier-service application built to connect customers, delivery riders, and administrators in one parcel-management workflow. The project pairs a React/Vite frontend with a Node.js/Express API, MongoDB persistence, Firebase Authentication, and Stripe payment processing.

**P** [Backend repository](https://github.com/Samir-Sadaf25/DurontoCourier-server)

## Project highlights

- Built customer flows to register and sign in, check delivery coverage, book document or non-document parcels, estimate delivery fees, and view parcel and payment history.
- Developed operational dashboards with separate customer, rider, and administrator routes, including rider applications and status management.
- Implemented an admin parcel-assignment workflow that offers active riders serving the parcel recipient's region.
- Integrated Stripe Elements on the frontend and PaymentIntent/payment-record endpoints on the API.
- Connected Firebase Authentication on the client to Firebase Admin ID-token verification on the server; MongoDB stores users, parcels, riders, and payment records.
- Designed a location coverage experience with React Leaflet and a district dataset, plus reusable UI such as rider detail modals.

## Architecture

This project is maintained as two repositories:

| Repository | Responsibility | Main technologies |
| --- | --- | --- |
| [Duronto-Courier](https://github.com/Samir-Sadaf25/Duronto-Courier) | Browser application, pages, routing, authentication UI, dashboards, maps, and payment UI | React 19, Vite, React Router, Tailwind CSS, Firebase client SDK, Stripe React SDK |
| [DurontoCourier-server](https://github.com/Samir-Sadaf25/DurontoCourier-server) | REST API, MongoDB operations, Firebase token/role checks, Stripe PaymentIntents | Node.js, Express 5, MongoDB Node driver, Firebase Admin, Stripe Node SDK |

The frontend makes HTTP requests to the API (configured in the frontend code for `http://localhost:3000`). Firebase sign-in provides an ID token that the secure Axios client attaches to authenticated requests. The server verifies tokens and checks MongoDB user roles on protected admin routes. Parcel and payment data is stored in MongoDB; Stripe handles card payment intents.

## Frontend capabilities

- Landing page with service information, process, testimonials, merchant promotion, and FAQs.
- District coverage search and interactive map.
- Parcel booking form with sender/receiver information, service center selection, tracking ID generation, and estimated costs in Bangladeshi taka.
- Firebase-backed login and registration.
- Customer parcel dashboard, payment flow, and payment history.
- Rider application and assigned-parcel screens.
- Admin screens for rider review/approval, active rider management, and parcel assignment.
- Authentication and role-protected routes.

## Backend capabilities

The Express application in `index.js` connects to MongoDB database `DurontoCourier` and defines API routes for users, parcels, riders, admin workflows, and payments. The server also exposes a root health response and creates Stripe PaymentIntents. Admin routes use Firebase ID-token verification and a MongoDB role check; user-scoped payment lookup verifies the authenticated user's email.

## Tech stack

### Frontend

- JavaScript, React 19, Vite 6
- React Router 7, TanStack Query, Axios
- Firebase Authentication
- Tailwind CSS 4 and DaisyUI
- Stripe React SDK
- React Leaflet / Leaflet
- React Hook Form, SweetAlert2, React Toastify

### Backend

- Node.js with CommonJS modules
- Express 5 and CORS
- MongoDB Node.js driver
- Firebase Admin SDK
- Stripe Node.js SDK
- dotenv

## Run locally

### 1. Start the API

```bash
git clone https://github.com/Samir-Sadaf25/DurontoCourier-server.git
cd DurontoCourier-server
npm install
```

Create `.env` in the server directory:

```dotenv
PORT=3000
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Place the Firebase Admin service-account JSON at `duronto-courier-admin-key.json` in the server directory. This credential is ignored by Git; obtain it from your Firebase project and do not commit it. Start the API:

```bash
node index.js
```

The server defaults to `http://localhost:3000` and responds to `GET /` with a health message. The project does not define npm scripts in its backend `package.json`.

### 2. Start the frontend

In another terminal:

```bash
git clone https://github.com/Samir-Sadaf25/Duronto-Courier.git
cd Duronto-Courier
npm install
```

Create `.env` in the frontend directory with the Firebase web-app values and Stripe publishable key:

```dotenv
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_firebase_messaging_sender_id
VITE_appId=your_firebase_app_id
VITE_publishableKey=your_stripe_publishable_key
```

Then run:

```bash
npm run dev
```

Other frontend scripts are `npm run build`, `npm run preview`, and `npm run lint`.

## Selected implementation details

- `src/Routes/Routes.jsx` defines public, authentication, customer, rider, and admin route groups.
- `src/pages/Booking Parcel/BookingParcel.jsx` builds the parcel form and computes a price preview from parcel type, weight, and sender/receiver regions.
- `src/pages/Covarage/Coverage.jsx` renders searchable district coverage with Leaflet markers.
- `src/pages/Dashboard/Parcel Assignment/ParcelAssignment.jsx` filters active riders by recipient region before assignment.
- `index.js` contains Express route handlers and the MongoDB collections for parcels, payments, riders, and users.
- Recent commits document the rider approval and assigned-parcel workflows, and the addition of rider region data for location-based assignment.

## Notes

- The backend repository contains the server implementation; no API server code is bundled in the frontend repository.
- The frontend currently references the local API URL directly in its Axios client and parcel-booking request. Update those references when deploying the API elsewhere.
- Firebase, MongoDB, and Stripe credentials are required for corresponding integrations. Keep private keys and secret environment variables out of version control.
- This README describes the source currently present in both repositories; deployment URLs and production hosting configuration are not defined here.
