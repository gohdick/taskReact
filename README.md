# Task Manager (React + TypeScript + Zustand)

Fullstack Developer Test :
Task Management UI with CRUD, validation, filter Status

## Features

- **Task CRUD**
  - Create task
  - Update task status
  - Delete task
- **Filtering**
  - Filter by status: `All`, `To Do`, `In Progress`, `Done`
- **Validation (Zod)**
  - `Title` required
  - `Description` required
  - If you click `Add task` with missing fields, an error message shows in red under the input
- **State Management (Zustand)**
  - Central store: `src/store/taskStore.ts`
- **API layer (mock/real switch)**
  - Mock API: `src/api/mockTaskApi.ts`
  - Real API adapter: `src/api/httpTaskApi.ts`
  - Switch entry: `src/api/index.ts`

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- Zustand
- Zod
- lucide-react

## Project Structure (important files)

- `src/types/task.ts` Task types
- `src/store/taskStore.ts` Zustand store
- `src/api/*` API adapters (mock + http)
- `src/components/*` UI components
- `docker-compose.yml` Docker dev hot reload
- `Dockerfile` Docker dev image for Vite

## Run Locally (no Docker)

### Install

```bash
npm ci
```

### Start Dev Server

```bash
npm run dev
```

Open:

- http://localhost:5173

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Run with Docker (Dev + Hot Reload)

### Prerequisites

- Docker Desktop is installed and running

### Start

```bash
docker compose up --build
```

Open:

- http://localhost:5173

After the first build, you can run:

```bash
docker compose up
```

### Stop / Start

- Stop (keep containers):

```bash
docker compose stop
docker compose start
```

- Down (stop and remove containers/network; images are kept):

```bash
docker compose down
```

### Install npm packages using Docker

Recommended when you are running the project in Docker:

```bash
docker compose run --rm web npm install <package-name>
```

## Environment Variables

This project can use mock API by default. To connect to a real backend later, create a `.env` file:

```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:3000
```

Notes:
- When `VITE_USE_MOCK_API=true` (or not set), the app uses the mock adapter
- When `VITE_USE_MOCK_API=false`, the app calls REST API endpoints like `GET /tasks`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`
