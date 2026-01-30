// Development Helper Script
// This script provides utilities for switching between development and production environments

class DevHelper {
    constructor() {
        this.init();
    }

    init() {
        // Add development controls to the page if in development mode
        if (this.isDevelopment()) {
            this.addDevControls();
        }
    }

    isDevelopment() {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1' ||
               window.location.hostname.includes('dev') ||
               localStorage.getItem('DEV_MODE') === 'true';
    }

    addDevControls() {
        // Create a floating development panel
        const devPanel = document.createElement('div');
        devPanel.id = 'dev-panel';
        devPanel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: #333;
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;

        devPanel.innerHTML = `
            <div style="margin-bottom: 10px;">
                <strong>Dev Panel</strong>
            </div>
            <div style="margin-bottom: 5px;">
                Environment: <span id="current-env">${ServerConfig.getCurrentEnvironment()}</span>
            </div>
            <div style="margin-bottom: 10px;">
                <button onclick="DevHelper.switchEnvironment('development')" style="margin-right: 5px; padding: 2px 5px; font-size: 10px;">Dev</button>
                <button onclick="DevHelper.switchEnvironment('production')" style="padding: 2px 5px; font-size: 10px;">Prod</button>
            </div>
            <div style="margin-bottom: 5px;">
                <button onclick="DevHelper.showApiUrls()" style="padding: 2px 5px; font-size: 10px; width: 100%;">Show URLs</button>
            </div>
            <div>
                <button onclick="DevHelper.hidePanel()" style="padding: 2px 5px; font-size: 10px; width: 100%;">Hide</button>
            </div>
        `;

        document.body.appendChild(devPanel);
    }

    static switchEnvironment(env) {
        if (ServerConfig) {
            ServerConfig.setEnvironment(env);
            document.getElementById('current-env').textContent = env;
            console.log(`Switched to ${env} environment`);
            
            // Show notification
            this.showNotification(`Switched to ${env} environment`);
        }
    }

    static showApiUrls() {
        if (ServerConfig) {
            const urls = {
                'Main API': ServerConfig.getMainAPI(),
                'Server API': ServerConfig.getServerAPI(),
                'Electrical API': ServerConfig.getElectricalAPI(),
                'Legacy API': ServerConfig.getLegacyAPI()
            };

            console.log('Current API URLs:', urls);
            
            // Create a modal to show URLs
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10001;
            `;

            modal.innerHTML = `
                <div style="background: white; padding: 20px; border-radius: 5px; max-width: 500px; max-height: 80%; overflow-y: auto;">
                    <h3>Current API URLs</h3>
                    <pre style="background: #f5f5f5; padding: 10px; border-radius: 3px; font-size: 12px;">${JSON.stringify(urls, null, 2)}</pre>
                    <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 10px; padding: 5px 10px;">Close</button>
                </div>
            `;

            document.body.appendChild(modal);
        }
    }

    static hidePanel() {
        const panel = document.getElementById('dev-panel');
        if (panel) {
            panel.style.display = 'none';
        }
    }

    static showPanel() {
        const panel = document.getElementById('dev-panel');
        if (panel) {
            panel.style.display = 'block';
        }
    }

    static showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10002;
            font-family: monospace;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
}

// Initialize the dev helper when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (typeof ServerConfig !== 'undefined') {
        window.DevHelper = new DevHelper();
    } else {
        // Wait for ServerConfig to load
        const checkServerConfig = setInterval(() => {
            if (typeof ServerConfig !== 'undefined') {
                window.DevHelper = new DevHelper();
                clearInterval(checkServerConfig);
            }
        }, 100);
    }
});

// Add keyboard shortcut to toggle dev panel (Ctrl+Shift+D)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        if (window.DevHelper) {
            const panel = document.getElementById('dev-panel');
            if (panel) {
                panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            }
        }
    }
});
