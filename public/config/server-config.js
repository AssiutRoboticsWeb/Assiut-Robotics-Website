

// Server Configuration for Production Only
class ServerConfig {
    constructor() {
        this.baseUrl = 'https://assiut-robotics-server.vercel.app';
    }

    // Helper method to build full API URLs
    getApiUrl(endpoint) {
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
        return `${this.baseUrl}/${cleanEndpoint}`;
    }

    // Get the legacy server URL (for backward compatibility)
    getLegacyBaseUrl() {
        return 'https://assiut-robotics-zeta.vercel.app';
    }

    getLegacyApiUrl(endpoint) {
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
        return `${this.getLegacyBaseUrl()}/${cleanEndpoint}`;
    }

    // Log current configuration for debugging
    logConfig() {
        console.log('Server Configuration:', {
            environment: 'Production',
            baseUrl: this.baseUrl,
            legacyBaseUrl: this.getLegacyBaseUrl()
        });
    }
}

// Create global instance
window.serverConfig = new ServerConfig();
window.API_BASE_URL = window.serverConfig.baseUrl;

// Log configuration on load
window.serverConfig.logConfig();

// Export for use in other files (Node.js/CommonJS)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.serverConfig;
}
