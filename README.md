# AURA: Find Your Extraordinary

AURA is a responsive travel discovery and booking frontend for exploring considered destinations and distinctive stays. It is built with React and Vite, with client-side routing, animated page transitions, and browser-local demo data.

The experience includes destination discovery, property details, favorites, a guided reservation flow, and a personal trips view. It is a frontend demonstration rather than a live travel service: listings and reservations are sample data, and there is no booking, payment, or account backend.

## Features

- Search destinations with suggestions, arrival and departure dates, and guest counts.
- Browse and filter stays by destination, text, accommodation type, maximum price, and minimum rating; sort the results.
- View destination and property details, including image galleries and keyboard-operable photo viewing.
- Save destinations and stays to favorites.
- Walk through a four-step reservation demonstration: trip details, guest information, review, and confirmation.
- Review upcoming, past, and cancelled reservations, and cancel a demonstration reservation.
- Try the sign-in and registration screens and newsletter form; these validate locally but do not submit to a service.
- Use the responsive layouts with reduced-motion preferences respected.

## Tech Stack

- React 19 and JavaScript (ES modules)
- Vite 8 for local development and production builds
- React Router for client-side navigation
- Motion for transitions and interface animation
- Lucide React for icons
- Plain CSS

## Requirements

- Node.js 20.19+ or 22.12+
- npm (a `package-lock.json` is included)

No environment variables or external service credentials are required to run the demo.

## Getting Started

From this directory, install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

Vite prints the local URL in the terminal, usually `http://localhost:5173`. Use `Ctrl+C` to stop the server.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server with hot reload. |
| `npm run build` | Create an optimized production build in `dist/`. |
| `npm run preview` | Serve the production build locally for review. Run `npm run build` first. |
| `npm run lint` | Run Oxlint on the project. |

## Routes

| Path | Page |
| --- | --- |
| `/` | Home and destination search |
| `/discover` | Stay listings, filters, and sorting |
| `/destinations/:destinationId` | Destination details and related stays |
| `/stays/:propertyId` | Property details |
| `/book/:propertyId` | Guided reservation demonstration |
| `/my-trips` | Saved places and reservations |
| `/sign-in` | Sign-in demonstration form |
| `/register` | Registration demonstration form |

Unknown paths show an in-app not-found page. The discovery search uses URL query parameters so a search can be shared or refreshed; booking links carry selected trip dates forward where provided.

## Project Structure

```text
src/
	assets/       Local images and bundled assets
	components/   Shared search, cards, navigation, and footer
	hooks/        Browser-local favorites and reservation state
	pages/        Home, discovery, details, booking, trips, and account pages
	utils/        Formatting helpers, including Nigerian naira prices
	App.jsx       Route definitions and shared page shell
	App.css       Application and page styling
	data.js       Example destinations, properties, and image helpers
	index.css     Global styles
	main.jsx      React application entry point
public/         Static public assets
index.html      Vite HTML entry point
vite.config.js  Vite configuration
```

## Local Data and Demo Limitations

- Destinations, properties, ratings, and availability are static fictional examples in `src/data.js`.
- Prices are displayed in Nigerian naira. Sample amounts were scaled from earlier demo prices at an illustrative rate of ₦1,500 per US dollar; this is not a live exchange rate.
- The booking flow calculates an illustrative 12% fee. It does not check availability, contact a property, charge a payment method, or create a real reservation.
- Favorites and demonstration reservations are saved in this browser's `localStorage` under `aura-favorites` and `aura-bookings`. They are not synchronized between devices or users. Clearing browser storage removes them.
- Sign-in and registration do not authenticate users or store credentials. Newsletter submission is not connected to a mailing service.
- Property photography is requested from Unsplash, and typography is loaded from Google Fonts. Those remote assets require network access.

Do not use the demo forms to collect real personal information. Before turning this into a production booking service, connect a secure backend for identity, inventory, reservation persistence, email, and payment processing; also replace sample content and review the licensing and availability of remote assets.

## Production Build and Deployment

Build and inspect the static output locally:

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to a static host. Since the app uses client-side routes, configure the host to serve `index.html` as the fallback for application paths such as `/discover` and `/stays/...`. Without that fallback, direct visits or refreshes on nested routes may return a host-level 404.
