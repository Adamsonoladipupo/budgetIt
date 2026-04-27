# 💰 BudgetIt

![Java](https://img.shields.io/badge/Java-17%2B-blue)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Database](https://img.shields.io/badge/Database-SQL-lightgrey)
![License](https://img.shields.io/badge/License-Educational-yellow)

 A full-stack personal finance management application that helps users track their income, expenses, and overall financial health in real time.

---

## Features

- User Authentication (Sign Up / Sign In)
- Add Inflow (Income)
- Add Outflow (Expenses)
- Dashboard with:
  - Total Inflow
  - Total Outflow
  - Current Balance
  - Transaction History
- Delete Inflow & Outflow
- Responsive UI (Mobile Friendly)

---

## Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- MySQL

### Frontend
- React (Vite)
- CSS Modules
- Fetch API

---

## Project Structure

budgetIt/
│
├── backend/
│   ├── controllers
│   ├── services
│   ├── repositories
│   ├── models
│   └── dtos
│
├── frontend/
│   ├── pages
│   ├── components
│   ├── styles
│   └── assets

---

## Setup Instructions

### Backend Setup

1. Clone the repository:
   git clone https://github.com/your-username/budgetIt.git  
   cd budgetIt  

2. Configure MySQL in application.properties:
   spring.datasource.url=jdbc:mysql://localhost:3306/budgetit  
   spring.datasource.username=your_username  
   spring.datasource.password=your_password  
   spring.jpa.hibernate.ddl-auto=update  

3. Run the backend:
   mvn spring-boot:run  

Backend runs on:
http://localhost:8080  

---

### Frontend Setup

1. Navigate to frontend:
   cd frontend  

2. Install dependencies:
   npm install  

3. Run the frontend:
   npm run dev  

Frontend runs on:
http://localhost:5173  

---

## API Endpoints

### User
- POST /api/users/register → Register user  
- POST /api/users/login → Login user  

### Finance
- GET /api/finance/dashboard/full?email={email}  
- POST /api/finance/inflow  
- POST /api/finance/outflow  
- DELETE /api/finance/inflow/{id}?email={email}  
- DELETE /api/finance/outflow/{id}?email={email}  

---

## How It Works

- Users register and log in  
- Email is stored on frontend (localStorage)  
- Dashboard fetches user-specific data using email  
- Backend validates user before performing actions  
- Transactions dynamically update UI  

---

## Security Notes

- Passwords are encrypted using BCrypt  
- Spring Security is configured for API protection  
- CORS enabled for frontend-backend communication  

---

## UI Overview

- Sign Up Page  
- Sign In Page  
- Dashboard with financial summary and transaction history  

---

## Future Improvements

- JWT Authentication  
- Pagination for transactions  
- Charts & analytics  
- User profile settings  
- Deployment (AWS / Docker / Vercel)  

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## License

This project is open-source and available under the MIT License.

---

## Author

Built by Your Abdulwahab Adamson
