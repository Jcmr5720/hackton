# Hackton Project

This project contains a Node.js/React application and Python module for managing reservations.

## Environment Variables

Create a `.env` file in the project root with your database configuration. An example
file is provided as `.env.example`.

Supabase credentials are stored in `server/config.js`. Edit that file to update
`SUPABASE_URL` and `SUPABASE_ANON_KEY`.

If you want to start from the template, run:

```bash
cp .env.example .env
```

Edit `.env` and set the following variable:

- `DATABASE_URL` – PostgreSQL connection string (e.g., your Supabase database URL)
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

The frontend styles and scripts (Bootstrap, Bootstrap Icons, Animate.css and
Hover.css) are loaded from CDN links declared in `index.html`, so these packages
do not need to be installed locally when running the client.
