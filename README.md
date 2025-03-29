# Global-intern
This is a simple user management application built with React, Redux Toolkit, and TailwindCSS. It allows users to log in, view a list of users, edit, delete, and add new users. The backend API is provided by Reqres.

🚀 Features

User authentication (Login using Reqres API)

Fetch and display paginated users

Add new users

Edit existing user details

Delete users

Toast notifications for feedback

🛠️ Setup & Installation

1️⃣ Clone the repository

 git clone https://github.com/your-repo/reqres-user-management.git
 cd reqres-user-management

2️⃣ Install dependencies

 npm install

3️⃣ Start the development server

 npm start

The app will be available at http://localhost:3000

🔑 Authentication Details

Since this project uses a mock API, use these credentials to log in:

Email: eve.holt@reqres.in

Password: cityslicka

Once logged in, an auth token is stored in localStorage, and users are redirected to the Users Page.

📂 Project Structure

reqres-user-management
│── src
│   ├── components    # Reusable UI components
│   ├── pages         # Main pages (Login, Users)
│   ├── redux        # Redux store & slices
│   ├── api.js       # API calls
│   ├── App.js       # Main App component
│   ├── index.js     # Entry point
│   ├── store.js     # Redux store configuration
│── public           # Static files
│── package.json     # Dependencies and scripts
│── README.md        # This file 😃

🔍 Assumptions & Considerations

This app is a frontend-only project using Reqres API as a fake backend.

User data is not persisted on the backend since Reqres does not store changes.

Redux Toolkit is used for state management, but the app could work with local component state.

Error handling is minimal for simplicity but can be improved.

🏗️ Future Improvements

Implement proper form validation

Improve error handling and UI feedback

Add user authentication persistence across refreshes

