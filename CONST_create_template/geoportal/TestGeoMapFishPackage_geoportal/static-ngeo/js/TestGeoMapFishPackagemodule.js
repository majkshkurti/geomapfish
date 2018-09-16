/**
 * This file provides the "TestGeoMapFishPackage" namespace, which is the
 * application's main namespace. And it defines the application's Angular
 * module.
 */

/**
 * @module TestGeoMapFishPackage
 */
const exports = {};

import ngeoUtils from 'ngeo/utils.js';

/**
 * @type {!angular.Module}
 */
exports.module = angular.module('TestGeoMapFishPackage', []);

exports.module.config(['$compileProvider', function($compileProvider) {
  if (!('debug' in ngeoUtils.decodeQueryString(window.location.search))) {
    // Disable the debug info
    $compileProvider.debugInfoEnabled(false);
  }
}]);


export default exports;
