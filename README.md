# 🎬 LockMySeat - Movie Ticket Booking Platform

## 🚀 Overview
Welcome to **LockMySeat**, a cutting-edge full-stack web application that’s revolutionizing movie ticket bookings! 🌟 Designed for seamless user experiences, it features real-time seat selection, secure Razorpay payments, movie reviews, and powerful tools for theater owners to manage shows and track revenue. Dive into the cinematic world like never before! 🎥

---

## ✨ Key Features

### 🎥 User-Side Features
- **User Authentication**: Sign up with OTP verification, login, forgot password, and reset password.
- **Profile Management**: Edit personal details with profile picture uploads. 
- **Show Selection**: Filter shows by date with real-time schedules. 
- **Seat Selection**: Interactive interface with live availability updates. 
- **Booking Details**: View, manage bookings, and get details via email. 
- **Payment Integration**: Secure, hassle-free transactions with Razorpay. 
- **Movie Reviews**: Rate and read reviews for booked movies. ⭐

### 🎭 TheaterOwner-Side Features
- **Add Theater**: Register and manage theater details effortlessly. 
- **Add Shows**: Schedule movies with customizable timings. 
- **Track Revenue**: Monitor earnings with detailed insights. 
- **Total Booked Seats**: Analyze occupancy across all theaters. 

---

## 🛠 Technologies Stack
- **Frontend**: React.js, Zustand, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment**: Razorpay API
- **Extras**: Axios, JWT, DaisyUI

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
Experience the magic live!  
- [User Side](https://lock-my-seat.vercel.app/)  
- [TheaterOwner Dashboard](https://lock-my-seat.vercel.app/owner)  

### 🎨 Screenshots
Add stunning visuals of LockMySeat in action!  
- **Show Selection**:  
  ![Show Selection](https://github.com/Akash-S-010/LockMySeat_movie_ticket_booking/blob/main/screenshots/show-selection.png)  
- **Seat Selection**:  
  ![Seat Selection](https://github.com/Akash-S-010/LockMySeat_movie_ticket_booking/blob/main/screenshots/seat-selection.png)  
- **Booking Details**:  
  ![Booking Details](https://github.com/Akash-S-010/LockMySeat_movie_ticket_booking/blob/main/screenshots/booking-details.png)  
- **Razorpay Payment**:  
  ![Razorpay Payment](https://github.com/Akash-S-010/LockMySeat_movie_ticket_booking/blob/main/screenshots/razorpay-payment.png)  
- **TheaterOwner Dashboard**:  
  ![Owner Dashboard](https://github.com/Akash-S-010/LockMySeat_movie_ticket_booking/blob/main/screenshots/owner-dashboard.png)  

---

## 📚 API Endpoints (For Developers)

### 🌐 User Endpoints
- `POST /api/user/signup` - Register a new user 🎉
- `POST /api/user/verify-otp` - Verify OTP for registration 
- `POST /api/user/resend-otp` - Resend OTP for verification 
- `POST /api/user/login` - User login 
- `POST /api/user/forgot-password` - Initiate password reset 
- `POST /api/user/reset-password` - Reset user password 
- `PUT /api/user/update-profile` - Update profile (auth required, accepts profile pic) 
- `POST /api/user/logout` - User logout 
- `GET /api/user/check-user` - Check authenticated user (auth required) 
- `GET /api/user/all-users` - Fetch all users (owner/admin access) 
- `PUT /api/user/update-status/:userId` - Toggle user status (admin access) 
- `POST /api/user/contact` - Submit contact form 

### 🔐 Admin Endpoints
- `POST /api/admin/signup` - Register a new admin 
- `POST /api/admin/verify-otp` - Verify OTP for admin registration 
- `POST /api/admin/login` - Admin login 
- `POST /api/admin/resend-otp` - Resend OTP for admin verification 
- `POST /api/admin/forgot-password` - Initiate admin password reset 
- `POST /api/admin/reset-password` - Reset admin password 
- `PUT /api/admin/update-profile` - Update admin profile (owner/admin access, accepts profile pic) 
- `GET /api/admin/check-owner` - Check theater owner status (owner access) 
- `GET /api/admin/check-admin` - Check admin status (admin access) 

### 🎬 Movie Endpoints
- `POST /api/movie/add-movie` - Add a new movie (admin access) 
- `DELETE /api/movie/delete-movie/:id` - Delete a movie (admin access) 
- `PUT /api/movie/update-movie/:id` - Update movie details (admin access) 
- `GET /api/movie/movies` - Fetch all movies 
- `GET /api/movie/movie-details/:id` - Fetch movie details (auth required) 
- `GET /api/movie/total-movies` - Get total movies (owner/admin access) 

### ⭐ Review Endpoints
- `POST /api/movie/:movieId/add-review` - Add a movie review (auth required) 
- `GET /api/movie/:movieId/getall-reviews` - Fetch all reviews (auth required)

### 🏟 Theater Endpoints
- `POST /api/theater/add-theater` - Add a theater (owner access) 
- `GET /api/theater/all-theaters` - Fetch all theaters (admin access) 
- `GET /api/theater/owner-theaters` - Fetch owner’s theaters (owner access) 
- `GET /api/theater/approved-theaters` - Fetch approved theaters (auth required) 
- `GET /api/theater/theater-details/:id` - Fetch theater details (auth required) 
- `GET /api/theater/total-theaters` - Get total theaters (owner/admin access) 
- `PUT /api/theater/:id/approve` - Approve a theater (admin access) 
- `PUT /api/theater/:id/reject` - Reject a theater (admin access) 

### 📅 Show Endpoints
- `POST /api/show/add-show` - Add a show (owner access) 
- `GET /api/show/by-date` - Fetch shows by date (auth required) 
- `GET /api/show/by-location` - Fetch shows by location (auth required) 
- `GET /api/show/all-shows` - Fetch all shows (owner access) 
- `GET /api/show/seats/:showId` - Fetch available seats (auth required) 
- `GET /api/show/total-shows` - Get total shows (owner access) 

### 🎫 Booking Endpoints
- `POST /api/booking/create` - Create a booking (auth required) 
- `GET /api/booking/all-bookings` - Fetch user bookings (auth required) 
- `GET /api/booking/total-bookings` - Get total bookings (auth required) 

### 💳 Payment Endpoints
- `POST /api/payment/create` - Initiate payment (auth required) 
- `GET /api/payment/all-bookings` - Fetch payment-related bookings (auth required) 
- `GET /api/payment/total-bookings` - Get total payment bookings (auth required) 

### 💰 Revenue Endpoints
- `GET /api/revenue/theaterOwner-revenue` - Fetch owner revenue (owner access) 
- `GET /api/revenue/admin-revenue` - Fetch admin revenue (admin access) 

---

## 📜 License
This project is licensed under the **MIT License** - see the [LICENSE.md](LICENSE.md) file for details.

---

## 📧 Contact
Got questions or feedback? Reach out:  
- Email: akashspalloor@example.com  
- Issues: Open a ticket [here](https://github.com/Akash-S-010/LockMySeat_movie_ticket_booking/issues)

---

## 🙌 Acknowledgments
- Inspired by BookMyShow and the vibrant cinema booking industry. 🎞

---

### 🎉 Why LockMySeat?
**LockMySeat** isn’t just an app—it’s your front-row ticket to a smarter, cooler movie experience! Whether you’re a movie buff or a theater owner, we bring style, innovation, and ease to every booking. 🌈
