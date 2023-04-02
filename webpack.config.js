const path = require('path');

module.exports = {
    entry: './client/src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '/dist'),
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
    },
};
