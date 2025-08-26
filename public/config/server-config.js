// Server Configuration for Development and Production
class ServerConfig {
    constructor() {
        this.isDevelopment = this.detectEnvironment();
        this.baseUrl = this.getBaseUrl();
    }

    detectEnvironment() {
        // Check if we're running on localhost (development)
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname.includes('localhost');
    }

    getBaseUrl() {
        if (this.isDevelopment) {
            return 'https://staging-robotics-server.vercel.app';
        } else {
            // Production server URL
            return 'https://staging-robotics-server.vercel.app';
        }
    }

    // Helper method to build full API URLs
    getApiUrl(endpoint) {
        // Remove leading slash if present to avoid double slashes
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
        return `${this.baseUrl}/${cleanEndpoint}`;
    }

    // Get the legacy server URL (for backward compatibility)
    getLegacyBaseUrl() {
        if (this.isDevelopment) {
            return 'http://localhost:3000';
        } else {
            return 'https://staging-robotics-server.vercel.app';
        }
    }

    getLegacyApiUrl(endpoint) {
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
        return `${this.getLegacyBaseUrl()}/${cleanEndpoint}`;
    }

    // Log current configuration for debugging
    logConfig() {
        console.log('Server Configuration:', {
            environment: this.isDevelopment ? 'Development' : 'Production',
            baseUrl: this.baseUrl,
            legacyBaseUrl: this.getLegacyBaseUrl()
        });
    }
}

// Create global instance
const serverConfig = new ServerConfig();

// Log configuration on load
serverConfig.logConfig();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = serverConfig;
}
