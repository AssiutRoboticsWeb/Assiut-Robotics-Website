# Server Configuration Usage Guide

## 🎯 **Single Source of Truth**

The `server-config.js` file is now the **ONLY** place you need to edit API endpoints. All API calls throughout the application use this centralized configuration.

## 📁 **File Location**
```
public/config/server-config.js
```

## 🔧 **How to Change API URLs**

### For Development Environment:
Edit the `development` section in `server-config.js`:

```javascript
development: {
    // ===== MAIN SERVER ENDPOINTS =====
    baseUrl: "http://localhost:3000",
    
    // ===== MEMBERS API =====
    members: {
        base: "http://localhost:3000/members",
        login: "http://localhost:3000/members/login",
        register: "http://localhost:3000/members/register",
        // ... other endpoints
    },
    // ... other APIs
}
```

### For Production Environment:
Edit the `production` section in `server-config.js`:

```javascript
production: {
    // ===== MAIN SERVER ENDPOINTS =====
    baseUrl: "https://assiut-robotics-zeta.vercel.app",
    
    // ===== MEMBERS API =====
    members: {
        base: "https://assiut-robotics-zeta.vercel.app/members",
        login: "https://assiut-robotics-zeta.vercel.app/members/login",
        // ... other endpoints
    },
    // ... other APIs
}
```

## 🚀 **How to Use in Your Code**

### Method 1: Specific Endpoint Functions (Recommended)
```javascript
// Members API
const loginUrl = ServerConfig.getMembersLogin();
const registerUrl = ServerConfig.getMembersRegister();
const verifyUrl = ServerConfig.getMembersVerify();

// Components API
const getComponentsUrl = ServerConfig.getComponentsGetAll();
const addComponentUrl = ServerConfig.getComponentsAdd();

// Tracks API
const getAllTracksUrl = ServerConfig.getTracksGetAll();
const submissionsUrl = ServerConfig.getTracksSubmissions();
```

### Method 2: Base API Functions
```javascript
// Get base URLs with optional endpoints
const membersBase = ServerConfig.getMembersAPI();
const membersLogin = ServerConfig.getMembersAPI('/login');

const componentsBase = ServerConfig.getComponentsAPI();
const componentsAdd = ServerConfig.getComponentsAPI('/add');
```

### Method 3: Backward Compatibility (Old APIConfig style)
```javascript
// These still work for backward compatibility
const loginUrl = APIConfig.getMembersEndpoint('/login');
const componentsUrl = APIConfig.getComponentsEndpoint('/getComponents');
```

## 📋 **Available API Categories**

### 1. **Members API**
- `getMembersLogin()` - Login endpoint
- `getMembersRegister()` - Registration endpoint
- `getMembersVerify()` - Email verification
- `getMembersGetAll()` - Get all members
- `getMembersByCommittee(committee)` - Get members by committee
- `getMembersChangeProfile()` - Change profile image
- `getMembersSubmitTask()` - Submit task
- `getMembersSubmitMemberTask(taskId)` - Submit member task
- `getMembersConfirm()` - Confirm member
- `getMembersChangeHead()` - Change head
- `getMembersChangeVice()` - Change vice
- `getMembersAddTask(memberId)` - Add task to member
- `getMembersEditTask(memberId, taskId)` - Edit member task
- `getMembersDeleteTask(memberId, taskId)` - Delete member task
- `getMembersRateTask(memberId, taskId)` - Rate member task
- `getMembersUpdateTasksEvaluation()` - Update tasks evaluation
- `getMembersSendFeedback(memberId)` - Send feedback email

### 2. **Components API**
- `getComponentsGetAll()` - Get all components
- `getComponentsAdd()` - Add component
- `getComponentsUpdate()` - Update component
- `getComponentsDeleteOne()` - Delete one component
- `getComponentsDeleteAll()` - Delete all components
- `getComponentsRequestToBorrow()` - Request to borrow
- `getComponentsGetRequested()` - Get requested components
- `getComponentsAcceptRequest()` - Accept borrow request
- `getComponentsRejectRequest()` - Reject borrow request
- `getComponentsGetBorrowed()` - Get borrowed components
- `getComponentsReturn()` - Return component

### 3. **Tracks API**
- `getTracksGetAll()` - Get all tracks
- `getTracksGetCourses(trackId)` - Get courses for track
- `getTracksSubmissions()` - Submit track work

### 4. **Electrical API**
- `getElectricalData()` - Get electrical data
- `getElectricalGetAllTracks()` - Get all electrical tracks

### 5. **Guest & Visitor API**
- `getGuestBase()` - Guest API base
- `getVisitorBase()` - Visitor API base

### 6. **Meeting API**
- `getMeetingBase()` - Meeting API base
- `getMeetingBook(meetingId)` - Book meeting

### 7. **Lab Dates API**
- `getLapDatesBase()` - Lab dates API base

### 8. **Legacy API**
- `getLegacyGetAllMembers()` - Legacy get all members
- `getLegacyRate()` - Legacy rate endpoint

## 🔄 **Environment Management**

### Automatic Detection
The system automatically detects the environment based on:
- **Development**: `localhost`, `127.0.0.1`, or hostnames containing 'dev'/'staging'
- **Production**: All other hostnames

### Manual Override
```javascript
// Force development mode
ServerConfig.setEnvironment('development');

// Force production mode
ServerConfig.setEnvironment('production');

// Check current environment
console.log(ServerConfig.getCurrentEnvironment());
```

### Using localStorage
```javascript
// Force development mode
localStorage.setItem('DEV_MODE', 'true');

// Force production mode
localStorage.setItem('DEV_MODE', 'false');

// Clear override (use automatic detection)
localStorage.removeItem('DEV_MODE');
```

## 🛠️ **Development Tools**

### Dev Panel
When running in development mode, a floating dev panel appears with:
- Current environment display
- Quick switch buttons (Dev/Prod)
- Show current API URLs
- Hide/show panel

**Keyboard Shortcut**: `Ctrl+Shift+D` to toggle the dev panel

### View All URLs
```javascript
// Get all current URLs
const allUrls = ServerConfig.getAllUrls();
console.log(allUrls);
```

## 📝 **Migration Examples**

### Before (Hardcoded URLs):
```javascript
const response = await fetch('https://assiut-robotics-zeta.vercel.app/members/login', {
    method: 'POST',
    // ...
});
```

### After (Using ServerConfig):
```javascript
const response = await fetch(ServerConfig.getMembersLogin(), {
    method: 'POST',
    // ...
});
```

### Before (Multiple API calls):
```javascript
const loginUrl = 'https://assiut-robotics-zeta.vercel.app/members/login';
const verifyUrl = 'https://assiut-robotics-zeta.vercel.app/members/verify';
const changeProfileUrl = 'https://assiut-robotics-zeta.vercel.app/members/changeProfileImage';
```

### After (Centralized):
```javascript
const loginUrl = ServerConfig.getMembersLogin();
const verifyUrl = ServerConfig.getMembersVerify();
const changeProfileUrl = ServerConfig.getMembersChangeProfile();
```

## ✅ **Benefits**

1. **Single Source of Truth** - All API URLs in one place
2. **Environment Management** - Automatic dev/prod switching
3. **Easy Updates** - Change URLs once, affects entire app
4. **Type Safety** - Specific functions for each endpoint
5. **Backward Compatibility** - Old code still works
6. **Development Tools** - Built-in dev panel and utilities

## 🚨 **Important Notes**

1. **Always use ServerConfig functions** instead of hardcoded URLs
2. **Edit only `server-config.js`** to change API endpoints
3. **Test both environments** after making changes
4. **Use the dev panel** to verify URLs are correct
5. **Keep the configuration file organized** for easy maintenance
