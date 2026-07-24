# Reto Nacer Digital — Full-Stack Monorepo

**Autor:** Esteban Aulestia  
**Stack:** NestJS (Backend) · NextJS (Frontend) · TypeScript  
**Despliegues en Vivo:**
- **Frontend (Vercel):** [https://reto-nacer-digital.vercel.app](https://reto-nacer-digital.vercel.app)
- **Backend (Render):** [https://reto-nacer-digital.onrender.com](https://reto-nacer-digital.onrender.com)

---

## 📁 Estructura del Monorepo

```
reto-nacer-digital/
├── backend/                  # API NestJS — Proxy seguro a la API de GitHub
│   ├── src/
│   │   ├── github/           # Módulo GitHub (Controller, Service, DTOs)
│   │   │   ├── dto/          # GithubUserDto (Typing estricto de respuesta)
│   │   │   ├── github.controller.ts
│   │   │   ├── github.module.ts
│   │   │   └── github.service.ts
│   │   ├── common/           # Filtros y Pipes globales
│   │   │   ├── filters/      # HttpExceptionFilter (Manejo global de errores sin leaks)
│   │   │   └── pipes/        # ParseUsernamePipe (Sanitización y regex de usernames)
│   │   ├── app.controller.ts # Health Check endpoint (GET /)
│   │   ├── app.module.ts     # ConfigModule + ThrottlerModule (Rate Limiting)
│   │   └── main.ts           # Bootstrap: Helmet headers + CORS dinámico + puerto Render
│   ├── .env.example          # Template seguro de variables de entorno
│   └── package.json
│
├── frontend/                 # App NextJS (App Router) — UI del Perfil
│   ├── src/
│   │   ├── app/              # App Router (layout.tsx, page.tsx, globals.css)
│   │   ├── components/       # ProfileCard, StatCard, Skeleton, ErrorMessage
│   │   ├── lib/              # api.ts (Cliente HTTP tipado)
│   │   └── types/            # github.ts (Interfaces compartidas)
│   ├── next.config.ts        # Restricción de dominios de imágenes (avatars.githubusercontent.com)
│   ├── .env.example          # Template de NEXT_PUBLIC_API_URL
│   └── package.json
│
├── vercel.txt                # Guía de configuración para Vercel
├── render.txt                # Guía de configuración para Render
├── .gitignore                # Gitignore global para monorepo
└── README.md                 # Documentación técnica
```

---

## 🔒 Estándares de Seguridad y Clean Architecture

Este proyecto fue diseñado cumpliendo con estándares de ciberseguridad y Clean Code de nivel Senior:

1. **Cero Exposición de Secretos:**
   - Ninguna API Key o Token está expuesta en el código ni en el historial de Git.
   - El `GITHUB_TOKEN` es opcional, se ejecuta únicamente del lado del servidor (NestJS) y se inyecta por variables de entorno en Render.

2. **Cabeceras de Seguridad HTTP (Helmet):**
   - Integración de `helmet` para forzar HSTS, prevenir Clickjacking (`X-Frame-Options`), bloquear MIME sniffing (`X-Content-Type-Options: nosniff`) y mitigar XSS.

3. **Protección contra Abuso y DDoS (Rate Limiting):**
   - Implementación de `@nestjs/throttler` configurado a **60 peticiones por minuto por IP** para prevenir fuerza bruta o agotamiento de la cuota de la API de GitHub.

4. **Sanitización y Validación de Entrada (`ParseUsernamePipe`):**
   - Regex estricto `/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/` que rechaza peticiones maliciosas (ej. Path Traversal `../../admin`, script injection) retornando `400 Bad Request` antes de invocar la API externa.

5. **CORS Dinámico y Restringido:**
   - Validación de orígenes permitidos mediante la variable `ALLOWED_ORIGINS` y subdominios autorizados de Vercel (`*.vercel.app`).

6. **Manejo Global de Excepciones sin Fuga de Información:**
   - `HttpExceptionFilter` intercepta cualquier fallo y oculta stack traces o detalles internos de infraestructura en ambiente de producción.

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
- Node.js 18+
- npm 9+

### 1. Backend (NestJS)

```bash
cd backend
cp .env.example .env        # En Windows: copy .env.example .env
npm install
npm run start:dev
```
Servidor ejecutándose en: `http://localhost:3001`

### 2. Frontend (NextJS)

```bash
cd frontend
cp .env.example .env.local  # En Windows: copy .env.example .env.local
npm install
npm run dev
```
Aplicación web ejecutándose en: `http://localhost:3000`

---

## 🔧 Variables de Entorno

### Backend (`backend/.env`)

| Variable | Descripción | Requerida | Ejemplo |
|---|---|---|---|
| `PORT` | Puerto del servidor (Render lo asigna dinámicamente) | No | `3001` |
| `GITHUB_TOKEN` | Personal Access Token de GitHub (aumenta límite a 5000 req/hr) | No | `ghp_xxxxxxxxxxxx` |
| `ALLOWED_ORIGINS` | Dominio(s) autorizados para CORS (separados por coma) | No | `https://reto-nacer-digital.vercel.app` |

### Frontend (`frontend/.env.local`)

| Variable | Descripción | Requerida | Ejemplo |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL pública del Backend NestJS | Sí | `https://reto-nacer-digital.onrender.com` |

---

## 📡 API Endpoints

### `GET /`
Health check del servicio backend.

**Response (200 OK):**
```json
{
  "status": "ok",
  "timestamp": "2026-07-24T18:40:00.000Z"
}
```

---

### `GET /user/:username`
Obtiene y retorna el perfil público de GitHub del usuario especificado.

**Response (200 OK):**
```json
{
  "login": "ESTEBANTRAN",
  "name": "xxestebantranxx",
  "bio": null,
  "avatar_url": "https://avatars.githubusercontent.com/u/139495960?v=4",
  "html_url": "https://github.com/ESTEBANTRAN",
  "public_repos": 15,
  "followers": 1,
  "following": 1,
  "location": null,
  "company": null,
  "blog": null,
  "twitter_username": null,
  "created_at": "2023-07-16T18:00:00Z"
}
```

**Error (400 Bad Request - Username no válido):**
```json
{
  "statusCode": 400,
  "message": "Invalid GitHub username format: '../../admin'. Usernames can only contain alphanumeric characters and hyphens.",
  "timestamp": "2026-07-24T18:40:00.000Z",
  "path": "/user/../../admin"
}
```

**Error (404 Not Found - Usuario no existe):**
```json
{
  "statusCode": 404,
  "message": "GitHub user 'usuario-inexistente-123' not found",
  "timestamp": "2026-07-24T18:40:00.000Z",
  "path": "/user/usuario-inexistente-123"
}
```

---

## 🌐 Despliegue en Producción

- **Backend:** Desplegado en **Render** como Web Service (Node.js).
- **Frontend:** Desplegado en **Vercel** como proyecto Next.js.
- **Monorepo:** Configurado definiendo el `Root Directory` en cada plataforma (`backend` en Render, `frontend` en Vercel).
