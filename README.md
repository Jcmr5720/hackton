# Hackton Project

This project contains a Node.js/React application and Python module for managing reservations.

## Environment Variables

Create a `.env` file in the project root with your configuration. An example file
is provided as `.env.example` and a preconfigured `.env` is checked in with
default Supabase credentials.

If you want to start from the template, run:

```bash
cp .env.example .env
```

Edit `.env` and set the following variables (or use the provided defaults):

- `DATABASE_URL` – PostgreSQL connection string (e.g., your Supabase database URL)
- `SUPABASE_URL` – URL of your Supabase project
- `SUPABASE_ANON_KEY` – Supabase anonymous API key
- `PORT` – (optional) server port, defaults to `3000`

The `server/supabaseClient.js` module uses these variables to initialize a Supabase client.

These variables allow the server and scripts to access the `logger` and `reservations` tables hosted on Supabase.

## Running

Install dependencies and start the server:

```
npm install
npm run start
```

This starts the Express server defined in `server/`.
