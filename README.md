# Chronos Attendance System Web Application

**Chronos Attendance System Web Application** is a web-based attendance system developed using React.js and Chakra UI. This repository contains the client-side code, while the server-side code can be found at [this link](https://github.com/gifariarsal/chronos_server). The application uses MySQL as its database.

## How to Use

Here are the steps to use this code:

### Prerequisites
Make sure you have Node.js and npm (Node Package Manager) installed on your system before proceeding.

### Step 1: Clone the Repository
Clone this repository to your local system by running the following command in your terminal or command prompt:

```bash
git clone https://github.com/gifariarsal/chronos_client.git
```

### Step 2: Install Dependencies
Navigate to the newly created repository directory and install all the dependencies by running the following command:

```bash
cd chronos_client
npm install
```

Step 3: Set Up Communication with the Server
The client-side application communicates with the server-side application through API endpoints provided by the server. Ensure that the server-side application (located at Chronos Server repository) is properly set up and running, so the client-side application can interact with it seamlessly.

For any database-related configurations or manipulations, please refer to the server-side documentation and server repository. Any adjustments regarding database connections and data processing should be made on the server-side code (src/config/config.js in the server repository) rather than the client-side code.

### Step 4: Run the Application
After configuring the database, run the application with the following command:

```bash
npm start
```

The application will run at `http://localhost:3000`. Open your web browser and access this address to use the Chronos Attendance System.

### Additional Notes
Ensure that your MySQL server is running and accessible by this application. If you encounter any difficulties or issues, please refer to the MySQL documentation or check this project's documentation for further assistance.

Feel free to ask questions or report issues via [Issues](https://github.com/gifariarsal/chronos_client/issues) if you need additional help.

Enjoy using the Chronos Attendance System Web Application!