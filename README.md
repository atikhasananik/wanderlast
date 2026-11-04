# Wanderlast

Wanderlast is a travel-agency website built with Next.js App Router, React, and Tailwind CSS. Its UI manages travel destinations and bookings through an external API; the API/backend is not part of this repository.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file from the template:

   ```bash
   cp .env.example .env
   ```

   Set the values for your setup. The defaults in the example use local development URLs. Keep secrets such as `BETTER_AUTH_SECRET` and `MONGODB_URI` private; do not commit `.env`.

   | Variable | Purpose |
   | --- | --- |
   | `NEXT_PUBLIC_API_URL` | Base URL for the external destinations and bookings API |
   | `NEXT_PUBLIC_SITE_URL` | Public origin of the Next.js site; also used by the auth client and metadata |
   | `BETTER_AUTH_URL` | Better Auth server URL |
   | `BETTER_AUTH_SECRET` | Better Auth signing secret |
   | `MONGODB_URI` | MongoDB connection string used by Better Auth |

   `NEXT_PUBLIC_*` values are exposed to browser code and are embedded during the Next.js build. Set them to the correct deployment URLs before building.

3. Start the development server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000). The external API must also be running at the configured `NEXT_PUBLIC_API_URL` for destination and booking data to load or mutate.

Useful commands:

```bash
npm run lint
npm run build
npm start
```

The production build may request destination data while prerendering, so the external API needs to be reachable during `npm run build`.

## How CRUD works in this project

CRUD means **Create, Read, Update, and Delete**. The frontend collects data and sends HTTP requests to the external API. The API performs the actual persistence; there is no destination or booking database implementation in this repository.

API URLs are built by [`src/lib/api.js`](./src/lib/api.js) using `NEXT_PUBLIC_API_URL`. Components should use `apiUrl("path")` rather than hardcoding a host. Dynamic IDs and email values are URL-encoded before being added to a path.

| Action | User flow | Request |
| --- | --- | --- |
| Create destination | Add Travel Package form | `POST /add-destination` |
| Read destinations | Destination listing and featured carousel | `GET /` |
| Read one destination | Destination details page | `GET /add-destination/:id` |
| Update destination | Edit dialog on a destination page | `PATCH /update-destination/:id` |
| Delete destination | Delete confirmation on a destination page | `DELETE /delete-destination/:id` |
| Create booking | Book Now control on a destination | `POST /add-booking` |
| Read bookings | My Bookings page | `GET /my-bookings/:email` |
| Delete booking | Cancel button on a booking | `DELETE /my-booking-delete/:id` |

### Request and response flow

1. **Collect and validate input.** Forms hold their values in React state. The destination create and edit forms check that name, country, and price are filled in before sending a request.
2. **Send the right HTTP method.** Create uses `POST`, reads use `GET`, edits use `PATCH`, and removals use `DELETE`. JSON request bodies are sent with `Content-Type: application/json`.
3. **Check the response.** Mutation handlers check `response.ok`; a non-success HTTP status is treated as an operation failure instead of showing a success message.
4. **Give the user feedback.** Mutations show success or error toasts through the shared toaster in the root layout. Successful edits refresh the destination view, and successful removals navigate away or refresh the bookings list.
5. **Keep data server-owned.** The UI should not claim a change succeeded until the API responds successfully. If the external API is down or returns an error, the user sees an error toast (or a page-level read error).

### Where to explore the code

- [`src/components/addDestinatonPage/AddDestinationPage.jsx`](./src/components/addDestinatonPage/AddDestinationPage.jsx) — create destination form
- [`src/components/destinations/AllDestination.jsx`](./src/components/destinations/AllDestination.jsx) — read destination collection
- [`src/app/destinations/[id]/page.jsx`](./src/app/destinations/%5Bid%5D/page.jsx) — read one destination
- [`src/components/destinations/Dialog.jsx`](./src/components/destinations/Dialog.jsx) — update destination
- [`src/components/destinations/DeleteBtn.jsx`](./src/components/destinations/DeleteBtn.jsx) — delete destination
- [`src/components/destinations/Input.jsx`](./src/components/destinations/Input.jsx) — create booking
- [`src/app/my-bookings/page.jsx`](./src/app/my-bookings/page.jsx) — read bookings
- [`src/components/my-bookings/cancel-booking-button.jsx`](./src/components/my-bookings/cancel-booking-button.jsx) — delete/cancel booking
- [`src/components/ui/toast.jsx`](./src/components/ui/toast.jsx) and [`src/app/layout.js`](./src/app/layout.js) — shared toast UI and provider

## CRUD practices to follow

- Keep the API base URL in environment configuration; never duplicate a machine-specific URL throughout components.
- Validate user input before sending it, and still validate it again on the backend. Frontend validation improves usability but is not a security boundary.
- Use the HTTP method that matches the operation and check status codes before updating the UI.
- Encode values placed in URL path segments, especially IDs and email addresses.
- Show clear success and failure feedback; do not log form data, credentials, or API responses as a substitute for user feedback.
- Keep secrets on the server. Values prefixed with `NEXT_PUBLIC_` are not secret and can be read by site visitors.
- Handle loading, empty, and error states for reads; prevent accidental repeated submissions for destructive or pending operations.

## Notes

- Authentication is implemented with Better Auth. This repository's external travel API is a separate service.
- Some navigation links may point to routes that are not implemented yet.
- The project uses JavaScript/JSX; there is no test or type-check script configured.
