**Flight Booking System**
Overview
The Flight Booking System is a full-stack web application that allows users to search for flights, book flights, view their bookings, and manage them. Administrators have the ability to manage flights by adding and deleting them after logging into the admin panel.

The application is built using React for the frontend, Node.js and Express.js for the backend, and MongoDB Atlas for data storage.

Features
User Features
User Registration & Login: New users can register and log in to their accounts.
Flight Search: Search for available flights by selecting travel dates.
Filter Flights by Price: Sort flights based on price.
Flight Booking: Users can book flights after searching for available options.
View Bookings: Users can view their current and past flight bookings.
Cancel Bookings: Users can cancel any existing flight bookings.
Admin Features
Admin Registration & Login: Admins can register and log in to access the admin panel.
Flight Management: Admins can add new flights and delete existing flights.
Technologies Used
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB Atlas (NoSQL database)
Version Control: Git & GitHub
Installation
Prerequisites
Make sure you have the following installed:

Node.js (v14 or above)
MongoDB Atlas (for database)
Git
Setup Instructions
Clone the repository:


git clone https://github.com/mahmoodalisha/Flight-booking-system.git
cd Flight-booking-system
Install Backend Dependencies: Navigate to the backend folder and install the required dependencies:


npm install
Install Frontend Dependencies: Navigate to the frontend folder and install the dependencies:


cd ../frontend
npm install
Set Up Environment Variables: Create a .env file in the backend directory with the following variables:

env

MONGO_URI=<Your MongoDB Atlas connection string>
JWT_SECRET=<Your JWT secret key>
PORT=5000
Run the Application:

To run the backend, in the backend folder:
node index.js

npm start
To run the frontend, in the frontend folder:

bash
Copy code
npm start
Access the Application: Open your browser and navigate to http://localhost:3000 to access the frontend. The backend will run on http://localhost:5000.



Future Enhancements
Implement payment gateway for booking.
Add real-time notifications for booking confirmations.
Improve the UI/UX of the platform.
License
This project is licensed under the MIT License - see the LICENSE file for details.