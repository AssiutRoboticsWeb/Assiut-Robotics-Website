// Centralized Server Configuration
// This is the source of truth for all API calls.
// Merged version: object-based for robustness + module support.

(function () {
    'use strict';

    // Configuration data
    const configs = {
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

    // Environment detection
    function detectEnvironment() {
        const hostname = window.location.hostname;
        const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
        const isDevelopment = hostname.includes('dev') || hostname.includes('staging');
        const devFlag = localStorage.getItem('DEV_MODE') === 'true';

        return (isLocalhost || isDevelopment || devFlag) ? 'development' : 'production';
    }

    // Get current config
    function getCurrentConfig() {
        return configs[detectEnvironment()];
    }

    // Create ServerConfig object
    const ServerConfig = {
        // Environment functions
        getCurrentEnvironment: detectEnvironment,
        setEnvironment: function (env) {
            if (configs[env]) {
                localStorage.setItem('DEV_MODE', env === 'development');
                console.log(`Environment switched to: ${env}`);
            }
        },

        // Base API functions
        getMainAPI: function () { return getCurrentConfig().baseUrl; },
        getServerAPI: function () { return getCurrentConfig().tracks.base.replace('/tracks', ''); },
        getElectricalAPI: function () { return getCurrentConfig().electrical.base.replace('/api', ''); },
        getLegacyAPI: function () { return getCurrentConfig().legacy.base; },

        // Members API functions
        getMembersLogin: function () { return getCurrentConfig().members.login; },
        getMembersRegister: function () { return getCurrentConfig().members.register; },
        getMembersVerify: function () { return getCurrentConfig().members.verify; },
        getMembersGetAll: function () { return getCurrentConfig().members.getAllMembers; },
        getMembersByCommittee: function (committee) { return `${getCurrentConfig().members.getMembersByCommittee}/${committee}`; },
        getMembersChangeProfile: function () { return getCurrentConfig().members.changeProfileImage; },
        getMembersSubmitTask: function () { return getCurrentConfig().members.submitTask; },
        getMembersSubmitMemberTask: function (taskId) { return `${getCurrentConfig().members.submitMemberTask}/${taskId}`; },
        getMembersConfirm: function () { return getCurrentConfig().members.confirm; },
        getMembersChangeHead: function () { return getCurrentConfig().members.changeHead; },
        getMembersChangeVice: function () { return getCurrentConfig().members.changeVice; },
        getMembersAddTask: function (memberId) { return `${getCurrentConfig().members.addTask}/${memberId}/addTask`; },
        getMembersEditTask: function (memberId, taskId) { return `${getCurrentConfig().members.editTask}/${memberId}/editTask/${taskId}`; },
        getMembersDeleteTask: function (memberId, taskId) { return `${getCurrentConfig().members.deleteTask}/${memberId}/deleteTask/${taskId}`; },
        getMembersRateTask: function (memberId, taskId) { return `${getCurrentConfig().members.rateTask}/${memberId}/rateTask/${taskId}`; },
        getMembersUpdateTasksEvaluation: function () { return getCurrentConfig().members.updateTasksEvaluation; },
        getMembersSendFeedback: function (memberId) { return `${getCurrentConfig().members.sendFeedBackEmail}/${memberId}`; },

        // Tracks API functions
        getTracksGetAll: function () { return getCurrentConfig().tracks.getAllTracks; },
        getTracksGetCourses: function (trackId) { return `${getCurrentConfig().tracks.getCourses}/${trackId}/courses`; },
        getTracksSubmissions: function () { return getCurrentConfig().tracks.submissions; },

        // Components API functions
        getComponentsGetAll: function () { return getCurrentConfig().components.getComponents; },
        getComponentsAdd: function () { return getCurrentConfig().components.add; },
        getComponentsUpdate: function () { return getCurrentConfig().components.update; },
        getComponentsDeleteOne: function () { return getCurrentConfig().components.deleteOne; },
        getComponentsDeleteAll: function () { return getCurrentConfig().components.deleteAll; },
        getComponentsRequestToBorrow: function () { return getCurrentConfig().components.requestToBorrow; },
        getComponentsGetRequested: function () { return getCurrentConfig().components.getRequestedComponent; },
        getComponentsAcceptRequest: function () { return getCurrentConfig().components.acceptRequestToBorrow; },
        getComponentsRejectRequest: function () { return getCurrentConfig().components.rejectRequestToBorrow; },
        getComponentsGetBorrowed: function () { return getCurrentConfig().components.getBorrowedComponent; },
        getComponentsReturn: function () { return getCurrentConfig().components.return; },

        // Electrical API functions
        getElectricalData: function () { return getCurrentConfig().electrical.data; },
        getElectricalGetAllTracks: function () { return getCurrentConfig().electrical.getAllTracks; },

        // Guest & Visitor API functions
        getGuestBase: function () { return getCurrentConfig().guest.base; },
        getVisitorBase: function () { return getCurrentConfig().visitor.base; },

        // Meeting API functions
        getMeetingBase: function () { return getCurrentConfig().meeting.base; },
        getMeetingBook: function (meetingId) { return `${getCurrentConfig().meeting.book}/${meetingId}/book`; },

        // Lab Dates API functions
        getLapDatesBase: function () { return getCurrentConfig().lapDates.base; },

        // Legacy API functions
        getLegacyGetAllMembers: function () { return getCurrentConfig().legacy.getAllMembers; },
        getLegacyRate: function () { return getCurrentConfig().legacy.rate; },

        // Backward compatibility functions
        getMembersAPI: function (endpoint = '') { return getCurrentConfig().members.base + endpoint; },
        getTracksAPI: function (endpoint = '') { return getCurrentConfig().tracks.base + endpoint; },
        getComponentsAPI: function (endpoint = '') { return getCurrentConfig().components.base + endpoint; },
        getElectricalAPI: function (endpoint = '') { return getCurrentConfig().electrical.base + endpoint; },
        getGuestAPI: function (endpoint = '') { return getCurrentConfig().guest.base + endpoint; },
        getVisitorAPI: function (endpoint = '') { return getCurrentConfig().visitor.base + endpoint; },
        getMeetingAPI: function (endpoint = '') { return getCurrentConfig().meeting.base + endpoint; },
        getLapDatesAPI: function (endpoint = '') { return getCurrentConfig().lapDates.base + endpoint; },
        // getLegacyAPI already defined above

        // Legacy endpoint functions
        getMembersEndpoint: function (path = '') { return this.getMembersAPI(path); },
        getTracksEndpoint: function (path = '') { return this.getTracksAPI(path); },
        getComponentsEndpoint: function (path = '') { return this.getComponentsAPI(path); },
        getElectricalEndpoint: function (path = '') { return this.getElectricalAPI(path); },
        getGuestEndpoint: function (path = '') { return this.getGuestAPI(path); },
        getVisitorEndpoint: function (path = '') { return this.getVisitorAPI(path); },
        getMeetingEndpoint: function (path = '') { return this.getMeetingAPI(path); },
        getLapDatesEndpoint: function (path = '') { return this.getLapDatesAPI(path); },

        // Utility functions
        getAllUrls: function () { return getCurrentConfig(); }
    };

    // Make ServerConfig globally available
    window.ServerConfig = ServerConfig;
    window.APIConfig = ServerConfig; // Backward compatibility

    // Support for CommonJS modules (Node.js)
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ServerConfig;
    }

    console.log('ServerConfig loaded successfully');
    console.log('Current environment:', ServerConfig.getCurrentEnvironment());

})();
