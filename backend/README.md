
# FixMyRide API

Backend API for the FixMyRide mobile mechanic service application.

## Setup Instructions

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file based on the `.env.example` file
5. Start the development server:
   ```
   npm run dev
   ```

## API Endpoints

### Auth Routes
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)
- `PUT /api/users/profile` - Update user profile (protected)
- `GET /api/users` - Get all users (admin only)

### Mechanic Routes
- `POST /api/mechanics/apply` - Apply to be a mechanic (protected)
- `GET /api/mechanics/applications` - Get all mechanic applications (admin only)
- `PUT /api/mechanics/applications/:id` - Update application status (admin only)
- `GET /api/mechanics` - Get all approved mechanics (public)

### Service Routes
- `POST /api/services` - Create a new service request (protected)
- `GET /api/services/user` - Get all service requests for a user (protected)
- `GET /api/services/pending` - Get all pending service requests (mechanic only)
- `GET /api/services/mechanic/active` - Get active service requests for a mechanic (mechanic only)
- `GET /api/services/mechanic/completed` - Get completed service requests for a mechanic (mechanic only)
- `PUT /api/services/:id/status` - Update service request status (mechanic only)
- `GET /api/services` - Get all service requests (admin only)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid token to be included in the Authorization header using the Bearer scheme:

```
Authorization: Bearer <token>
```

## Environment Variables

- `PORT` - Port number for the server (default: 5000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT 
- `NODE_ENV` - Environment (development/production)
