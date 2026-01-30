// Centralized Server Configuration
// This is the single source of truth for all API endpoints
// Edit only this file to change API URLs across the entire application

class ServerConfig {
    constructor() {
        this.environment = this.detectEnvironment();
        this.configs = this.getConfigurations();
    }

    detectEnvironment() {
        // Check if we're in development mode
        const hostname = window.location.hostname;
        const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
        const isDevelopment = hostname.includes('dev') || hostname.includes('staging');
        
        // Check for development flag in localStorage (for manual override)
        const devFlag = localStorage.getItem('DEV_MODE') === 'true';
        
        return (isLocalhost || isDevelopment || devFlag) ? 'development' : 'production';
    }

    getConfigurations() {
        return {
            development: {
                // ===== MAIN SERVER ENDPOINTS =====
                baseUrl: "http://localhost:3000",
                
                // ===== MEMBERS API =====
                members: {
                    base: "http://localhost:3000/members",
                    login: "http://localhost:3000/members/login",
                    register: "http://localhost:3000/members/register",
                    verify: "http://localhost:3000/members/verify",
                    getAllMembers: "http://localhost:3000/members/getAllMembers",
                    getMembersByCommittee: "http://localhost:3000/members/get",
                    changeProfileImage: "http://localhost:3000/members/changeProfileImage",
                    submitTask: "http://localhost:3000/members/submitTask",
                    submitMemberTask: "http://localhost:3000/members/submitMemberTask",
                    confirm: "http://localhost:3000/members/confirm",
                    changeHead: "http://localhost:3000/members/changeHead",
                    changeVice: "http://localhost:3000/members/changeVice",
                    addTask: "http://localhost:3000/members",
                    editTask: "http://localhost:3000/members",
                    deleteTask: "http://localhost:3000/members",
                    rateTask: "http://localhost:3000/members/members",
                    updateTasksEvaluation: "http://localhost:3000/members/update-tasks-evaluation",
                    sendFeedBackEmail: "http://localhost:3000/members/sendFeedBackEmail"
                },

                // ===== TRACKS API =====
                tracks: {
                    base: "http://localhost:3001/tracks",
                    getAllTracks: "http://localhost:3001/tracks",
                    getCourses: "http://localhost:3001/tracks",
                    submissions: "http://localhost:3001/submissions"
                },

                // ===== COMPONENTS API =====
                components: {
                    base: "http://localhost:3001/components",
                    getComponents: "http://localhost:3001/components/getComponents",
                    add: "http://localhost:3001/components/add",
                    update: "http://localhost:3001/components/update",
                    deleteOne: "http://localhost:3001/components/deleteOne",
                    deleteAll: "http://localhost:3001/components/deleteAll",
                    requestToBorrow: "http://localhost:3001/components/requestToBorrow",
                    getRequestedComponent: "http://localhost:3001/components/getRequestedComponent",
                    acceptRequestToBorrow: "http://localhost:3001/components/acceptRequestToBorrow",
                    rejectRequestToBorrow: "http://localhost:3001/components/rejectRequestToBorrow",
                    getBorrowedComponent: "http://localhost:3001/components/getBorrowedComponent",
                    return: "http://localhost:3001/components/return"
                },

                // ===== ELECTRICAL API =====
                electrical: {
                    base: "http://localhost:3002/api",
                    data: "http://localhost:3002/api/data",
                    getAllTracks: "http://localhost:3002/api/electric/getAllTracks"
                },

                // ===== GUEST & VISITOR API =====
                guest: {
                    base: "http://localhost:3000/guest"
                },
                visitor: {
                    base: "http://localhost:3000/visitor"
                },

                // ===== MEETING API =====
                meeting: {
                    base: "http://localhost:3000/meeting",
                    book: "http://localhost:3000/meeting"
                },

                // ===== LAB DATES API =====
                lapDates: {
                    base: "http://localhost:3000/lapDates"
                },

                // ===== LEGACY API =====
                legacy: {
                    base: "http://localhost:3003",
                    getAllMembers: "http://localhost:3003/members/getAllMembers",
                    rate: "http://localhost:3003/members/rate"
                }
            },

            production: {
                // ===== MAIN SERVER ENDPOINTS =====
                baseUrl: "https://assiut-robotics-zeta.vercel.app",
                
                // ===== MEMBERS API =====
                members: {
                    base: "https://assiut-robotics-zeta.vercel.app/members",
                    login: "https://assiut-robotics-zeta.vercel.app/members/login",
                    register: "https://assiut-robotics-server.vercel.app/members/register",
                    verify: "https://assiut-robotics-zeta.vercel.app/members/verify",
                    getAllMembers: "https://assiut-robotics-zeta.vercel.app/members/getAllMembers",
                    getMembersByCommittee: "https://assiut-robotics-zeta.vercel.app/members/get",
                    changeProfileImage: "https://assiut-robotics-zeta.vercel.app/members/changeProfileImage",
                    submitTask: "https://assiut-robotics-zeta.vercel.app/members/submitTask",
                    submitMemberTask: "https://assiut-robotics-zeta.vercel.app/members/submitMemberTask",
                    confirm: "https://assiut-robotics-zeta.vercel.app/members/confirm",
                    changeHead: "https://assiut-robotics-zeta.vercel.app/members/changeHead",
                    changeVice: "https://assiut-robotics-server.vercel.app/members/changeVice",
                    addTask: "https://assiut-robotics-zeta.vercel.app/members",
                    editTask: "https://assiut-robotics-zeta.vercel.app/members",
                    deleteTask: "https://assiut-robotics-zeta.vercel.app/members",
                    rateTask: "https://assiut-robotics-zeta.vercel.app/members/members",
                    updateTasksEvaluation: "https://assiut-robotics-zeta.vercel.app/members/update-tasks-evaluation",
                    sendFeedBackEmail: "https://assiut-robotics-zeta.vercel.app/members/sendFeedBackEmail"
                },

                // ===== TRACKS API =====
                tracks: {
                    base: "https://assiut-robotics-server.vercel.app/tracks",
                    getAllTracks: "https://assiut-robotics-server.vercel.app/tracks",
                    getCourses: "https://assiut-robotics-server.vercel.app/tracks",
                    submissions: "https://assiut-robotics-server.vercel.app/submissions"
                },

                // ===== COMPONENTS API =====
                components: {
                    base: "https://assiut-robotics-server.vercel.app/components",
                    getComponents: "https://assiut-robotics-server.vercel.app/components/getComponents",
                    add: "https://assiut-robotics-server.vercel.app/components/add",
                    update: "https://assiut-robotics-server.vercel.app/components/update",
                    deleteOne: "https://assiut-robotics-server.vercel.app/components/deleteOne",
                    deleteAll: "https://assiut-robotics-server.vercel.app/components/deleteAll",
                    requestToBorrow: "https://assiut-robotics-server.vercel.app/components/requestToBorrow",
                    getRequestedComponent: "https://assiut-robotics-server.vercel.app/components/getRequestedComponent",
                    acceptRequestToBorrow: "https://assiut-robotics-server.vercel.app/components/acceptRequestToBorrow",
                    rejectRequestToBorrow: "https://assiut-robotics-server.vercel.app/components/rejectRequestToBorrow",
                    getBorrowedComponent: "https://assiut-robotics-server.vercel.app/components/getBorrowedComponent",
                    return: "https://assiut-robotics-zeta.vercel.app/components/return"
                },

                // ===== ELECTRICAL API =====
                electrical: {
                    base: "https://tempbackendelectrical-production.up.railway.app/api",
                    data: "https://tempbackendelectrical-production.up.railway.app/api/data",
                    getAllTracks: "https://tempbackendelectrical-production.up.railway.app/api/electric/getAllTracks"
                },

                // ===== GUEST & VISITOR API =====
                guest: {
                    base: "https://assiut-robotics-zeta.vercel.app/guest"
                },
                visitor: {
                    base: "https://assiut-robotics-zeta.vercel.app/visitor"
                },

                // ===== MEETING API =====
                meeting: {
                    base: "https://assiut-robotics-zeta.vercel.app/meeting",
                    book: "https://assiut-robotics-zeta.vercel.app/meeting"
                },

                // ===== LAB DATES API =====
                lapDates: {
                    base: "https://assiut-robotics-zeta.vercel.app/lapDates"
                },

                // ===== LEGACY API =====
                legacy: {
                    base: "https://assiutrobotics-production.up.railway.app",
                    getAllMembers: "https://assiutrobotics-production.up.railway.app/members/getAllMembers",
                    rate: "https://assiutrobotics-production.up.railway.app/members/rate"
                }
            }
        };
    }

    // ===== MAIN API FUNCTIONS =====
    // These are the only functions you need to use throughout the application

    getMembersAPI(endpoint = '') {
        const baseUrl = this.configs[this.environment].members.base;
        return endpoint ? `${baseUrl}${endpoint}` : baseUrl;
    }

    getTracksAPI(endpoint = '') {
        const baseUrl = this.configs[this.environment].tracks.base;
        return endpoint ? `${baseUrl}${endpoint}` : baseUrl;
    }

    getComponentsAPI(endpoint = '') {
        const baseUrl = this.configs[this.environment].components.base;
        return endpoint ? `${baseUrl}${endpoint}` : baseUrl;
    }

    getElectricalAPI(endpoint = '') {
        const baseUrl = this.configs[this.environment].electrical.base;
        return endpoint ? `${baseUrl}${endpoint}` : baseUrl;
    }

    getGuestAPI(endpoint = '') {
        const baseUrl = this.configs[this.environment].guest.base;
        return endpoint ? `${baseUrl}${endpoint}` : baseUrl;
    }

    getVisitorAPI(endpoint = '') {
        const baseUrl = this.configs[this.environment].visitor.base;
        return endpoint ? `${baseUrl}${endpoint}` : baseUrl;
    }

    getMeetingAPI(endpoint = '') {
        const baseUrl = this.configs[this.environment].meeting.base;
        return endpoint ? `${baseUrl}${endpoint}` : baseUrl;
    }

    getLapDatesAPI(endpoint = '') {
        const baseUrl = this.configs[this.environment].lapDates.base;
        return endpoint ? `${baseUrl}${endpoint}` : baseUrl;
    }

    getLegacyAPI(endpoint = '') {
        const baseUrl = this.configs[this.environment].legacy.base;
        return endpoint ? `${baseUrl}${endpoint}` : baseUrl;
    }

    // ===== SPECIFIC ENDPOINT FUNCTIONS =====
    // These functions return the exact URLs for specific endpoints

    // Members endpoints
    getMembersLogin() { return this.configs[this.environment].members.login; }
    getMembersRegister() { return this.configs[this.environment].members.register; }
    getMembersVerify() { return this.configs[this.environment].members.verify; }
    getMembersGetAll() { return this.configs[this.environment].members.getAllMembers; }
    getMembersByCommittee(committee) { return `${this.configs[this.environment].members.getMembersByCommittee}/${committee}`; }
    getMembersChangeProfile() { return this.configs[this.environment].members.changeProfileImage; }
    getMembersSubmitTask() { return this.configs[this.environment].members.submitTask; }
    getMembersSubmitMemberTask(taskId) { return `${this.configs[this.environment].members.submitMemberTask}/${taskId}`; }
    getMembersConfirm() { return this.configs[this.environment].members.confirm; }
    getMembersChangeHead() { return this.configs[this.environment].members.changeHead; }
    getMembersChangeVice() { return this.configs[this.environment].members.changeVice; }
    getMembersAddTask(memberId) { return `${this.configs[this.environment].members.addTask}/${memberId}/addTask`; }
    getMembersEditTask(memberId, taskId) { return `${this.configs[this.environment].members.editTask}/${memberId}/editTask/${taskId}`; }
    getMembersDeleteTask(memberId, taskId) { return `${this.configs[this.environment].members.deleteTask}/${memberId}/deleteTask/${taskId}`; }
    getMembersRateTask(memberId, taskId) { return `${this.configs[this.environment].members.rateTask}/${memberId}/rateTask/${taskId}`; }
    getMembersUpdateTasksEvaluation() { return this.configs[this.environment].members.updateTasksEvaluation; }
    getMembersSendFeedback(memberId) { return `${this.configs[this.environment].members.sendFeedBackEmail}/${memberId}`; }

    // Tracks endpoints
    getTracksGetAll() { return this.configs[this.environment].tracks.getAllTracks; }
    getTracksGetCourses(trackId) { return `${this.configs[this.environment].tracks.getCourses}/${trackId}/courses`; }
    getTracksSubmissions() { return this.configs[this.environment].tracks.submissions; }

    // Components endpoints
    getComponentsGetAll() { return this.configs[this.environment].components.getComponents; }
    getComponentsAdd() { return this.configs[this.environment].components.add; }
    getComponentsUpdate() { return this.configs[this.environment].components.update; }
    getComponentsDeleteOne() { return this.configs[this.environment].components.deleteOne; }
    getComponentsDeleteAll() { return this.configs[this.environment].components.deleteAll; }
    getComponentsRequestToBorrow() { return this.configs[this.environment].components.requestToBorrow; }
    getComponentsGetRequested() { return this.configs[this.environment].components.getRequestedComponent; }
    getComponentsAcceptRequest() { return this.configs[this.environment].components.acceptRequestToBorrow; }
    getComponentsRejectRequest() { return this.configs[this.environment].components.rejectRequestToBorrow; }
    getComponentsGetBorrowed() { return this.configs[this.environment].components.getBorrowedComponent; }
    getComponentsReturn() { return this.configs[this.environment].components.return; }

    // Electrical endpoints
    getElectricalData() { return this.configs[this.environment].electrical.data; }
    getElectricalGetAllTracks() { return this.configs[this.environment].electrical.getAllTracks; }

    // Guest & Visitor endpoints
    getGuestBase() { return this.configs[this.environment].guest.base; }
    getVisitorBase() { return this.configs[this.environment].visitor.base; }

    // Meeting endpoints
    getMeetingBase() { return this.configs[this.environment].meeting.base; }
    getMeetingBook(meetingId) { return `${this.configs[this.environment].meeting.book}/${meetingId}/book`; }

    // Lab Dates endpoints
    getLapDatesBase() { return this.configs[this.environment].lapDates.base; }

    // Legacy endpoints
    getLegacyGetAllMembers() { return this.configs[this.environment].legacy.getAllMembers; }
    getLegacyRate() { return this.configs[this.environment].legacy.rate; }

    // ===== UTILITY FUNCTIONS =====

    getCurrentEnvironment() {
        return this.environment;
    }

    setEnvironment(env) {
        if (this.configs[env]) {
            this.environment = env;
            localStorage.setItem('DEV_MODE', env === 'development');
            console.log(`Environment switched to: ${env}`);
        }
    }

    getAllUrls() {
        return this.configs[this.environment];
    }

    // ===== BACKWARD COMPATIBILITY =====
    // These functions maintain compatibility with the old APIConfig system

    getMainAPI() { return this.configs[this.environment].baseUrl; }
    getServerAPI() { return this.configs[this.environment].tracks.base.replace('/tracks', ''); }
    getElectricalAPI() { return this.configs[this.environment].electrical.base.replace('/api', ''); }
    getLegacyAPI() { return this.configs[this.environment].legacy.base; }

    getMembersEndpoint(path = '') { return this.getMembersAPI(path); }
    getTracksEndpoint(path = '') { return this.getTracksAPI(path); }
    getComponentsEndpoint(path = '') { return this.getComponentsAPI(path); }
    getElectricalEndpoint(path = '') { return this.getElectricalAPI(path); }
    getGuestEndpoint(path = '') { return this.getGuestAPI(path); }
    getVisitorEndpoint(path = '') { return this.getVisitorAPI(path); }
    getMeetingEndpoint(path = '') { return this.getMeetingAPI(path); }
    getLapDatesEndpoint(path = '') { return this.getLapDatesAPI(path); }
}

// Create global instance
try {
    window.ServerConfig = new ServerConfig();
    console.log('ServerConfig loaded successfully');
    console.log('Current environment:', window.ServerConfig.getCurrentEnvironment());
    console.log('Available functions:', Object.getOwnPropertyNames(ServerConfig.prototype).filter(name => name.startsWith('get')));
} catch (error) {
    console.error('Error creating ServerConfig:', error);
    // Fallback configuration
    window.ServerConfig = {
        getMembersLogin: () => "https://assiut-robotics-zeta.vercel.app/members/login",
        getMembersRegister: () => "https://assiut-robotics-server.vercel.app/members/register",
        getMembersVerify: () => "https://assiut-robotics-zeta.vercel.app/members/verify",
        getMembersGetAll: () => "https://assiut-robotics-zeta.vercel.app/members/getAllMembers",
        getCurrentEnvironment: () => 'production',
        setEnvironment: (env) => console.log('Fallback mode - cannot switch environment')
    };
}

// Also create APIConfig alias for backward compatibility
window.APIConfig = window.ServerConfig;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ServerConfig;
}
