# BlogApp

A full-stack blog application built with React, Redux Toolkit, Express.js, MongoDB, and Cloudinary for image uploads.

## Features

- **User Authentication**: Sign up, sign in, and logout functionality with JWT tokens
- **Blog Posts**: Create, read, update, and delete blog posts
- **Image Uploads**: Cloudinary integration for featured images
- **Rich Text Editor**: TinyMCE integration for post content
- **Responsive Design**: Tailwind CSS for modern UI
- **State Management**: Redux Toolkit for global state
- **API Integration**: Axios for HTTP requests

## Tech Stack

### Frontend
- React 19
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- TinyMCE React
- Axios

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Cloudinary for image uploads
- Multer for file handling
- Zod for validation
- bcrypt for password hashing

## Project Structure

```
BlogApp/
├── Backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── constants.js
│   │   ├── index.js
│   │   ├── controllers/
│   │   │   ├── user.controllers.js
│   │   │   └── posts.controllers.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── multer.middleware.js
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── posts.model.js
│   │   │   └── db_connect/
│   │   ├── routes/
│   │   │   ├── user.routes.js
│   │   │   └── post.routes.js
│   │   └── utils/
│   │       ├── ApiError.js
│   │       ├── ApiResponse.js
│   │       ├── AsyncHandler.js
│   │       ├── cloudinary.js
│   │       └── generateAccessTokenAndRefreshToken.js
│   ├── public/
│   ├── package.json
│   └── .env
├── Frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── PostCard.jsx
│   │   │   ├── PostForm.jsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── LogIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── AddPost.jsx
│   │   │   ├── EditPost.jsx
│   │   │   └── Post.jsx
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   └── authSlice.js
│   │   └── assets/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account for image uploads

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BlogApp
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```

   Create a `.env` file in the Backend directory with:
   ```
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   CORS_ORIGIN=http://localhost:5173
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   REFRESH_TOKEN_EXPIRY=10d
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   ```

   Start the frontend development server:
   ```bash
   npm run dev
   ```

4. **Access the Application**

   Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### User Routes (`/api/v1/user`)

- `POST /signup` - Register a new user
- `POST /signin` - Login user
- `POST /logout` - Logout user
- `GET /current-user` - Get current user info
- `POST /refresh-token` - Refresh access token

### Post Routes (`/api/v1/posts`)

- `POST /create-post` - Create a new blog post (requires auth)
- `PUT /update-post/:id` - Update a blog post (requires auth)
- `DELETE /delete-post/:id` - Delete a blog post (requires auth)
- `GET /get-post/:id` - Get a single blog post (requires auth)
- `GET /list-posts` - Get all blog posts (requires auth)
- `GET /get-user-posts` - Get posts by current user (requires auth)

## Environment Variables

### Backend (.env)
- `PORT`: Server port (default: 8000)
- `MONGODB_URI`: MongoDB connection string
- `CORS_ORIGIN`: Frontend URL for CORS
- `ACCESS_TOKEN_SECRET`: JWT access token secret
- `ACCESS_TOKEN_EXPIRY`: Access token expiry (e.g., "1d")
- `REFRESH_TOKEN_SECRET`: JWT refresh token secret
- `REFRESH_TOKEN_EXPIRY`: Refresh token expiry (e.g., "10d")
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
