# SPA Reservation Management System

A dynamic Single Page Application (SPA) designed to manage workplace and space reservations efficiently. The system features a role-based interface separating standard Users from Administrators, complete with live data binding and persistent storage.

---

##  Getting Started

Follow these simple steps to set up the environment and launch the project locally.

### 1. Install Dependencies
Open your terminal in the project root folder and install the required node modules:
```bash
npm install
```

### 2. Run the Project
This project uses `concurrently` to launch both the frontend client and the mock database server simultaneously with a single command:
```bash
npm run dev
```
>  **Note:** Running `npm run dev` will boot up the Vite development server (usually on port `5173`) and the JSON Server database (on port `3000` or `3001`).

---

##  Project Structure

Here is the file organization of the repository:

```text
PERFORMANCETESTJS-PDM3-C5/
├── node_modules/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/
│   │   └── http.js                 # Centralized Fetch wrapper (GET, POST, PATCH, DELETE)
│   ├── assets/
│   ├── components/
│   │   ├── ReservationCard.js      # Dynamic HTML template for reservation cards
│   │   └── Sidebar.js              # Navigation sidebar component
│   ├── controllers/
│   │   ├── home.controller.js      # Main logic for reservation handling, approval, and deletion
│   │   └── login.controller.js     # User authentication handling
│   ├── router/
│   │   └── router.js               # Client-side SPA routing logic
│   ├── services/
│   │   └── reservation.service.js  # Dedicated API services for reservation endpoints
│   ├── views/
│   │   ├── homeView.js             # Main dashboard view shell
│   │   ├── loginView.js            # Authentication view shell
│   │   └── notFoundView.js         # 404 Error page view shell
│   ├── main.js                     # Application entry point
│   ├── style.css                   # Tailwind and global styles config
│   └── utils.js                    # Session handling and storage helper functions
├── db.json                         # Local mock database (Users and Reservations JSON data)
├── index.html                      # Main HTML entry document
├── package.json                    # Project metadata, dependencies, and script definitions
├── README.md                       # Project documentation
└── vite.config.js                  # Vite bundler configuration
```

---

##  Key Features Built-in

* **Role-Based Views**: Standard users can only view, create, and dismiss their own bookings from their panel. Administrators gain full visibility over all system reservations.
* **Smart CRUD & State Management**: 
  * New bookings are automatically assigned to the logged-in user ID with a default status of `"Pendiente"`.
  * Real-time DOM elements are generated on-the-fly preventing `undefined` metadata fields.
* **Admin Approval Process**: Administrators receive an exclusive green **"Aprobar"** button on pending cards. Clicking it triggers an asynchronous `PATCH` request to update the record to `"Aprobado"` instantly without a full page reload.
* **Persistent Deletion**: The system uses targeted event listeners linked to unique card `data-id` parameters to execute asynchronous REST `DELETE` operations directly against `db.json`.

---

## Test Credentials

You can use the following mock accounts pre-configured in the database to test the distinct workflows:

### Administrator Account
* **Email:** `admin@test.com`
* **Password:** `123456`

### Standard User Account
* **Email:** `user@test.com`
* **Password:** `123456`
