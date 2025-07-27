const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "",
    MODE: process.env.MODE || "private",
    PREFIX: process.env.PREFIX || ".",
    AUTO_REACT: process.env.AUTO_REACT || "false",
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox",
    DEV: process.env.DEV || "",
    READ_MESSAGE: process.env.READ_MESSAGE || "false",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "false",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false",
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "false",
    AUTOLIKESTATUS: process.env.AUTOLIKESTATUS || "false",
    AUTO_TYPING: process.env.AUTO_TYPING || "true",
    AUTO_RECORDING: process.env.AUTO_RECORDING || "true",
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "true",
    ANTI_CALL: process.env.ANTI_CALL || "false",
    BAD_NUMBER_BLOCKER: process.env.BAD_NUMBER_BLOCKER || "false",
    UNIFIED_PROTECTION: process.env.UNIFIED_PROTECTION || "kick", // "off" | "warn" | "kick" | "strict"
    };
    
