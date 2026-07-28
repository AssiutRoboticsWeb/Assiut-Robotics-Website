// Centralized Server Configuration
// This is the source of truth for all API calls.
// Merged version: object-based for robustness + module support.

(function () {
    'use strict';

    // Configuration data
    const configs = {
        development: {
            apiBase: "http://localhost:3000",
            tracksBase: "http://localhost:3000",
            electricalBase: "http://localhost:3000",
            legacyBase: "http://localhost:3000"
        },
        production: {
            apiBase: window.location.hostname.includes('staging') ? "https://staging-robotics-server.vercel.app" : "https://assiut-robotics-server.vercel.app", // Main centralized server
            tracksBase: window.location.hostname.includes('staging') ? "https://staging-robotics-server.vercel.app" : "https://assiut-robotics-server.vercel.app",
            electricalBase: "https://tempbackendelectrical-production.up.railway.app",
            legacyBase: "https://assiutrobotics-production.up.railway.app"
        }
    };

    // Helper to build config object dynamically
    function buildConfig(envConfig) {
        const { apiBase, tracksBase, electricalBase, legacyBase } = envConfig;

        return {
            baseUrl: apiBase,

            // ===== MEMBERS API =====
            members: {
                base: `${apiBase}/members`,
                login: `${apiBase}/members/login`,
                register: `${apiBase}/members/register`,
                verify: `${apiBase}/members/verify`,
                getAllMembers: `${apiBase}/members/getAllMembers`,
                getMembersByCommittee: `${apiBase}/members/get`,
                changeProfileImage: `${apiBase}/members/changeProfileImage`,
                submitTask: `${apiBase}/members/submitTask`,
                submitMemberTask: `${apiBase}/members/submitMemberTask`,
                confirm: `${apiBase}/members/confirm`,
                changeHead: `${apiBase}/members/changeHead`,
                changeVice: `${apiBase}/members/changeVice`,
                addTask: `${apiBase}/members`,
                editTask: `${apiBase}/members`,
                deleteTask: `${apiBase}/members`,
                rateTask: `${apiBase}/members/members`,
                updateTasksEvaluation: `${apiBase}/members/update-tasks-evaluation`,
                sendFeedBackEmail: `${apiBase}/members/sendFeedBackEmail`,
                rateMember: `${apiBase}/members/rate`
            },

            // ===== TRACKS API =====
            tracks: {
                base: `${tracksBase}/tracks`,
                getAllTracks: `${tracksBase}/tracks`,
                getCourses: `${tracksBase}/tracks`,
                submissions: `${tracksBase}/submissions`
            },

            // ===== COMPONENTS API =====
            components: {
                base: `${tracksBase}/components`, // Assuming components moved to main server or stay with tracks
                getComponents: `${tracksBase}/components/getComponents`,
                add: `${tracksBase}/components/add`,
                update: `${tracksBase}/components/update`,
                deleteOne: `${tracksBase}/components/deleteOne`,
                deleteAll: `${tracksBase}/components/deleteAll`,
                requestToBorrow: `${tracksBase}/components/requestToBorrow`,
                getRequestedComponent: `${tracksBase}/components/getRequestedComponent`,
                acceptRequestToBorrow: `${tracksBase}/components/acceptRequestToBorrow`,
                rejectRequestToBorrow: `${tracksBase}/components/rejectRequestToBorrow`,
                getBorrowedComponent: `${tracksBase}/components/getBorrowedComponent`,
                return: `${tracksBase}/components/return`
            },

            // ===== ELECTRICAL API =====
            electrical: {
                base: `${electricalBase}/api`,
                data: `${electricalBase}/api/data`,
                getAllTracks: `${electricalBase}/api/electric/getAllTracks`
            },

            // ===== GUEST & VISITOR API =====
            guest: {
                base: `${apiBase}/guests`
            },

            visitor: {
                base: `${apiBase}/visits`
            },

            // ===== MEETING API =====
            meeting: {
                base: `${apiBase}/meeting`,
                book: `${apiBase}/meeting`
            },

            // ===== LAB DATES API =====
            lapDates: {
                base: `${apiBase}/lap-dates`
            },

            // ===== LEGACY API =====
            legacy: {
                base: legacyBase,
                getAllMembers: `${legacyBase}/members/getAllMembers`,
                rate: `${legacyBase}/members/rate`
            }
        };
    }

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
        return buildConfig(configs[detectEnvironment()]);
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
        getMembersRateMember: function () { return getCurrentConfig().members.rateMember; },

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
