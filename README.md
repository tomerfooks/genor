# Users Dashboard

A modern, enterprise-grade React application for managing and exploring users. Built with TypeScript, Tailwind CSS, and best practices.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)

## ✨ Features

- **📊 User Management** - Fetch and display users from JSONPlaceholder API
- **🔍 Search** - Real-time search across name, email, company, and city
- **📋 Sorting** - Sort by name, email, company, or city (ascending/descending)
- **🎨 Multiple Views** - Toggle between grid and table layouts
- **🌓 Dark/Light Mode** - System-aware theme with manual toggle
- **⚡ Loading States** - Beautiful skeleton loading animations
- **❌ Error Handling** - Graceful error display with retry functionality
- **📱 Responsive Design** - Works on all screen sizes
- **♿ Accessible** - Proper ARIA labels and keyboard navigation

## 🏗️ Architecture

\`\`\`
src/
├── components/
│   ├── common/         # Layout, ThemeToggle, ErrorState, EmptyState
│   ├── dashboard/      # Main UsersDashboard feature component
│   ├── icons/          # SVG icon components
│   ├── ui/             # Reusable UI components (Button, Input, Card, etc.)
│   └── users/          # UserCard, UserTable, Skeletons
├── hooks/
│   ├── useUsers.ts         # User data fetching hook
│   ├── useUserFilterSort.ts # Filtering and sorting logic
│   └── useTheme.tsx        # Theme context and hook
├── services/
│   └── api.ts          # API service layer
├── types/
│   └── user.ts         # TypeScript interfaces
├── App.tsx
└── main.tsx
\`\`\`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## 🎯 Key Design Decisions

### Clean Architecture
- **Separation of Concerns**: Components, hooks, services, and types are clearly separated
- **Reusable Components**: UI primitives can be used across the entire application
- **Custom Hooks**: Business logic is extracted into testable, reusable hooks

### Performance Optimizations
- **Memoization**: Filtering and sorting use \`useMemo\` for optimal performance
- **Callback Stability**: Functions wrapped with \`useCallback\` to prevent unnecessary re-renders
- **Skeleton Loading**: Prevents layout shift during data loading

### User Experience
- **Smooth Transitions**: CSS transitions for theme switching and interactions
- **Visual Feedback**: Hover states, active states, and loading indicators
- **Error Recovery**: Users can retry failed operations without page refresh

### Type Safety
- **Full TypeScript**: Strict mode enabled with comprehensive type coverage
- **API Types**: Response types match the JSONPlaceholder API structure

## 🛠️ Tech Stack

- **Framework**: React 19
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite 7
- **API**: JSONPlaceholder

## 📝 API Reference

The application fetches data from:
\`\`\`
GET https://jsonplaceholder.typicode.com/users
\`\`\`

## 📄 License

MIT
