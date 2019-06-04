import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { argv as commandParameters } from 'yargs';
import { emptyPlugin, logNetworkIp } from './webpackUtils';

// Dev server
const PORT = 8080;
const devServer = {
  https: true,
  host: '0.0.0.0',
  port: PORT,
  hot: true,
  compress: true,
  contentBase: path.join(__dirname, '..', 'public'),
  before: () => logNetworkIp(PORT),
};

// Handle Dependency Graph Configuration
const dependencyGraphConfiguration = {
  devtool: 'source-map',

  entry: {
    main: './src/main.js',
  },
  
  output: {
    library: 'PMA',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js'
  },
  
  resolve: {
    extensions: ['.js', '.jsx']
  },
};

// Handle JS
let jsLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: ['babel-loader']
};

let jsMinificationOptimisation = new TerserPlugin();

// Extra Plugin
let cleanDistFolderPlugin = new CleanWebpackPlugin();

let hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

let copyPublicFolderPlugin = new CopyWebpackPlugin([
  { 
    context: path.join(__dirname, '..'),
    from: 'public/'
  }
]);

let bundleAnalyzerPlugin = commandParameters.bundleSizeAnalyse ? new BundleAnalyzerPlugin() : emptyPlugin;

let environmentVariables = new webpack.DefinePlugin({
  "process.env.DOMAIN": JSON.stringify(commandParameters.domain || 'app.provemyage.com'),
});

export {
  devServer,

  dependencyGraphConfiguration,

  environmentVariables,
  jsLoader,
  jsMinificationOptimisation,

  cleanDistFolderPlugin,
  hotModuleReplacementPlugin,
  copyPublicFolderPlugin,
  bundleAnalyzerPlugin
};
