# LinkedIn-style React authentication app

Frontend: F:\linkedin-auth
Separate Node.js / Express / MongoDB backend: F:\linkedin-auth-backend

Start both projects in separate terminals:

```powershell
cd F:\linkedin-auth-backend
npm run dev
```

```powershell
cd F:\linkedin-auth
npm run dev
```

Open http://127.0.0.1:5173. The default route is /login; registration is /join. Successful email/password registration or login opens /account, which has a Sign out button.

MongoDB must be running. Configure the backend connection in its .env file. The frontend vite.config.js proxies /api to http://127.0.0.1:4000 for both development and preview. Use the same browser hostname throughout a session.

Features: responsive screenshot-inspired styling, show/hide passwords, remember-me cookies, required fields, email validation, 8–128 character registration passwords, and error feedback from the API. Passwords and session tokens are not stored in localStorage.

Social sign-in and password-reset email delivery are not configured. These controls explain the limitation.

Build: npm run build. Preview: npm run preview. For production configure your server for SPA route fallback and a same-origin /api reverse proxy; the Vite proxy does not ship in the static build.

Components/routes: src/main.jsx. API client: src/api.js. Styling: src/styles.css. Full backend setup, endpoint descriptions, and tests are documented in F:\linkedin-auth-backend\README.md.

## Vercel

Production site: https://linkedin-auth-five.vercel.app
The vercel.json file forwards /api to https://linkedin-auth-backend.vercel.app and serves index.html for client routes.

Redeploy from this directory with `npx vercel deploy --prod`. The hosted backend needs its own Production MONGODB_URI secret before registration and login can work. Local development continues using the Vite localhost proxy.
