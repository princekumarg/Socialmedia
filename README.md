# Social Media Platform

## Overview
This project is a social media platform built using React for the frontend, Node.js for the backend, MongoDB for the database, and various other technologies. The platform allows users to create profiles, post updates, connect with friends, comment on posts, and engage in social interactions.

## Demo


## Features
- User Authentication: Allow users to register, login, and manage their profiles securely.
- Profile Management: Users can create and update their profiles with personal information, profile pictures, etc.
- Posting: Users can create posts, share updates, and media content.
- Friend Connections: Users can connect with other users, send friend requests, and manage their friend list.
- Interactions: Like, comment, and share posts, as well as messaging and notifications.
- Search: Search for users, posts, and content within the platform.

## Technologies Used
- **Frontend:** React, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Other Tools:** Axios for API requests, bcrypt for password hashing, etc.

## Getting Started
1. Clone the repository: `git clone https://github.com/your-username/social-media-platform.git`
2. Navigate to the project directory: `cd social-media-platform`
3. Install dependencies: `npm install`
4. Set up environment variables and configurations (e.g., database connection).
5. Start the backend server: `npm start`
6. Navigate to the frontend directory: `cd client`
7. Install frontend dependencies: `npm install`
8. Start the frontend development server: `npm start`

## API Endpoints
- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Login and generate JWT token.
- **GET /api/profile/:id:** Get user profile information.
- **POST /api/posts:** Create a new post.
- **GET /api/posts/:id:** Get post details.
- **POST /api/posts/:id/comment:** Add a comment to a post.
- **POST /api/friends/add/:id:** Send a friend request.
- **GET /api/friends/requests:** Get friend requests.
- **POST /api/friends/accept/:id:** Accept a friend request.
- **DELETE /api/friends/remove/:id:** Remove a friend.

## Contributor
- [Your Name](https://github.com/your-username)

## Deployment
- [Live Demo](https://your-live-demo-link.com)
