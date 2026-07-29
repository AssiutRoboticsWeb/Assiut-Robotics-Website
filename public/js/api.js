/**
 * Centralized API Wrapper for Assiut Robotics Frontend
 * Handles fetching, auth tokens, and standard error handling.
 */
class ApiClient {
    constructor() {
        // Use the centralized server-config.js if available, otherwise fallback
        this.baseURL = (window.ServerConfig && window.ServerConfig.getAllUrls().baseUrl) 
            ? window.ServerConfig.getAllUrls().baseUrl + '/api'
            : 'http://localhost:3000/api';
    }

    /**
     * Gets the authorization token from localStorage.
     * Note: Access tokens should ideally be in HTTP-only cookies, 
     * but if frontend handles them, we grab them here.
     * Since Phase 3 put them in cookies, we just need to ensure `credentials: 'include'` is set.
     */
    get headers() {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        return headers;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        // Ensure credentials (cookies) are sent with every request
        const config = {
            ...options,
            headers: {
                ...this.headers,
                ...(options.headers || {})
            },
            credentials: 'include' // Important for HTTP-only cookies
        };

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                // If 401 Unauthorized, token might be expired. 
                // In a robust system, we would attempt a refresh token call here, 
                // but for now we redirect to login.
                if (response.status === 401 && !endpoint.includes('/auth/login')) {
                    window.location.href = '/login';
                }
                throw new Error(data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error(`[API Error] ${endpoint}:`, error.message);
            throw error;
        }
    }

    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    post(endpoint, body, options = {}) {
        const config = { ...options, method: 'POST' };
        
        // Handle FormData (like file uploads) separately
        if (body instanceof FormData) {
            config.body = body;
            // Remove Content-Type so browser sets boundary for multipart/form-data
            if (config.headers) {
                delete config.headers['Content-Type'];
            }
        } else {
            config.body = JSON.stringify(body);
        }

        return this.request(endpoint, config);
    }

    put(endpoint, body, options = {}) {
        return this.request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) });
    }

    delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'DELETE' });
    }
}

// Export singleton instance for use across the application
const api = new ApiClient();
window.api = api;
