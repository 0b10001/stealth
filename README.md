# stealth

[![Test](https://github.com/ob10001/stealth/actions/workflows/test.yml/badge.svg)](https://github.com/ob10001/stealth/actions/workflows/test.yml)

Live Demo: [https://stealth-puhc.vercel.app/](https://stealth-puhc.vercel.app/)

## Running Tests

### Frontend Tests
```sh
cd frontend
npm install
npm test
```

### Backend Tests
```sh
cd backend
npm install
npm test
```

### Running All Tests
```sh
# From the root directory
npm run test
```

## Running with Docker

1. Make sure you have Docker and Docker Compose installed on your system
2. From the root directory, run:
   ```sh
   docker-compose up --build
   ```
3. The application will be available at:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:3001](http://localhost:3001)

To stop the application:
```sh
docker-compose down
```

## Running the Backend

1. Open a terminal and navigate to the `backend` directory:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server in development mode:
   ```sh
   npm run dev
   ```
   The backend will run at [http://localhost:3001](http://localhost:3001).

4. To build and run the backend in production:
   ```sh
   npm run build
   npm start
   ```

---

## Running the Frontend

1. Open a new terminal and navigate to the `frontend` directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```
   The frontend will run at [http://localhost:5173](http://localhost:5173).

---

## API URL Configuration

When running the application locally, you'll need to update the API URL in the frontend code from `https://stealth-tybu.onrender.com` to `http://localhost:3001`. This change is necessary because:

1. The frontend is configured to use the production API URL by default
2. For local development, you'll want to connect to your local backend server

To make this change, update the API URLs in your frontend components (like `UserList.tsx`) from:
```typescript
"https://stealth-tybu.onrender.com/users"
```
to:
```typescript
"http://localhost:3001/users"
```

This ensures your frontend connects to your local backend server during development.

- Make sure the backend is running before using the frontend for full functionality.
- Both backend and frontend use `npm` as the package manager.

---

## Considerations and Assumptions

- **Node.js and npm**: It is assumed that Node.js and npm are installed on your system. If not, please install them from [nodejs.org](https://nodejs.org/).
- **Ports**: The backend runs on port 3001 and the frontend on port 5173. Ensure these ports are not in use by other applications.
- **Database**: The backend uses SQLite. Ensure that the database file (`users_tasks.db`) is present in the `backend` directory.
- **Cross-Origin Resource Sharing (CORS)**: The backend is configured to allow CORS requests from the frontend. If you change the frontend URL, update the CORS settings in `backend/src/index.ts`.
- **Dependencies**: All necessary dependencies are listed in the `package.json` files. Run `npm install` in both the `backend` and `frontend` directories to install them.
- **Development vs. Production**: The instructions provided are for development mode. For production, build the backend and frontend using the respective build commands.

## API Integrations

### OpenWeatherMap API

1. Sign up for a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Create a `.env` file in the `frontend` directory with the following content:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```
3. Replace `your_api_key_here` with your actual OpenWeatherMap API key
