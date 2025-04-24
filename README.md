# 🎬 LockMySeat - Movie Ticket Booking Platform

## 🚀 Overview
Welcome to **LockMySeat**, a cutting-edge full-stack web application that’s revolutionizing movie ticket bookings! 🌟 Designed for seamless user experiences, it features real-time seat selection, secure Razorpay payments, movie reviews, and powerful tools for theater owners to manage shows and track revenue. Dive into the cinematic world like never before! 🎥

---

## ✨ Key Features

### 🔒 Authentication Features (User, TheaterOwner and Admin)
Sign up with OTP verification, resend OTP, login, forgot password, and reset password.

### 👤 User-Side Features
- **Profile Management**: Edit personal details with profile picture uploads. 
- **Show Selection**: Filter shows by date with real-time schedules. 
- **Seat Selection**: Interactive interface with live availability updates. 
- **Booking Details**: View, manage bookings, and get details via email. 
- **Payment Integration**: Secure, hassle-free transactions with Razorpay. 
- **Movie Reviews**: Rate and read reviews for booked movies. ⭐

### **User Home Page**
![Image](https://github.com/user-attachments/assets/a304e59b-c8b1-49e2-9b28-5c9517c52a80)


### **Signup**
![Image](https://github.com/user-attachments/assets/4d926d78-3e0d-483f-96cf-96bb582b0e34)


### **OTP Verification**
![verify-otp](https://github.com/user-attachments/assets/615bd7ee-3f0f-40b0-9209-5c8114069286)


### **Forgot Password**
![Image](https://github.com/user-attachments/assets/fd254d78-37a3-4fba-bce4-9f53caa82e47)


### **Login**
![Image](https://github.com/user-attachments/assets/245dc662-db84-41ee-ba4c-b294b4bcb088)


### **Profile Page**
![Image](https://github.com/user-attachments/assets/219a44ab-7416-4906-95f4-7afbdf34a2a9)


### **Movie List**
![Image](https://github.com/user-attachments/assets/f56395ac-825d-46bf-ae8c-d21c8c85ec23)


### **Movie Details Page**
![Image](https://github.com/user-attachments/assets/ba6f4a70-6b52-422a-b366-03529aa1eac7)


### **Show Selection Page**
![Image](https://github.com/user-attachments/assets/d872ec96-63df-418c-8887-d7c8ea213512)


### **Seat Selection**
![Image](https://github.com/user-attachments/assets/dc3bd78d-8b95-40af-8449-eb62781dda11)


### **Order Summary**
![Image](https://github.com/user-attachments/assets/270fd1d2-040b-404a-8559-f57dd563a4fd)


### **Razorpay Page**
![Image](https://github.com/user-attachments/assets/2ac6582f-dc4e-42d5-8241-6ff5a31da9c9)


### **Payment Status**
![Image](https://github.com/user-attachments/assets/a556e3c8-6d66-4f48-9c48-ff6ec7f5f86c)


### **Booking History**
![Image](https://github.com/user-attachments/assets/81fcb8c2-ea1a-46b3-9ef3-4d96fabb5976)


### **Post Review**
![Image](https://github.com/user-attachments/assets/7d04f21c-0936-4dfb-9fa1-e14d687d9b2e)

---



### 🏠 TheaterOwner-Side Features
- **Add Theater**: Register and manage theater details effortlessly. 
- **Add Shows**: Add shows with customizable timings. 
- **Track Revenue**: Monitor earnings with detailed insights. 
- **Total Booked Seats**: Analyze occupancy across all theaters.
   
### **Theater Owner Page**
![Image](https://github.com/user-attachments/assets/552a74ed-fccc-4c85-ad81-093b71926395)


 ### **Theater Dashboard**
![Image](https://github.com/user-attachments/assets/66dc3fee-0a82-41ac-af86-7751e4fcf791)
 
 

### **Movie List**
![Image](https://github.com/user-attachments/assets/956c237c-7416-42e7-ae0b-34d2d37d1b8f)




### **Theater List**
![Image](https://github.com/user-attachments/assets/1e6f40d4-017e-47d7-80b0-b013bd6fcb2b)




### **Add Theater**
![Image](https://github.com/user-attachments/assets/e27336e0-0b8d-4d0b-897d-901714ff6f49)




### **Shows**
![Image](https://github.com/user-attachments/assets/c4e14196-4604-4d6b-807a-8500c83c3d21)



### **Add Shows**
![Image](https://github.com/user-attachments/assets/d78c1bcf-e4ea-4a4a-853b-fcf681ece1d1)

### ⭐ Additional features
- **Dark/Light Mode**: Toggle for enhanced user experience.
- **Real-Time Search**: Debounced search for movies and shows.
- **Responsive Design**: Optimized for mobile and desktop devices.
- **Modern UI: Sleek**, intuitive interface with animations and clean design.
- **Auto-Generated Emails**: Booking confirmations sent to users’ email.
---

## 🛠 Technologies Stack
- **Frontend**: React.js, Zustand, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Payment**: Razorpay API
- **Extras**: Axios, JWT, DaisyUI, Framer-motion

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
---

## 🌐 Live Demo
Experience the magic live!  
- [User Side](https://lock-my-seat.vercel.app/)  
- [TheaterOwner Dashboard](https://lock-my-seat.vercel.app/owner)  

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
