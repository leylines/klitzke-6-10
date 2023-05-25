// The path to the CesiumJS source code
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const SitemapPlugin = require('sitemap-webpack-plugin').default;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const buildDate = new Date().toISOString();

const paths = [
  {
    path: '/',
    lastmod: buildDate
  }
];

const pageName = "Leylines - Klitzke 6 - 10";
const pageDescription = "Leylines - Klitzke 6 - 10";
const pageURL = "https://klitzke-6-10.leylines.net/";

module.exports = {
    context: __dirname,
    entry: {
        app: './src/index.js'
    },
    output: {
        filename: 'app.js',
        clean: true,
        path: path.resolve(__dirname, 'docs'),
        sourcePrefix: ''
    },
    resolve: {
        fallback: { "https": false, "zlib": false, "http": false, "url": false },
        mainFiles: ['index', 'Cesium']
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
        }, {
            test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
            use: [ 'url-loader' ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            buildDate: buildDate,
            pageURL: pageURL,
            pageName: pageName,
            pageDescription: pageDescription,
            template: 'src/index.html'
        }),
        new FaviconsWebpackPlugin({
            logo: 'src/leylines-sign.png',
            prefix: 'favicons/',
        }),
        new SitemapPlugin({
            base: pageURL,
            paths,
            options: {
              filename: 'sitemap.xml',
              lastmod: true,
              changefreq: 'weekly',
              priority: 1.0
            }
        }),
        // Copy Cesium Assets, Widgets, and Workers to a static directory
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            maximumFileSizeToCacheInBytes: 12 * 1024 * 1024,
            clientsClaim: true,
            skipWaiting: true,
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
                { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
                { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
		{ from: path.join(cesiumSource, 'ThirdParty'), to: 'ThirdParty' },
                { from: "src/robots.txt" },
                { from: "src/CNAME" },
                //{ from: "src/images", to: "images" }
            ]
        }),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('')
        })
    ],
    mode: 'production',
    devtool: 'eval',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};

