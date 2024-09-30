Here’s a sample `README.md` file for your Node.js project, which includes instructions on how to set up and run the project, as well as an explanation of its features and API endpoints.

---

# School Contact and Admissions Assistance Application

This project is a Node.js backend application to manage contact details for schools, track student information, and assist them with the college admissions process. It provides an API to handle contacts, assign tasks to agents, and manage the data through an admin interface.

## Features

- Manage contact details for schools, students, and their guardians.
- Ensure no duplicate entries for contact details (based on school name, student name, father name, and phone number).
- Agent and admin roles for task assignments.
- Passwords are securely hashed before saving to the database.
- Exclude passwords from user data retrieval.
- Authentication and authorization for admin and agents.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)
- [Postman](https://www.postman.com/) (for API testing, optional)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/school-contact-admissions-app.git
cd school-contact-admissions-app
```

### 2. Install Dependencies

Run the following command to install all the necessary dependencies:

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root of the project and configure the following variables:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/your_database_name
JWT_SECRET=your_secret_key
```

- `PORT`: Port on which the app will run.
- `MONGO_URI`: MongoDB connection string. You can use a local MongoDB instance or a cloud service like MongoDB Atlas.
- `JWT_SECRET`: A secret key for signing JWT tokens for authentication.

### 4. Run the Project

Start the project by running the following command:

```bash
npm start
```

The app should now be running on `http://localhost:3000`.

### 5. API Endpoints

The following API endpoints are available:

#### 1. **Register a New User**

```http
POST /register
```

**Request Body:**

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin" // Can be "admin" or "agent"
}
```

**Response:**

```json
{
  "message": "User registered successfully"
}
```

#### 2. **Login**

```http
POST /login
```

**Request Body:**

```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "jwt_token_here"
}
```

#### 3. **Create a New Contact**

```http
POST /contacts
```

**Request Body:**

```json
{
  "schoolName": "Springfield High School",
  "studentName": "John Doe",
  "fatherName": "Mr. Doe",
  "phoneNumber": "123-456-7890",
  "callStatus": "pending",
  "notes": "Follow up next week.",
  "assignedTo": "60c72b2f5f1b2c001c123456" // Replace with a valid ObjectId from the User collection
}
```

**Response:**

```json
{
    "message": "Contact created successfully",
    "contact": { ...contactDetails }
}
```

#### 4. **Get All Contacts**

```http
GET /contacts
```

**Response:**

```json
[
  {
    "_id": "60c72b2f5f1b2c001c123457",
    "schoolName": "Springfield High School",
    "studentName": "John Doe",
    "fatherName": "Mr. Doe",
    "phoneNumber": "123-456-7890",
    "callStatus": "pending",
    "notes": "Follow up next week.",
    "assignedTo": "60c72b2f5f1b2c001c123456",
    "createdAt": "2024-09-30T12:34:56.789Z",
    "updatedAt": "2024-09-30T12:34:56.789Z"
  }
]
```

#### 5. **Update a Contact**

```http
PUT /contacts/:id
```

**Request Body:**

```json
{
  "callStatus": "called",
  "notes": "Spoke with the parent, they are interested."
}
```

**Response:**

```json
{
  "message": "Contact updated successfully"
}
```

#### 6. **Delete a Contact**

```http
DELETE /contacts/:id
```

**Response:**

```json
{
  "message": "Contact deleted successfully"
}
```

### 6. Securing Passwords

When registering a user, passwords are hashed using `bcrypt` before being saved to the database. Passwords are not returned when fetching user data.

### 7. Error Handling

- If a duplicate contact (based on `schoolName`, `studentName`, `fatherName`, and `phoneNumber`) is found, an error response will be returned:

  ```json
  {
    "message": "Contact already exists with the provided details."
  }
  ```

- If a user tries to register with an email that is already in use, an error response will be returned:
  ```json
  {
    "message": "Email already in use."
  }
  ```

### 8. Project Structure

```bash
school-contact-admissions-app/
├── models/
│   └── Contact.js    # Mongoose schema for Contact
│   └── User.js       # Mongoose schema for User
├── routes/
│   └── contactRoutes.js  # API routes for managing contacts
│   └── authRoutes.js     # API routes for authentication and user management
├── .env              # Environment variables
├── .gitignore        # Files to be ignored by Git
├── server.js         # Entry point to start the application
└── README.md         # Project documentation
```

### 9. Development Notes

- Make sure MongoDB is running locally or use a MongoDB Atlas connection string in the `.env` file.
- Use Postman or cURL for testing the API endpoints.
- JWT tokens are used for authentication.

### 10. License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

### Summary

This `README.md` file provides a detailed guide to setting up, running, and interacting with the backend of your project. It covers all the basic setup steps, including installing dependencies, configuring environment variables, and testing the API endpoints.
