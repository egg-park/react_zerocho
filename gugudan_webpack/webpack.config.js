const path = require('path');
const { webpack } = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval', // hidden-source-map,
    resolve: {
        extensions: ['.jsx', '.js']
    },
    entry: {
        app: './client',
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                      targets: {browsers: ['> 5% in KR', 'last 2 chrome versions']}, // browserslist
                      debug: true,
                    }],
                    '@babel/preset-react',
                  ],
                  plugins: [],
            }
        }],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug:true }) // rules 플러그인 안에 있는 디버그 설정 true
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }
}