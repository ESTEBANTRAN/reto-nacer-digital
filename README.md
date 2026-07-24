# Reto Nacer Digital — Full-Stack Monorepo

**Autor:** Esteban Aulestia  
**Stack:** NestJS (Backend) · NextJS (Frontend) · TypeScript  
**Despliegue:** Render (Backend) · Vercel (Frontend)

---

## 📁 Estructura del Proyecto

```
reto-nacer-digital/
├── backend/          # API NestJS — Proxy a GitHub API
│   └── src/
│       ├── github/   # Módulo GitHub (Controller, Service, DTOs)
│       └── common/   # Filtros de excepción, pipes globales
├── frontend/         # App NextJS — UI de perfil de GitHub
│   └── src/
│       ├── components/
│       ├── lib/
│       └── types/
└── README.md
```

## 🚀 Quick Start

### Prerrequisitos
- Node.js 18+
- npm 9+

### Backend

```bash
cd backend
cp .env.example .env    # Configurar variables de entorno
npm install
npm run start:dev       # http://localhost:3001
```

### Frontend

```bash
cd frontend
cp .env.example .env.local   # Configurar variables de entorno
npm install
npm run dev                  # http://localhost:3000
```

## 🔧 Variables de Entorno

### Backend (`backend/.env`)

| Variable | Descripción | Requerida |
|---|---|---|
| `PORT` | Puerto del servidor | No (default: `3001`) |
| `GITHUB_TOKEN` | Personal Access Token de GitHub | No (aumenta rate limit) |
| `ALLOWED_ORIGINS` | Orígenes permitidos para CORS | No (default: `http://localhost:3000`) |

### Frontend (`frontend/.env.local`)

| Variable | Descripción | Requerida |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL del backend | Sí |

## 🔒 Seguridad

- Variables de entorno para toda configuración sensible
- CORS restringido a orígenes específicos
- GitHub Token opcional, nunca expuesto al cliente
- `.gitignore` configurado para prevenir fugas de credenciales
- Manejo de errores global sin exposición de stack traces

## 🌐 Despliegue

### Backend → Render
1. Crear **Web Service** en [render.com](https://render.com)
2. Root Directory: `backend`
3. Build Command: `npm install && npm run build`
4. Start Command: `npm run start:prod`
5. Configurar variables de entorno en el dashboard

### Frontend → Vercel
1. Importar repositorio en [vercel.com](https://vercel.com)
2. Root Directory: `frontend`
3. Framework Preset: Next.js
4. Configurar `NEXT_PUBLIC_API_URL` con la URL de Render

## 📡 API Endpoints

### `GET /user/:username`

Retorna información del perfil de GitHub del usuario especificado.

**Response (200):**
```json
{
  "login": "esteban-aulestia",
  "name": "Esteban Aulestia",
  "bio": "...",
  "avatar_url": "https://...",
  "html_url": "https://github.com/esteban-aulestia",
  "public_repos": 10,
  "followers": 5,
  "following": 3,
  "location": "...",
  "company": "...",
  "blog": "...",
  "created_at": "2020-01-01T00:00:00Z"
}
```

**Error (404):**
```json
{
  "statusCode": 404,
  "message": "GitHub user 'username' not found",
  "error": "Not Found"
}
```
