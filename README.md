# LinkedIn-inspired Authentication UI

React login and registration interface connected to a separate Express authentication API.

[Live deployment](https://linkedin-auth-five.vercel.app)

## Overview

- Login and registration screens
- Cookie-aware API client
- Vite proxy for local backend integration

## Stack

React, Vite.

## Run locally

```bash
git clone https://github.com/AbdulSamadAhsan/linkedin-auth.git
cd linkedin-auth
npm install
```

Start the [authentication backend](https://github.com/AbdulSamadAhsan/linkedin-auth-backend) on `http://127.0.0.1:4000`. Vite proxies `/api` requests to that server. This is an independent interface exercise, not an official LinkedIn application.

```bash
npm run dev
```

Use the local URL printed by the development server.

## Available checks

| Command | Script |
| --- | --- |
| `npm run build` | `vite build` |
| `npm run preview` | `vite preview --host 127.0.0.1` |

These commands are defined by the project; documentation updates do not imply they have been run.

## Author

[Syed Abdul Samad Ahsan](https://github.com/AbdulSamadAhsan)
