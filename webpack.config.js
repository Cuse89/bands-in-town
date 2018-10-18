const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        }, {
            // question mark allows for scss and css files
            test: /\.s?css$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }]
    },
    // source map - allows bugs in different modules to be located easily in browser dev tools
    // can go on webpack.js.org to choose different types
    devtool: 'cheap-module-eval-source-map',
    // webpack has its own live server
    devServer: {
        // other options below on website, only need 1 in this case
        contentBase: path.join(__dirname, 'public')
    }
};