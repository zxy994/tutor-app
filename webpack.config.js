// const webpack = require('webpack');
// const path = require('path');

// module.exports = {
//     entry: [
//         './server.js'
//     ],
//     output: {
//         path: path.resolve(__dirname, './build'),
//         filename: 'server.bundle.js',
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.html$/,
//                 loader: 'file-loader?name=[name].[ext]',
//             },
//             {
//                 test: /\.jsx?$/,
//                 exclude: /node_modules/,
//                 loader: 'babel-loader',
//                 query: {
//                     presets: ['es2015', 'react']
//                 }
//             },
//         ],
//     },
//     plugins: [
//         new webpack.NamedModulesPlugin(),
//     ]
// };

const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
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
    }
};
