# API Configuration System

This directory contains the API configuration system that allows the application to switch between development and production environments automatically.

## Files

- `api-config.js` - Main configuration file that manages API endpoints
- `dev-helper.js` - Development utilities for switching environments
- `include-api-config.js` - Helper script for including configuration in HTML files

## How It Works

The system automatically detects the environment based on:
1. Hostname (localhost/127.0.0.1 = development)
2. Hostname containing 'dev' or 'staging' = development
3. localStorage flag `DEV_MODE` = 'true' (manual override)

## Environment Detection

### Development Environment
- `localhost` or `127.0.0.1`
- Hostname containing 'dev' or 'staging'
- `localStorage.setItem('DEV_MODE', 'true')`

### Production Environment
- All other hostnames
- `localStorage.setItem('DEV_MODE', 'false')` or remove the flag

## API Endpoints

### Development URLs (Default)
- Main API: `http://localhost:3000`
- Server API: `http://localhost:3001`
- Electrical API: `http://localhost:3002`
- Legacy API: `http://localhost:3003`

### Production URLs
- Main API: `https://assiut-robotics-zeta.vercel.app`
- Server API: `https://assiut-robotics-server.vercel.app`
- Electrical API: `https://tempbackendelectrical-production.up.railway.app`
- Legacy API: `https://assiutrobotics-production.up.railway.app`

## Usage

### In JavaScript Files
```javascript
// Get specific API endpoints
const membersUrl = APIConfig.getMembersEndpoint('/login');
const tracksUrl = APIConfig.getTracksEndpoint('/getAllTracks');
const componentsUrl = APIConfig.getComponentsEndpoint('/getComponents');

// Get base URLs
const mainApi = APIConfig.getMainAPI();
const serverApi = APIConfig.getServerAPI();
```

### Manual Environment Switching
```javascript
// Switch to development
APIConfig.setEnvironment('development');

// Switch to production
APIConfig.setEnvironment('production');

// Check current environment
console.log(APIConfig.getCurrentEnvironment());
```

### Development Helper
When running in development mode, a floating dev panel appears with:
- Current environment display
- Quick switch buttons (Dev/Prod)
- Show current API URLs
- Hide/show panel

**Keyboard Shortcut**: `Ctrl+Shift+D` to toggle the dev panel

## Including in HTML Files

Add this script tag before any JavaScript that uses APIConfig:

```html
<script src="config/api-config.js"></script>
```

For development features, also include:
```html
<script src="config/dev-helper.js"></script>
```

## Configuration

To modify the development URLs, edit the `api-config.js` file:

```javascript
development: {
    mainAPI: "http://localhost:3000", // Your dev server
    serverAPI: "http://localhost:3001", // Your dev server
    electricalAPI: "http://localhost:3002", // Your dev electrical API
    legacyAPI: "http://localhost:3003" // Your dev legacy API
}
```

## Migration Notes

All hardcoded API URLs in the codebase have been replaced with calls to the APIConfig system. The system provides fallback to production URLs if the configuration fails to load.

## Troubleshooting

1. **APIConfig is undefined**: Make sure `api-config.js` is loaded before any scripts that use it
2. **Wrong environment detected**: Use `localStorage.setItem('DEV_MODE', 'true')` to force development mode
3. **API calls failing**: Check the browser console for the current API URLs using the dev panel
