# 🎬 LockMySeat - Movie Ticket Booking Platform

## 🚀 Overview
Welcome to **LockMySeat**, a cutting-edge full-stack web application revolutionizing movie ticket bookings! Designed for seamless user experiences, it offers real-time seat selection, secure payments via Razorpay, movie reviews, and robust tools for theater owners to manage shows and track revenue. Get ready to dive into the world of cinema like never before!

---

## ✨ Key Features

### 🎥 User-Side Features
- **User Authentication**: User can signup with otp verification, login, forgotpassword and Reset password.
- **Profile Management**: User can edit their personal details.
- **Show Selection**: filtered shows based on dates with real-time show schedules.
- **Seat Selection**: Interactive interface to pick your seats with live availability updates.
- **Booking Details**: View and manage your bookings and get details on mail also.
- **Payment Integration**: Secure transactions using Razorpay for a hassle-free checkout.
- **Movie Reviews**: Rate and read reviews for booked movies to share your cinema experience.

### 🎭 TheaterOwner-Side Features
- **Add Theater**: Easily register and manage theater details.
- **Add Shows**: Schedule movies with customizable show timings.
- **Track Revenue**: Monitor earnings with detailed financial insights.
- **Total Booked Seats**: Analyze occupancy and booked seats across all theaters.

---

## 🛠 Technologies Stack
- **Frontend**: React.js, Zustand, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment**: Razorpay API
- **Extras**: Axios, JWT, Daisyui, 

---

## 🔥 Getting Started

### Installation
1. Clone the repo:  
   `git clone https://github.com/Akash-S-010/LockMySeat_movie_ticket_booking.git`
2. Navigate to the project:  
   `cd LockMySeat_movie_ticket_booking`
3. Install dependencies:  
   `npm install`
4. Configure environment variables:  
   Create a `.env` file and add your Razorpay API keys and MongoDB URI.
5. Launch the app:  
   `npm start`

### Usage
- **Users**: Sign up, explore shows, select seats, pay with Razorpay, and leave reviews.
- **Theater Owners**: Log in, add theaters/shows, and track revenue/bookings via the dashboard.

---

## 🌐 Live Demo & Screenshots
Check out the live application: 
[LockMySeat User Side](https://lock-my-seat.vercel.app/)   
[LockMySeat TheaterOwner Dashboard](https://lock-my-seat.vercel.app/owner)   



---

## 📚 API Endpoints (For Developers)

### 🌐 User Endpoints
- `POST /api/user/signup` - Register a new user
- `POST /api/user/verify-otp` - Verify OTP for user registration
- `POST /api/user/resend-otp` - Resend OTP for user verification
- `POST /api/user/login` - User login
- `POST /api/user/forgot-password` - Initiate password reset
- `POST /api/user/reset-password` - Reset user password
- `PUT /api/user/update-profile` - Update user profile (requires authentication, accepts profile picture upload)
- `POST /api/user/logout` - User logout
- `GET /api/user/check-user` - Check authenticated user details (requires authentication)
- `GET /api/user/all-users` - Fetch all users (requires owner/admin access)
- `PUT /api/user/update-status/:userId` - Toggle user status (requires admin access)
- `POST /api/user/contact` - Submit contact form

### 🔐 Admin Endpoints
- `POST /api/admin/signup` - Register a new admin
- `POST /api/admin/verify-otp` - Verify OTP for admin registration
- `POST /api/admin/login` - Admin login
- `POST /api/admin/resend-otp` - Resend OTP for admin verification
- `POST /api/admin/forgot-password` - Initiate admin password reset
- `POST /api/admin/reset-password` - Reset admin password
- `PUT /api/admin/update-profile` - Update admin profile (requires owner/admin access, accepts profile picture upload)
- `GET /api/admin/check-owner` - Check theater owner status (requires owner access)
- `GET /api/admin/check-admin` - Check admin status (requires admin access)

### 🎬 Movie Endpoints
- `POST /api/movie/add-movie` - Add a new movie (requires admin access)
- `DELETE /api/movie/delete-movie/:id` - Delete a movie (requires admin access)
- `PUT /api/movie/update-movie/:id` - Update movie details (requires admin access)
- `GET /api/movie/movies` - Fetch all movies
- `GET /api/movie/movie-details/:id` - Fetch movie details (requires authentication)
- `GET /api/movie/total-movies` - Get total number of movies (requires owner/admin access)

### ⭐ Review Endpoints
- `POST /api/movie/:movieId/add-review` - Add a review for a movie (requires authentication)
- `GET /api/movie/:movieId/getall-reviews` - Fetch all reviews for a movie (requires authentication)

### 🏟 Theater Endpoints
- `POST /api/theater/add-theater` - Add a new theater (requires owner access)
- `GET /api/theater/all-theaters` - Fetch all theaters (requires admin access)
- `GET /api/theater/owner-theaters` - Fetch theaters owned by the user (requires owner access)
- `GET /api/theater/approved-theaters` - Fetch all approved theaters (requires authentication)
- `GET /api/theater/theater-details/:id` - Fetch details of a specific theater (requires authentication)
- `GET /api/theater/total-theaters` - Get total number of theaters (requires owner/admin access)
- `PUT /api/theater/:id/approve` - Approve a theater (requires admin access)
- `PUT /api/theater/:id/reject` - Reject a theater (requires admin access)

### 📅 Show Endpoints
- `POST /api/show/add-show` - Add a new show (requires owner access)
- `GET /api/show/by-date` - Fetch shows by date (requires authentication)
- `GET /api/show/by-location` - Fetch shows by location (requires authentication)
- `GET /api/show/all-shows` - Fetch all shows (requires owner access)
- `GET /api/show/seats/:showId` - Fetch available seats for a show (requires authentication)
- `GET /api/show/total-shows` - Get total number of shows (requires owner access)

### 🎫 Booking Endpoints
- `POST /api/booking/create` - Create a new booking (requires authentication)
- `GET /api/booking/all-bookings` - Fetch all user bookings (requires authentication)
- `GET /api/booking/total-bookings` - Get total number of bookings (requires authentication)

### 💳 Payment Endpoints
- `POST /api/payment/create` - Initiate payment for a booking (requires authentication)
- `GET /api/payment/all-bookings` - Fetch all user payment-related bookings (requires authentication)
- `GET /api/payment/total-bookings` - Get total number of payment-related bookings (requires authentication)

### 💰 Revenue Endpoints
- `GET /api/revenue/theaterOwner-revenue` - Fetch revenue for theater owner (requires owner access)
- `GET /api/revenue/admin-revenue` - Fetch revenue for admin (requires admin access)

---

## 📜 License
This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details.

---

## 📧 Contact
Got questions or feedback? Reach out:  
- Email: akashspalloor@example.com  
- Issues: Open a ticket [here](https://github.com/Akash-S-010/LockMySeat.movie_ticket_booking/issues)

---

## 🙌 Acknowledgments
- Inspired by BookMyShow and the cinema booking industry.

---

### 🎉 Why LockMySeat?
LockMySeat isn’t just an app—it’s your front-row ticket to a smarter, cooler movie experience. Whether you’re a movie buff or a theater owner, we’ve got you covered with style and innovation!

*(Add your screenshots and live link to make it pop!)*
