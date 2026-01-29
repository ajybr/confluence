This is a simple broadcast chat app.

## Environment Variables:
To run this project, you will need to add the following environment variables to your .env file

- Backend

```
JWT_SECRET=my-jwt-secret

DATABASE_URL=https://my-db-url

```

- Frontend

```
VITE_BACKEND_URL=http://my-backend-url

```

## Run Locally

Clone the project

```bash
  git clone https://github.com/captainskyfish/confluence
```

Go to the project directories and Install dependencies

- Backend
```bash
  cd confluence/backend
  npm install
```
- Frontend


```bash
  cd confluence/frontend
  npm install
```

Start the server

```bash
// backend/ 
  npm run dev

// frontend/
  npm run dev
```

