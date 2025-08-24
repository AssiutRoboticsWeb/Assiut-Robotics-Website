# Server Configuration System

This document explains the new server configuration system that automatically detects the environment and uses the appropriate server URL for development and production.

## Overview

The server configuration system automatically detects whether the application is running in development or production environment and provides the appropriate server URL.

## How It Works

### Environment Detection
The system detects the environment by checking the `window.location.hostname`:
- **Development**: `localhost`, `127.0.0.1`, or any hostname containing `localhost`
- **Production**: Any other hostname

### Server URLs
- **Development**: `http://localhost:3000`
- **Production**: `https://assiut-robotics-server.vercel.app`

## Usage

### 1. Include the Configuration Script
Add the server configuration script to your HTML file before other scripts:

```html
<script src="../config/server-config.js"></script>
```

### 2. Use the Configuration in JavaScript
The global `serverConfig` object provides several methods:

```javascript
// Get the base URL for the current environment
const baseUrl = serverConfig.baseUrl;

// Build API URLs
const loginUrl = serverConfig.getApiUrl("members/login");
const verifyUrl = serverConfig.getApiUrl("members/verify");

// For legacy server (assiut-robotics-zeta.vercel.app)
const legacyUrl = serverConfig.getLegacyApiUrl("members/getAllMembers");

// Check current environment
if (serverConfig.isDevelopment) {
    console.log("Running in development mode");
} else {
    console.log("Running in production mode");
}

// Log current configuration for debugging
serverConfig.logConfig();
```

### 3. Example Usage

#### Before (Hardcoded URLs):
```javascript
const response = await fetch("https://assiut-robotics-server.vercel.app/members/login", {
    method: 'POST',
    body: data
});
```

#### After (Using Configuration):
```javascript
const response = await fetch(serverConfig.getApiUrl("members/login"), {
    method: 'POST',
    body: data
});
```

## Files Updated

The following files have been updated to use the new configuration system:

### Core Files
- `public/config/server-config.js` - Configuration system
- `public/login/appForLogin.js` - Login functionality
- `public/login/appForSignup.js` - Signup functionality
- `public/profile-page/app.js` - Profile page functionality
- `public/tracks/main.js` - Tracks functionality

### HTML Files
- `public/login/login.html` - Login page
- `public/login/signup.html` - Signup page
- `public/profile-page/index.html` - Profile page
- `public/tracks/index.html` - Tracks page

## Migration Guide

To update existing files that use hardcoded URLs:

1. **Add the configuration script** to the HTML file
2. **Replace hardcoded URLs** with `serverConfig.getApiUrl()` calls
3. **For legacy server URLs**, use `serverConfig.getLegacyApiUrl()`

### Common Patterns

#### Replace Production URLs:
```javascript
// Old
"https://assiut-robotics-server.vercel.app/members/login"

// New
serverConfig.getApiUrl("members/login")
```

#### Replace Legacy URLs:
```javascript
// Old
"https://assiut-robotics-zeta.vercel.app/members/getAllMembers"

// New
serverConfig.getLegacyApiUrl("members/getAllMembers")
```

## Benefits

1. **Automatic Environment Detection**: No need to manually change URLs
2. **Consistent Configuration**: All files use the same configuration
3. **Easy Maintenance**: Change server URLs in one place
4. **Development Friendly**: Automatically uses localhost in development
5. **Production Ready**: Automatically uses production URLs in production

## Troubleshooting

### Configuration Not Loading
- Ensure the script is included before other scripts that use it
- Check the browser console for any JavaScript errors

### Wrong Environment Detected
- Check that `window.location.hostname` is correct
- Verify the environment detection logic in `server-config.js`

### API Calls Failing
- Verify the server is running on the correct port (3000 for development)
- Check that the endpoint paths are correct
- Ensure the server configuration is loaded before making API calls

## Future Enhancements

- Add support for custom environment variables
- Add support for multiple production environments
- Add configuration validation
- Add support for different ports in development
