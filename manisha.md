require('dotenv').config(); // Load .env if exists

// ================== CONFIG SETTINGS ==================
const settings = {
    SESSION_ID: process.env.SESSION_ID || "",//enter session id 
    OWNER: process.env.OWNER || "", //bot owner number
    DEV: process.env.DEV || "", //bot owner number
    MODE: process.env.MODE || "private", //bot mode (private/ public/ inbox/ group)
    PREFIX: process.env.PREFIX || ".", // bot command prefix
    AUTO_REACT: process.env.AUTO_REACT || "false", // (true / false)
    ANTI_DEL_PATH: process.env.ANTI_DEL_PATH || "inbox", // (inbox / log)
    READ_MESSAGE: process.env.READ_MESSAGE || "false", // (true / false)
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "false", // (true / false)
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || "false", // (true / false)
    AUTO_STATUS_REACT: process.env.AUTO_STATUS_REACT || "false", // (true / false)
    AUTOLIKESTATUS: process.env.AUTOLIKESTATUS || "false", // (true / false)
    AUTO_TYPING: process.env.AUTO_TYPING || "true", // (true / false)
    AUTO_RECORDING: process.env.AUTO_RECORDING || "true", // (true / false)
    ALWAYS_ONLINE: process.env.ALWAYS_ONLINE || "true", // (true / false)
    ANTI_CALL: process.env.ANTI_CALL || "false", // (true / false)
    BAD_NUMBER_BLOCKER: process.env.BAD_NUMBER_BLOCKER || "false", // (true / false)
    UNIFIED_PROTECTION: process.env.UNIFIED_PROTECTION || "kick" // (off / warn / kick / strict)
};
// =====================================================

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { spawn } = require('child_process');
const chalk = require('chalk');
const { extractFull } = require('node-7z');

const GITHUB_ZIP_URL = 'https://github.com/buddika-iresh17/BOT-ZIP/raw/refs/heads/main/MANISHA-MD.zip';
const DOWNLOAD_PATH = path.resolve(__dirname, 'bot_temp');
const ZIP_PATH = path.join(DOWNLOAD_PATH, 'repo.zip');
const EXTRACT_PATH = path.join(DOWNLOAD_PATH, 'extracted');
const ZIP_PASSWORD = 'manisha19@';

const SESSION_ID = settings.SESSION_ID;

// Validate SESSION_ID
if (!SESSION_ID) {
    console.error(chalk.red("🌀 ᴍᴀɴɪꜱʜᴀ-ᴍᴅ 💕 Invalid or missing SESSION_ID ❌..."));
    process.exit(1);
}

function prepareFolders() {
    try {
        if (fs.existsSync(DOWNLOAD_PATH)) {
            fs.rmSync(DOWNLOAD_PATH, { recursive: true, force: true });
        }
        fs.mkdirSync(DOWNLOAD_PATH, { recursive: true });
        fs.mkdirSync(EXTRACT_PATH, { recursive: true });
    } catch (e) {
        console.error(chalk.red('🌀 ᴍᴀɴɪꜱʜᴀ-ᴍᴅ 💕 Failed to prepare folders ❌:'), e);
        process.exit(1);
    }
}

async function downloadGitHubZip() {
    console.log(chalk.blue('🌀 ᴍᴀɴɪꜱʜᴀ-ᴍᴅ 💕 Downloading GitHub ZIP 📥...'));
    try {
        const response = await axios.get(GITHUB_ZIP_URL, { responseType: 'arraybuffer' });
        fs.writeFileSync(ZIP_PATH, response.data);
        console.log(chalk.green('🌀 ᴍᴀɴɪꜱʜᴀ-ᴍᴅ 💕  ZIP downloaded ✅...'));
    } catch (e) {
        throw new Error(`Failed to download GitHub ZIP: ${e.message}`);
    }
}

function extractZip() {
    console.log(chalk.blue('🌀 ᴍᴀɴɪꜱʜᴀ-ᴍᴅ 💕 Extracting ZIP with password 📦...'));
    return new Promise((resolve, reject) => {
        const extractor = extractFull(ZIP_PATH, EXTRACT_PATH, {
            password: ZIP_PASSWORD,
            $bin: '7z'
        });

        extractor.on('end', () => {
            console.log(chalk.green('🌀 ᴍᴀɴɪꜱʜᴀ-ᴍᴅ 💕 Extraction complete ✅...'));
            resolve();
        });

        extractor.on('error', (err) => {
            console.error(chalk.red('🌀 ᴍᴀɴɪꜱʜᴀ-ᴍᴅ 💕 Extraction failed:'), err);
            reject(err);
        });
    });
}

function applySettings() {
    console.log(chalk.blue('🌀 ᴍᴀɴɪꜱʜᴀ-ᴍᴅ 💕 Applying config.js ⚙️...'));
    const mainFolder = getFirstFolder(EXTRACT_PATH);
    const destSettings = path.join(mainFolder, 'config.js');
    const configContent = `module.exports = ${JSON.stringify(settings, null, 4)};`;
    fs.writeFileSync(destSettings, configContent);
    console.log(chalk.green('🌀 ᴍᴀɴɪꜱʜᴀ-ᴍᴅ 💕 config.js applied ✅...'));
}

function runBot() {
    const mainFolder = getFirstFolder(EXTRACT_PATH);
    const entryPoint = findEntryPoint(mainFolder);
    if (!entryPoint) {
        console.error(chalk.red('🌀 ᴍᴀɴɪꜱʜᴀ-ᴍᴅ 💕 Could not find start.js or index.js ❌...'));
        process.exit(1);
    }
    const child = spawn('node', [entryPoint], { stdio: 'inherit' });
    child.on('close', (code) => {
        console.log(chalk.yellow(`👋 Bot exited with code ${code}`));
    });
}

function getFirstFolder(basePath) {
    try {
        const items = fs.readdirSync(basePath);
        const folder = items.find(f => fs.statSync(path.join(basePath, f)).isDirectory());
        return folder ? path.join(basePath, folder) : basePath;
    } catch (e) {
        console.error(chalk.red('🌀 ᴍᴀɴɪꜱʜᴀ-ᴍᴅ 💕 Failed to get first folder ❌:'), e);
        return basePath;
    }
}

function findEntryPoint(basePath) {
    const possibleFiles = ['start.js', 'index.js'];
    for (const file of possibleFiles) {
        const fullPath = path.join(basePath, file);
        if (fs.existsSync(fullPath)) return fullPath;
    }
    return null;
}

(async () => {
    try {
        prepareFolders();
        await downloadGitHubZip();
        await extractZip();
        applySettings();
        runBot();
    } catch (err) {
        console.error(chalk.red('💥 Setup failed:'), err);
        process.exit(1);
    }
})();