const path = require("path");

require('dts-generator').default({
    name: '@osu-cass/sb-components',
    project: path.resolve(__dirname),
    out: 'index.d.ts'
});