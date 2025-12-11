# Genor Backend

A clean architecture backend API built with TypeScript, Node.js, and Express.

## Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── domain/           # Enterprise Business Rules
│   ├── entities/     # Core business entities (User)
│   └── repositories/ # Repository interfaces (ports)
│
├── application/      # Application Business Rules
│   └── use-cases/    # Use case implementations
│
├── infrastructure/   # Frameworks & Drivers
│   ├── http/         # HTTP client implementation
│   └── repositories/ # Repository implementations (adapters)
│
├── presentation/     # Interface Adapters
│   ├── controllers/  # HTTP request handlers
│   ├── middleware/   # Express middleware
│   └── routes/       # Route definitions
│
├── shared/           # Shared utilities
│   ├── config/       # Environment configuration
│   └── errors/       # Custom error classes
│
├── app/              # Application setup
│   └── app.ts        # Express app factory
│
└── index.ts          # Entry point
```

## Dependency Flow

```
Presentation → Application → Domain ← Infrastructure
     │              │           ↑           │
     │              │           │           │
     └──────────────┴───────────┴───────────┘
                    Depends on Domain
```

- **Domain Layer**: Contains entities and repository interfaces (no dependencies)
- **Application Layer**: Contains use cases, depends only on Domain
- **Infrastructure Layer**: Implements repository interfaces, depends on Domain
- **Presentation Layer**: HTTP controllers and routes, depends on Application

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd backend
npm install
```

### Configuration

Create a `.env` file (or use defaults):

```env
PORT=3001
NODE_ENV=development
JSON_PLACEHOLDER_BASE_URL=https://jsonplaceholder.typicode.com
CORS_ORIGIN=http://localhost:5173
```

### Running

```bash
# Development (with hot reload)
npm run dev

# Production
npm run build
npm start
```

### Testing

```bash
# Run tests
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## API Endpoints

| Method | Endpoint        | Description       |
| ------ | --------------- | ----------------- |
| GET    | `/`             | API info          |
| GET    | `/api/health`   | Health check      |
| GET    | `/api/users`    | Get all users     |
| GET    | `/api/users/:id`| Get user by ID    |

## Response Format

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "total": 10
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "User with id 999 not found"
  }
}
```

## Design Principles

- **SOLID Principles**: Single responsibility, Open/closed, Liskov substitution, Interface segregation, Dependency inversion
- **Clean Architecture**: Separation of concerns with clear dependency rules
- **Dependency Injection**: All dependencies are injected, enabling easy testing
- **Immutability**: Domain entities are immutable (frozen objects)
- **Type Safety**: Full TypeScript with strict mode enabled

## Scripts

| Script          | Description                    |
| --------------- | ------------------------------ |
| `npm run dev`   | Start development server       |
| `npm run build` | Build for production           |
| `npm start`     | Start production server        |
| `npm test`      | Run tests in watch mode        |
| `npm run test:run` | Run tests once              |
| `npm run lint`  | Run ESLint                     |
