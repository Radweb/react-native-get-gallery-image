'use strict';

// This file supports both iOS and Android

// Stop bluebird going nuts because it can't find "self"
if (typeof self === 'undefined') {
  global.self = global;
}

var { Platform } = require('react-native');
var React, { NativeModules } = require('react-native');
var RNGetGalleryImage = NativeModules.RNGetGalleryImage;
var Promise = require('bluebird');
var rnfs = require('react-native-fs');

var convertError = (err) => {
  if (err.isOperational && err.cause) {
    err = err.cause;
  }

  var error = new Error(err.description || err.message);
  error.code = err.code;
  throw error;
};

var moveFileAndroid = (path, name, directory) => {
  if (directory) {
    const movedPath = `${directory}/${name}.jpg`
    return rnfs.mkdir(`${rnfs.DocumentDirectoryPath}/${directory}`).then((success) => {
      return rnfs.moveFile(path.replace('file://', ''), `${rnfs.DocumentDirectoryPath}/${movedPath}`).then(() => {
        return movedPath
      })
    })
  } else {
      const movedPath = `${name}.jpg`

      return rnfs.moveFile(path.replace('file://', ''), `${rnfs.DocumentDirectoryPath}/${movedPath}`).then(() => {
        return movedPath
      })
  }
}

var RNGGI = {
  moveFile(fileUri, name, directory) {
    if (Platform.OS == 'android') {
      var _getRealPathFromURI = Promise.promisify(RNGetGalleryImage.getRealPathFromURI);
      return _getRealPathFromURI(fileUri)
      .then(path => {
        return moveFileAndroid(path, name, directory)
      })
    } else {
      return RNGetGalleryImage.saveImage({
        imagePath: fileUri,
        directory: directory ? directory : '',
        imageName: name,
        imageType: 'jpg',
      })
    }
  }
};

module.exports = RNGGI