# API-Pulse Frontend

API-Pulse is a web dashboard for managing API services and API keys through an API gateway. It provides service and key analytics, recent request logs, and an interactive sandbox for sending test requests.

This repository contains the frontend. It expects the API-Pulse backend to provide the authentication, service-management, API-key, metrics, logs, and sandbox endpoints used by the application.

## Features

- Sign in and register an account, with protected dashboard routes.
- View an overview of API traffic and request metrics.
- Register, edit, delete, and inspect registered services.
- Create and revoke API keys, and inspect key-specific analytics.
- Review service and key request logs, traffic trends, latency, and status-code breakdowns.
- Send requests from the API sandbox with a method, URL, query parameters, headers, and JSON body; inspect responses and recent sandbox requests.
- Use the gateway URL shown after key creation to send requests to a registered service.

## Tech stack

- React 19 and React Router
- Vite 8
- Tailwind CSS 4
- Axios for API requests
- Recharts for analytics charts

## Requirements

- Node.js 20 or later and npm
- A running API-Pulse backend. The backend must allow requests from the frontend origin and support credentialed requests, including the required CORS and cookie settings.

## Configuration

Create a `.env` file in the project root and set the backend base URL:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Replace the example URL with the address of your backend. Vite exposes `VITE_` variables to browser code, so do not put passwords, private keys, or other secrets in this file. Restart the development server after changing environment variables.

The frontend sends Axios requests with credentials enabled for login sessions and other authenticated API calls. Configure the backend's CORS policy to allow the frontend origin and credentialed requests.

## Run locally

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`). Sign in or register to access protected pages.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local Vite development server. |
| `npm run build` | Build the production frontend into `dist/`. |
| `npm run preview` | Serve the production build locally for preview. |
| `npm run lint` | Run ESLint over the project. |

## Routes

| Path | Page | Access |
| --- | --- | --- |
| `/landing` | Product landing page | Public |
| `/login` | Sign in and registration | Public |
| `/` | Dashboard overview | Protected |
| `/services` | Service management | Protected |
| `/services/:serviceId/analytics` | Service analytics and logs; the route value is the service name | Protected |
| `/api-keys` | API-key management and recent logs | Protected |
| `/api-keys/:keyId/analytics` | API-key analytics and logs | Protected |
| `/api-sandbox` | Request sandbox and history | Protected |

Unmatched paths display a not-found page. Protected routes check the login status and attempt a token refresh through the backend.

## Docker

The included Dockerfile builds the frontend and serves the static output with Nginx on port 80. Build and run it from the repository root:

```bash
docker build -t api-pulse-frontend .
docker run --rm -p 5173:80 api-pulse-frontend
```

Open `http://localhost:5173`. Vite embeds `VITE_API_BASE_URL` into the static files during `npm run build`. Set it in a root `.env` file included in the Docker build context, or in the build environment used by your deployment platform. Changing a container runtime environment variable alone will not change the already-built frontend. The configured backend URL must be reachable from the user's browser.

## Backend integration

The UI calls the backend base URL configured by `VITE_API_BASE_URL`. It uses routes for authentication (`/register`, `/login`, `/loginstatus`, `/refreshTokens`, `/logout`, `/userdata`), service management (`/services`, `/register-service`, `/edit-service`, `/delete-service`), API keys (`/api-keys`, `/create-api-key`, `/revoke-api-key`), analytics (`/metrics/user`, `/metrics/userhourlyrequests`, service and key metric routes), request logs (`/userLogs`, `/serviceLogs/:serviceName`, `/apikeyLogs/:keyId`), and sandbox requests (`/sandbox`, `/sandbox/recent-requests`). The backend is not included in this repository.
