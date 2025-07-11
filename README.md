```
typing-speed-app/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx                      # Root layout with providers
│   │   ├── page.tsx                        # Home page with create/join room
│   │   ├── loading.tsx                     # Global loading UI
│   │   ├── error.tsx                       # Global error boundary
│   │   │
│   │   ├── api/                            # API routes
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   │   └── route.ts            # POST /api/auth/login
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts            # POST /api/auth/register
│   │   │   │   ├── logout/
│   │   │   │   │   └── route.ts            # POST /api/auth/logout
│   │   │   │   └── me/
│   │   │   │       └── route.ts            # GET /api/auth/me
│   │   │   │
│   │   │   ├── races/
│   │   │   │   ├── create-room/
│   │   │   │   │   └── route.ts            # POST /api/races/create-room
│   │   │   │   ├── join-room/
│   │   │   │   │   └── route.ts            # POST /api/races/join-room
│   │   │   │   ├── room-details/
│   │   │   │   │   └── route.ts            # GET /api/races/room-details?roomId=
│   │   │   │   ├── start-race/
│   │   │   │   │   └── route.ts            # POST /api/races/start-race
│   │   │   │   ├── complete-race/
│   │   │   │   │   └── route.ts            # POST /api/races/complete-race
│   │   │   │   └── typing-texts/
│   │   │   │       └── route.ts            # GET /api/races/typing-texts
│   │   │   │
│   │   │   ├── leaderboard/
│   │   │   │   ├── global/
│   │   │   │   │   └── route.ts            # GET /api/leaderboard/global
│   │   │   │   ├── personal/
│   │   │   │   │   └── route.ts            # GET /api/leaderboard/personal
│   │   │   │   └── room/
│   │   │   │       └── route.ts            # GET /api/leaderboard/room?roomId=
│   │   │   │
│   │   │   ├── users/
│   │   │   │   ├── profile/
│   │   │   │   │   └── route.ts            # GET/PUT /api/users/profile
│   │   │   │   ├── stats/
│   │   │   │   │   └── route.ts            # GET /api/users/stats
│   │   │   │   └── history/
│   │   │   │       └── route.ts            # GET /api/users/history
│   │   │   │
│   │   │   ├── webhooks/
│   │   │   │   └── ably/
│   │   │   │       └── route.ts            # POST /api/webhooks/ably
│   │   │   │
│   │   │   └── ably/
│   │   │       └── auth/
│   │   │           └── route.ts            # POST /api/ably/auth - Token auth
│   │   │
│   │   ├── race/
│   │   │   ├── [room-id]/
│   │   │   │   ├── page.tsx                # Main race page
│   │   │   │   ├── loading.tsx             # Race loading state
│   │   │   │   └── not-found.tsx           # Room not found
│   │   │   └── create/
│   │   │       └── page.tsx                # Create race room
│   │   │
│   │   ├── leaderboard/
│   │   │   ├── page.tsx                    # Global leaderboard
│   │   │   └── loading.tsx
│   │   │
│   │   ├── profile/
│   │   │   ├── page.tsx                    # User profile and stats
│   │   │   └── loading.tsx
│   │   │
│   │   └── auth/
│   │       ├── login/
│   │       │   └── page.tsx                # Login page
│   │       └── register/
│   │           └── page.tsx                # Registration page
│   │
│   ├── components/
│   │   ├── ui/                             # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── modal.tsx
│   │   │   ├── progress-bar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── loading-spinner.tsx
│   │   │   ├── toast.tsx
│   │   │   └── avatar.tsx
│   │   │
│   │   ├── race/
│   │   │   ├── typing-area.tsx             # Main typing interface
│   │   │   ├── race-lobby.tsx              # Pre-race waiting room
│   │   │   ├── race-progress.tsx           # Real-time progress bars
│   │   │   ├── countdown-timer.tsx         # Race start countdown
│   │   │   ├── race-results.tsx            # Post-race results
│   │   │   ├── player-list.tsx             # Active players sidebar
│   │   │   ├── wpm-display.tsx             # Live WPM counter
│   │   │   ├── accuracy-meter.tsx          # Typing accuracy display
│   │   │   ├── text-display.tsx            # Formatted text with highlighting
│   │   │   └── race-settings.tsx           # Room configuration
│   │   │
│   │   ├── leaderboard/
│   │   │   ├── leaderboard-table.tsx       # Main leaderboard table
│   │   │   ├── leaderboard-filters.tsx     # Filter controls
│   │   │   ├── personal-stats.tsx          # User statistics
│   │   │   └── rank-badge.tsx              # Rank display component
│   │   │
│   │   ├── auth/
│   │   │   ├── login-form.tsx              # Login form component
│   │   │   ├── register-form.tsx           # Registration form
│   │   │   ├── auth-guard.tsx              # Route protection
│   │   │   └── user-menu.tsx               # User dropdown menu
│   │   │
│   │   ├── layout/
│   │   │   ├── header.tsx                  # Main navigation header
│   │   │   ├── footer.tsx                  # Site footer
│   │   │   ├── navigation.tsx              # Navigation menu
│   │   │   └── sidebar.tsx                 # Sidebar layout
│   │   │
│   │   └── providers/
│   │       ├── ably-provider.tsx           # Ably client provider
│   │       ├── auth-provider.tsx           # Authentication context
│   │       ├── theme-provider.tsx          # Theme management
│   │       └── toast-provider.tsx          # Toast notifications
│   │
│   ├── lib/
│   │   ├── ably-client.ts                  # Ably configuration and client setup
│   │   ├── auth.ts                         # JWT auth utilities
│   │   ├── prisma.ts                       # Prisma client singleton
│   │   ├── redis.ts                        # Redis client for caching
│   │   ├── typing-calculator.ts            # WPM/accuracy calculations
│   │   ├── race-utils.ts                   # Race state management
│   │   ├── validation.ts                   # Zod validation schemas
│   │   ├── constants.ts                    # App-wide constants
│   │   ├── api-client.ts                   # HTTP client utilities
│   │   ├── room-id-generator.ts            # Unique room ID generation
│   │   └── utils.ts                        # General utility functions
│   │
│   ├── hooks/
│   │   ├── use-ably.ts                     # Ably connection and channels
│   │   ├── use-race-state.ts               # Race state management
│   │   ├── use-typing-stats.ts             # Real-time typing statistics
│   │   ├── use-auth.ts                     # Authentication state
│   │   ├── use-local-storage.ts            # Local storage persistence
│   │   ├── use-countdown.ts                # Countdown timer logic
│   │   ├── use-presence.ts                 # Ably presence management
│   │   ├── use-debounce.ts                 # Input debouncing
│   │   └── use-typing-progress.ts          # Typing progress tracking
│   │
│   ├── store/
│   │   ├── race-store.ts                   # Zustand race state
│   │   ├── user-store.ts                   # User authentication state
│   │   ├── typing-store.ts                 # Typing progress state
│   │   └── leaderboard-store.ts            # Leaderboard data
│   │
│   ├── types/
│   │   ├── auth.ts                         # Authentication types
│   │   ├── race.ts                         # Race-related types
│   │   ├── user.ts                         # User profile types
│   │   ├── socket-events.ts                # Ably channel event types
│   │   ├── api-responses.ts                # API response types
│   │   └── database.ts                     # Database model types
│   │
│   └── middleware.ts                       # Next.js middleware for auth
│
├── prisma/
│   ├── schema.prisma                       # Database schema
│   ├── migrations/                         # Migration files
│   └── seed.ts                             # Database seeding
│
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── typing-texts/
│       ├── beginner.json                   # Easy typing texts
│       ├── intermediate.json               # Medium difficulty
│       └── advanced.json                   # Hard typing texts
│
├── .env.local                              # Environment variables
├── .env.example                            # Environment template
├── package.json
├── next.config.js                          # Next.js configuration
├── tailwind.config.js                      # Tailwind CSS config
├── tsconfig.json                           # TypeScript config
├── docker-compose.yml                      # Local development
├── Dockerfile                              # Production build
└── README.md
```

## Key Implementation Details

### Ably Channel Structure
- **Race Rooms**: `race:${roomId}` - Real-time race events
- **Presence**: `presence:${roomId}` - Who's in the room
- **Global**: `leaderboard:global` - Live leaderboard updates

### API Route Functions
- **Authentication**: JWT-based auth with refresh tokens
- **Race Management**: Room creation, joining, state synchronization
- **Real-time Events**: Ably webhook processing
- **Statistics**: Performance tracking and leaderboards

### Database Models (Prisma)
- **Users**: Profile, stats, authentication
- **Races**: Room details, text content, status
- **RaceResults**: Individual race performance
- **Leaderboards**: Cached ranking data

### State Management
- **Zustand**: Client-side state stores
- **Ably**: Real-time synchronization
- **Redis**: Server-side caching
- **Local Storage**: User preferences

### Real-time Flow
1. User joins room → Ably presence
2. Race starts → Broadcast to all participants
3. Typing progress → Real-time updates via Ably
4. Race completion → Results calculation and broadcast
