const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

module.exports = {
    SESSION_ID: process.env.SESSION_ID || "manaofc~", //(manaofc~ ) මෙහෙම තියන එක අයින් කරන්නෙ නැතුව සිසන් අයිඩ් එක දාන්න
    OWNER_NUMBER: process.env.OWNER_NUMBER || "94721551183", // whatsapp number enter
    MODE: process.env.MODE || "private", // public / private / group / inbox
    PREFIX: process.env.PREFIX || ".", // command prefix
    AUTO_REACT: process.env.AUTO_REACT || "false", // true / false
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox", // inbox / log
    READ_MESSAGE: process.env.READ_MESSAGE || "false", // true / false
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "false", // true / false
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false", // true / false
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "false", // true / false
    AUTOLIKESTATUS: process.env.AUTOLIKESTATUS || "false", // true / false
    AUTO_TYPING: process.env.AUTO_TYPING || "true", // true / false
    AUTO_RECORDING: process.env.AUTO_RECORDING || "true", // true / false
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "true", // true / false
    ANTI_CALL: process.env.ANTI_CALL || "false", // true / false
    BAD_NUMBER_BLOCKER: process.env.BAD_NUMBER_BLOCKER || "false", // true / false
    UNIFIED_PROTECTION: process.env.UNIFIED_PROTECTION || "kick", // off / warn / kick / strict
    };
    
