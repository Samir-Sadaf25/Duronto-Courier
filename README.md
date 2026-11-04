# Duronto Courier

Duronto Courier is a React web application for a parcel delivery service. Customers can explore delivery coverage, create parcel bookings, review estimated prices, and access payment and parcel-management pages. The app also includes role-based dashboard flows for riders and administrators, including rider approval and parcel assignment.

> **Project scope:** The code in this repository is the frontend. It is built with React and Vite and calls a separate REST API expected at `http://localhost:3000`. Although the original project also used a Node.js server, the server source is not included here.

## Features

- **Courier service landing page** with service information, workflow, testimonials, FAQs, and merchant promotion.
- **Coverage lookup and map** using district data, searchable districts, and Leaflet markers for service locations.
- **Parcel booking** with sender and receiver details, region/service-center selection, document or non-document parcel types, and an estimated price calculation in Bangladeshi taka (৳).
- **Authentication** using Firebase Authentication, with login and registration pages.
- **Customer dashboard** routes for parcel lists, payments, and payment history.
- **Rider workflows** for applying to become a rider and viewing assigned parcels.
- **Admin dashboard** for rider management and parcel assignment. Assignment options are filtered by the parcel receiver's region.
- **Protected and role-aware routes** for signed-in users, riders, and administrators.
- **Stripe payment UI** using Stripe Elements.

## Tech stack

- React 19 and JavaScript (ES modules)
- Vite 6
- React Router 7
- Firebase Authentication
- TanStack Query and Axios for client-side data access
- Tailwind CSS 4 and DaisyUI
- Stripe React SDK
- React Leaflet / Leaflet for maps
- React Hook Form, SweetAlert2, and React Toastify for forms and feedback

## Project structure

```text
src/
  Authentication/          Firebase configuration
  Components/              Shared navigation, loader, role guard, and rider modals
  Contexts & Providers/    Authentication context and provider
  Firebase/                Firebase app/auth initialization
  Hooks/                   API client and data-fetching hooks
  Layouts/                  Main, authentication, and dashboard layouts
  Routes/                   Route definitions and signed-in route guard
  assets/                   Images and icons used by the UI
  pages/
    Authentication/        Login and registration
    Be a Rider Form/        Rider application form
    Booking Parcel/         Parcel booking form and price calculation
    Covarage/               Coverage map and district data
    Dashboard/              Customer, rider, and admin dashboard pages
    Home/                   Landing page sections
    UnAuthorized/           Access-denied page
```

`src/main.jsx` mounts the app with the authentication provider, React Query client, router, and toast notifications. `src/Routes/Routes.jsx` composes the public, authentication, and dashboard routes. Protected screens use the authentication context and role checks; page hooks use Axios to communicate with the API.

## Requirements

- Node.js and npm
- A Firebase project configured for web authentication
- The companion Node.js REST API running at `http://localhost:3000` (or update the API base URL in `src/Hooks/UseAxiosSecure.jsx` and the direct request in `src/pages/Booking Parcel/BookingParcel.jsx`)
- Stripe publishable key for payment UI

## Setup

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/Samir-Sadaf25/Duronto-Courier.git
   cd Duronto-Courier
   npm install
   ```

2. Create a `.env` file in the project root and provide the Vite environment variables used by the frontend:

   ```dotenv
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_firebase_auth_domain
   VITE_projectId=your_firebase_project_id
   VITE_storageBucket=your_firebase_storage_bucket
   VITE_messagingSenderId=your_firebase_messaging_sender_id
   VITE_appId=your_firebase_app_id
   VITE_publishableKey=your_stripe_publishable_key
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

Vite prints the local URL when the development server is ready. Start the backend separately so booking, dashboard data, and payment-related API requests can reach it.

## Available scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Backend integration

The frontend expects the separate API to provide the endpoints and data used by the screens and hooks. Requests include user and parcel operations, rider lists and status changes, parcel assignment, and payment setup. Authenticated requests made through `useAxiosSecure` include a Firebase ID token in the `Authorization` header. The API implementation and its setup instructions are not present in this repository, so consult the companion server project for its routes, database configuration, and payment secrets.

## Commit history notes

Recent commits show development of the operational dashboard beyond the initial Vite/React scaffold. They include assigning unassigned parcels to active riders in the receiver's region and consolidating pending/active rider details into a reusable modal with an approval action.
