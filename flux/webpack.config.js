let path = require('path');
let webpack = require('webpack');

const config = {
    entry: {
        app: './react/entry.jsx' //,
        //vendor: ['react', 'react-dom']
    },
    output: {
        path: path.join(__dirname, '/react'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules:[{
            test: /\.jsx?$/,
            //include: path.resolve(__dirname, 'react'),
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
        flux: 'Flux'
    } //,
    /*plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: Infinity
        })
    ]*/
};

module.exports = config;