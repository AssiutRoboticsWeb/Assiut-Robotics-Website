/**
 * SECURITY WARNING:
 * The hardcoded tokens have been removed for security.
 * Please use environment variables (process.env.FACEBOOK_ACCESS_TOKEN) instead.
 * 
 * See .env.example for configuration.
 */

const access_token = process.env.FACEBOOK_ACCESS_TOKEN || "";

const page_access_url = process.env.FACEBOOK_PAGE_ACCESS_URL || "";

const pageId = process.env.FACEBOOK_PAGE_ID || "";

const id = "262144867290545"; // Public ID is fine, but better in env
const pageAccessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN || "";

const longLiveTokenUrl = `https://graph.facebook.com/v22.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&fb_exchange_token=${process.env.FACEBOOK_EXCHANGE_TOKEN}`;

const longLiveToken = process.env.FACEBOOK_LONG_LIVE_TOKEN || "";
const paceLongAccessToken = process.env.FACEBOOK_PAGE_LONG_ACCESS_TOKEN || "";

module.exports = {
    access_token,
    pageId,
    pageAccessToken
};
