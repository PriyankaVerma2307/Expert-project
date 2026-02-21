# Expert Booking App

A modern **Expert Session Booking App** built with **React.js**, **Node.js**, **Express**, and **MongoDB**.  
This app allows users to view expert profiles, select available slots, book sessions, and manage their bookings in real-time.

---

## 🔹 Features

- Browse expert profiles with detailed information
- Horizontal card layout with premium UI design
- Slot selection for booking
- Secure booking confirmation with optional notes
- View your bookings by email
- Status badges: **Confirmed**, **Pending**, **Completed**
- Responsive design for desktop and mobile
- Search bookings by email
- Clean and intuitive user interface

---

## 🔹 Tech Stack

- **Frontend:** React.js, React Router, CSS3, HTML5
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **HTTP Client:** Axios / Fetch API

---

## 🔹 Installation

1. Clone the repository:

....bash
git clone https://github.com/yourusername/expert-booking-app.git
cd expert-booking-app

2.Install backend dependencies:
 ....bash 
 cd src/backend
 npm install

3.Install frontend dependencies:
 ...bash 
 cd ..
 npm install

4.Create .env file in backend:
   MONGO_URI=<your_mongodb_connection_string>
   PORT=5000



## Run Application

Backend (Express + Node.js):
cd src/backend
npm run dev

Frontend :
...expert-booking-app
npm start

## Folder Structure
src/
├── backend/
│   ├── models/          # MongoDB Schemas
│   ├── routes/          # API routes (experts, bookings)
│   ├── controllers/     # Route handlers
│   └── server.js        # Express server entry
├── frontend/
│   ├── components/      # React Components (SlotSelector, etc.)
│   ├── pages/           # Pages (ExpertDetail, Booking, MyBookings)
│   └── App.js




