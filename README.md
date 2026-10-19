# AURA — Find Your Extraordinary

A responsive luxury travel discovery and booking frontend built with React, Vite, JavaScript, React Router, Motion, Lucide React, and regular CSS.

## Run locally

```sh
npm install
npm run dev
```

Production checks:

```sh
npm run build
npm run lint
```

## Included flows

- Destination search with suggestions, date validation, guest counts, shareable query parameters, and combined accommodation filters.
- Editorial destination pages and property details with a keyboard-operable photo viewer.
- Favorites and demonstration reservations stored in this browser's LocalStorage.
- A four-step booking review with illustrative taxes and totals, plus upcoming/past trip tabs and cancellation.
- Responsive sign-in and registration demo screens, newsletter validation, and reduced-motion support.

## Demo boundaries

Listings, prices, and ratings are fictional examples. Prices display in Nigerian naira; sample rates were scaled from the earlier demo amounts at an illustrative ₦1,500 per US dollar, not a live exchange rate. Availability is not live; reservations do not charge a payment method. Account forms do not authenticate or store credentials. Newsletter signup validates in the browser but is not connected to a mailing service. LocalStorage is local to this browser and is not secure multi-user storage.

Destination photography is loaded from Unsplash image URLs, and typography is loaded from Google Fonts; both require network access. Replace these remote assets with locally licensed images and self-hosted fonts before deployment if required.
