const path = require("path");

const PROJECT_DIR = path.resolve(__dirname, "..", "..");

module.exports = {
    devtool: 'none',
    entry: path.join(PROJECT_DIR, 'tmp', 'script', 'main.js'),
}
