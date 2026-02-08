# Task Manager (React + TypeScript + Zustand)

Fullstack Developer Test :
Task Management UI with CRUD, validation, filter Status

## HOW TO RUN

1) Create file `.env`

```env
VITE_API_BASE_URL=http://localhost:3000
```

2) Run Local

```bash
npm ci
npm run dev
```

or run with Docker

```bash
docker compose up --build
```

3) Open http://localhost:5173

- **add task** Fill in information Title/Description then click `Add task`
- **change status** Select status from dropdown on the card
- **filter task** Click status button
- **delete task** Click trash button

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

## Run with Docker (Dev + Hot Reload)

### Prerequisites

- Docker Desktop is installed and running

### Start

```bash
docker compose up --build
```

Open:

- http://localhost:5173

### Stop

```bash
docker compose down
```
