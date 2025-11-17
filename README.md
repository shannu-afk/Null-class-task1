# Firebase Auth 
A React application demonstrating Firebase Authentication with Firestore integration for a stock portfolio and watchlist dashboard.

## Features

- User authentication (login/signup) with Firebase Auth
- Protected dashboard with portfolio and watchlist management
- Real-time data storage using Firestore
- Modern UI with Tailwind CSS
- Responsive design

## Tech Stack

- **Frontend:** React 18, React Router DOM
- **Backend:** Firebase (Auth, Firestore)
- **Styling:** Tailwind CSS
- **Build Tool:** Create React App

## Prerequisites

- Node.js (v14 or higher)
- Firebase project with Authentication and Firestore enabled

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shannu-afk/Null-class-task1
   cd firebase-auth-full-example
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase environment variables:
   Create a `.env` file in the root directory with your Firebase config:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. Configure Firestore security rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

## Usage

1. Start the development server:
   ```bash
   npm start
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

3. Sign up for a new account or log in with existing credentials.

4. Access the dashboard to manage your stock portfolio and watchlist.

## Project Structure

```
src/
├── components/
│   ├── Portfolio.js      # Portfolio management component
│   └── Watchlist.js      # Watchlist management component
├── context/
│   └── AuthContext.js    # Authentication context provider
├── hooks/
│   └── useAuth.js        # Custom hook for auth state
├── pages/
│   ├── Dashboard.js      # Main dashboard page
│   └── Login.js          # Login/signup page
├── services/
│   └── firestore.js      # Firestore service functions
├── App.js                # Main app component
├── firebase.js           # Firebase configuration
└── index.js              # App entry point
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
