import {
  dependencyGraphConfiguration,
  jsLoader,
  jsMinificationOptimisation,
  cleanDistFolderPlugin,
  copyPublicFolderPlugin,
  environmentVariables
} from './webpackModuleConfig.babel.js';

module.exports = {
  mode: 'production',

  ...dependencyGraphConfiguration,
  
  module: {
    rules: [
      jsLoader
    ]
  },

  plugins: [
    cleanDistFolderPlugin,
    environmentVariables,
    copyPublicFolderPlugin,
  ],

  optimization: {
    minimizer: [
      jsMinificationOptimisation
    ]
  }
};
