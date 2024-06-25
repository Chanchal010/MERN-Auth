
# MERN Authentication

A full-stack MERN (MongoDB, Express, React, Node.js) application with authentication features.

## Features

- User registration and login
- JWT-based authentication
- Protected routes
- Password hashing with bcryptjs
- Persistent login with refresh tokens

## Prerequisites

Ensure you have the following installed on your local development machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- npm (Node Package Manager) or yarn

## Installation

1. Clone the repository:
```
git clone https://github.com/Chanchal010/mern-auth.git
```
3. Navigate to the project directory:
```
cd mern-auth
```
3. Install server dependencies:
```
cd mern-auth
```
```
npm install
```
```
yarn install
```
4. Install client dependencies:
```
cd ../client
```
```
npm install
```
```
yarn install
```
## Configuration

1. Create a `.env` file in the `backend` directory and add the following environment variables:

```env
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

## Running the Application

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. Start the frontend development server:

```bash
cd frontend
npm start
```

The application should now be running on `http://localhost:3000`.

## Project Structure

```plaintext
mern-auth/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── README.md
└── .gitignore
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

---
