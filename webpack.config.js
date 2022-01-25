const path = require('path');

module.exports = {
    entry: './src/ColorSwatch_Controller.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/static')
    }
};