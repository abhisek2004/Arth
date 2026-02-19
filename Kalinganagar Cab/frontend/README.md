# GearUp-Rentals
Car Rental Booking Web Application


# 🚘 GearUp Rentals – Car Rental Booking Platform

**GearUp Rentals** is a full-stack car rental application that allows users to book vehicles seamlessly and lets admins manage cars, bookings, and listings. From Indian family cars to global luxury models, the platform offers a smooth, modern, and user-friendly interface for both ends of the system.

🔗 **Live Project:** [https://mydrivego.vercel.app](https://mydrivego.vercel.app)  
📂 **Source Code:** [GitHub - abhisek2004/GearUp-Rentals](https://github.com/abhisek2004/GearUp-Rentals)

---

## 🚀 Project Overview

GearUp Rentals is a dynamic, responsive platform that allows:
- 🧑 **Users** to browse, filter, and book cars by brand, price, or type
- 🔐 **Admins** to upload and manage car listings with full details and images
- 🛞 Explore from **Tata, Mahindra, Tesla, BMW, Ferrari, and more**
- 🌐 Built for both **local and international** car rental use cases

---

## ✅ Features Implemented

### 🧑‍💼 User Side:
- 🔍 Browse cars by brand, category, fuel type, and seating capacity
- 📅 Check availability by date & book cars with desired options
- 🧾 View booking summary with total price calculation
- 🧡 Add cars to wishlist or favorites
- 📲 Fully responsive for mobile, tablet, and desktop

### 🔐 Authentication:
- 🔑 User Sign Up / Login functionality
- 🔁 JWT or token/session-based access control (depending on backend config)
- 🔓 Protected routes for dashboard and bookings

### 🧑‍💻 Admin Dashboard:
- ➕ Add new car listings with:
  - Title, images, fuel type, rent/day, car brand, year, description, seating
- 📂 Manage inventory: edit, delete, or update car info
- 📅 View and manage user bookings
- 📊 Overview of all active rentals and users (basic analytics)

### 📸 Car Details Page:
- 📷 Image carousel
- 🧾 Car specifications table
- 📍 Pickup/Drop location selector
- ⏱️ Rent duration and price calculator

### 🧠 Global & Local State Usage:
- 🌐 Global state used for user session, cart/bookings, selected car
- ⚡ In-memory state management for better performance
- 💾 LocalStorage or session fallback for session persistence

### 🌏 Car Brands & Models:
Includes vehicles from:
- 🇮🇳 **Indian Brands:** Tata, Mahindra, Maruti Suzuki, Hyundai, Kia, Toyota, MG, Renault, Nissan, Skoda
- 🌐 **International Brands:** Tesla, BMW, Mercedes, Audi, Lamborghini, Ferrari, Porsche, Jaguar, Land Rover, Honda, Ford, Chevrolet, Volkswagen

---

## 🧱 Folder Structure Overview

```

GearUp-Rentals/
├── client/
│   ├── components/         # Navbar, CarCard, BookingForm, AdminPanel, etc.
│   ├── pages/              # Home, CarDetails, Login, Signup, Admin
│   ├── context/            # AuthContext, BookingContext
│   ├── assets/             # Car images, logos
│   └── utils/              # Formatters, filters, validations
├── server/                 # (if backend included)
│   ├── routes/             # carRoutes, bookingRoutes, authRoutes
│   ├── models/             # Car, User, Booking
│   └── controllers/        # Logic for CRUD and APIs
└── README.md

```

---

## 💡 Future Enhancements

- ✅ Add payment gateway integration (e.g. Razorpay, Stripe)
- ✅ Email/SMS booking confirmation system
- ⏳ Map integration for pickup & drop selection
- ⏳ Real-time booking availability check
- ⏳ Ratings & reviews per car
- ⏳ Multi-language support
- ⏳ Coupon system for discounts

---

## 🧪 Tech Summary (Backend Optional)
*(Note: Tech stack implementation is assumed based on standard MERN projects)*

| Area         | Tech Used               |
|--------------|-------------------------|
| Frontend     | React.js, Tailwind CSS  |
| Backend      | Node.js, Express.js     |
| Database     | MongoDB (with Mongoose) |
| Auth         | JWT / Session storage   |
| Hosting      | Vercel (Frontend)       |

---

## 👨‍💻 Author

**Abhisek Panda**  
- 🌍 Portfolio: [https://abhisekpanda072.vercel.app](https://abhisekpanda072.vercel.app)  
- 🐙 GitHub: [@abhisek2004](https://github.com/abhisek2004)  
- 💼 LinkedIn: [linkedin.com/in/abhisekpanda2004](https://linkedin.com/in/abhisekpanda2004)

---

## 📜 License

This project is open for educational use. Commercial usage should credit the author and should not reuse brand/trademarked car logos without permission.

---

## 🙌 Acknowledgements

- Inspired by platforms like Zoomcar, Revv, and MyChoize
- Vehicle data collected from public automobile portals
