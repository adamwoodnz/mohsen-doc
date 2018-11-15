// API CALL TYPE
const TYPE_LOCAL = "LOCAL";
const TYPE_REST = "REST";

// LANGUAGES
const LANG_EN = "en";

// resources
const BASE_URL = "http://tulip-rabbit.glitch.me";

// API contexts
// We will pass this to swagger class constractor if we need different base urls
const DEFAULT = "";

// CONFIG DATA (Please change here only)
const configs = {
    delay: 500,
    baseURL: BASE_URL,
    type: TYPE_REST,
    context: DEFAULT,
    lang: LANG_EN,
    activateSW: false,
    verNo: 0.1
};

export default configs;
