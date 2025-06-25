# Hackton Project

This project contains a Node.js/React application and Python module for managing reservations.

## Environment Variables

Create a `.env` file in the project root with your database configuration. An example
file is provided as `.env.example`.

Supabase credentials are stored in `server/config.js` for the API server and in
`src/supabaseClient.tsx` for the React application. Edit either file to update
`SUPABASE_URL` and `SUPABASE_ANON_KEY`. The API base URL used by the React app
is also defined in `src/supabaseClient.tsx` as `API_URL`.

If you want to start from the template, run:

```bash
cp .env.example .env
```

Edit `.env` and set the following variable:

- `DATABASE_URL` – PostgreSQL connection string (e.g., your Supabase database URL)
- `PORT` – (optional) server port, defaults to `3000`

These credentials allow the server and scripts to access the `logger`,
`products` and `reservations` tables hosted on Supabase. They are also used in
`src/supabaseClient.tsx` so the React app can query the same database directly.

## Running

Install dependencies and start the server:

```
npm install
npm run start
```

This starts the Express server defined in `server/`.
