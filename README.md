# Assiut Robotics Website

This project contains the web presence for Assiut Robotics. It is a Node.js application utilizing Express to serve static content.

## 📂 Project Structure

This repository currently houses two distinct site structures:
1.  **Root**: Contains an "Eid Adha" landing page (`index.html`, `style.css`, `main.js`).
2.  **`public/`**: Contains the main legacy website resources.

> **Note**: The current server configuration (`index.js`) serves the `public/` directory by default.

## 🚀 Prerequisites

- **Node.js**: Version 22.0.0 or higher is recommended (based on `package.json`).
- **NPM**: Comes with Node.js.

## 🛠️ Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  **Security Setup**:
    - Copy the example environment file:
      ```bash
      cp .env.example .env
      ```
    - Edit `.env` and add your Facebook API tokens.
    - **WARNING**: Do not commit `.env` to version control.

## 🏃 Running the Project

### Development
Runs the server with `nodemon` for auto-restarts on file changes:
```bash
npm run dev
```

### Production
Runs the server using standard node:
```bash
npm start
```

Server behaves as follows:
- Listens on `http://localhost:5000`
- Serves static files from the `public/` directory.

## 🔍 Troubleshooting

- **I see the old site, not the Eid page**: Move the files from the root directory (`index.html`, `style.css`, etc.) into `public/` to make them visible.
- **"Module not found"**: Ensure you ran `npm install`.
- **Facebook API Errors**: Check that your `.env` file has valid, unexpired tokens.

## 🛡️ Security Audit

A technical audit was performed on this project. Please refer to [AUDIT_REPORT.md](./AUDIT_REPORT.md) for details on fixed vulnerabilities and recommended next steps.
