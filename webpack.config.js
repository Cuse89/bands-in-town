const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({path: '.env.test'});
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({path: '.env.development'});
}

module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css')

    return {
        entry: ['babel-polyfill', './src/app.js'],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
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
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        } 
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract
        ],
        // source map - allows bugs in different modules to be located easily in browser dev tools
        // can go on webpack.js.org to choose different types
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        // webpack has its own live server
        devServer: {
            // other options below on website, only need 1 in this case
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    };
};
