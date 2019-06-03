import {
  devServer,
  dependencyGraphConfiguration,
  jsLoader,
  hotModuleReplacementPlugin,
  environmentVariables
} from './webpackModuleConfig.babel.js';

export default {
  mode: 'development',

  devServer,

  ...dependencyGraphConfiguration,
  
  module: {
    rules: [
      jsLoader
    ]
  },

  plugins: [
    hotModuleReplacementPlugin,
    environmentVariables
  ]
};
