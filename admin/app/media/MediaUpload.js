(function() {
  'use strict';

  angular
  .module('app.media')
  .controller('MediaUpload', MediaUpload);

  MediaUpload.$inject = ['FileUploader','logger','restconfig'];

  function MediaUpload(FileUploader, logger, restconfig) {
    /*jshint validthis: true */
    var vm = this;

    vm.uploader =  new FileUploader({
      url: restconfig.baseUrl+'media/upload'+restconfig.requestSuffix,
      formData: [{
        user: 3
      }]
    });

    // vm.uploader.filters.push({
    //   name: 'imageFilter',
    //   fn: function(item /*{File|FileLikeObject}*/, options) {
    //     var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
    //     return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
    //   }
    // });

    vm.uploader.filters.push({
      name: 'customFilter',
      fn: function(item /*{File|FileLikeObject}*/, options) {
        return this.queue.length < 10;
      }
    });

    // CALLBACKS
    vm.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      console.info('onWhenAddingFileFailed', item, filter, options);
    };
    vm.uploader.onAfterAddingFile = function(fileItem) {
      console.info('onAfterAddingFile', fileItem);
    };
    vm.uploader.onAfterAddingAll = function(addedFileItems) {
      console.info('onAfterAddingAll', addedFileItems);
    };
    vm.uploader.onBeforeUploadItem = function(item) {
      console.info('onBeforeUploadItem', item);
    };
    vm.uploader.onProgressItem = function(fileItem, progress) {
      console.info('onProgressItem', fileItem, progress);
    };
    vm.uploader.onProgressAll = function(progress) {
      console.info('onProgressAll', progress);
    };
    vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
      console.info('onSuccessItem', fileItem, response, status, headers);
    };
    vm.uploader.onErrorItem = function(fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
    };
    vm.uploader.onCancelItem = function(fileItem, response, status, headers) {
      console.info('onCancelItem', fileItem, response, status, headers);
    };
    vm.uploader.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem', fileItem, response, status, headers);
    };
    vm.uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
    };

    console.info('uploader', vm.uploader);

  }
})();
