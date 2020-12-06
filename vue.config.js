const execSync = require('child_process').execSync;

process.env.VUE_APP_VERSION = require('./package.json').version + '@' + execSync('git show -s --format=%h').toString().trim()

module.exports = {}