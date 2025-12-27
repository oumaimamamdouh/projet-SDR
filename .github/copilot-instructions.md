# WorkNet Platform - AI Coding Guidelines

## Architecture Overview
WorkNet is a freelance marketplace with a three-tier architecture:
- **Frontend**: React + Vite + Tailwind CSS (`worknet_frontend/`)
- **API Gateway**: Express.js server (`worknet_backend/`) - handles HTTP requests and WebSocket
- **Business Logic**: Python XML-RPC server (`rpc-server/`) - core services with MongoDB

## Key Communication Patterns
- Frontend calls backend REST APIs via axios (`src/services/api/axiosConfig.js`)
- Backend controllers use `rpcClient` to call Python RPC methods (`utils/rpcClient.js`)
- RPC server exposes methods from service classes (`services/*.py`)
- Authentication: JWT tokens stored in localStorage, auto-attached via axios interceptors

## Development Workflows
- **Start full stack**: Run RPC server first (`python rpc-server/run_server.py`), then backend (`npm run dev` in `worknet_backend/`), then frontend (`npm run dev` in `worknet_frontend/`)
- **Testing**: Backend uses Jest with mocked RPC calls (`npm test` in `worknet_backend/`)
- **Database**: MongoDB Atlas with local fallback; connection via `MONGODB_URI` env var

## Code Organization Patterns
- **Backend routes**: RESTful endpoints in `routes/` calling controllers in `controllers/`
- **RPC services**: Each domain (users, gigs, orders) has its own service class with database operations
- **Frontend**: Feature-based organization with services for API calls, components in `src/components/`
- **Error handling**: Backend uses `asyncHandler` wrapper and `ErrorResponse` class

## User Types & Routes
- **Client**: `/client/*` - can post gigs, place orders
- **Freelancer**: `/freelancer/*` - can create gigs, accept orders  
- **Admin**: `/admin/*` - full platform management
- Authentication routes: `/login`, `/register`, `/forgot-password`

## Key Files to Reference
- `rpc-server/server.py` - RPC method registration
- `worknet_backend/server.js` - Express app setup and route mounting
- `worknet_frontend/src/App.jsx` - Main routing structure
- `rpc-server/services/database.py` - MongoDB connection singleton

## Common Patterns
- RPC methods return dicts with `success: bool` and either `data` or `error`
- Backend controllers wrap RPC calls with `asyncHandler` and throw `ErrorResponse`
- Frontend services use toast notifications for user feedback
- Environment variables loaded via `dotenv` in all services