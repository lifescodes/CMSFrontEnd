(function() {
  'use strict';

  angular
  .module('app.media')
  .controller('MediaLibrary', MediaLibrary);

  MediaLibrary.$inject = ['MediaFileService', 'ngDialog','logger','restconfig','$scope'];

  function MediaLibrary(MediaFileService, ngDialog, logger, restconfig, $scope) {
    /*jshint validthis: true */
    var vm = this;
    vm.list = listMedia;
    vm.get = getMedia;
    vm.detail = detail;
    vm.edit = editMedia;
    vm.update = updateMedia;
    vm.delete = deleteMedia;
    vm.search = searchMedia;
    vm.countMediaType = countMediaType;


    vm.listdata = [];
    vm.data = {};
    vm.media = {};

    vm.dialog = null;

    vm.bulk = bulk;
    vm.bulkSelect = "action";

    vm.changePage = changePage;
    vm.prevPage = prevPage;
    vm.nextPage = nextPage;
    vm.page = {
      limit: 100,
      current: 1,
      total: 1,
      totalArray: [],
    };

    vm.countType = {
      all:0,
      image:0,
      audio:0,
      video:0,
      other:0
    };

    vm.mediaType = countMediaType;

    activate();

    function activate() {
      listMedia(1);
      vm.siteUrl = restconfig.siteUrl;
      countMediaType();
      console.log(vm.countType);

    }

    function countMediaType(){
      var msAll = MediaFileService.list(1,1000);
      msAll.then(
        function(response){
          vm.countType.all = response.meta.count;
        }
      );

      var image = {file_type:'image',page_limit: 1000};
      var msImage = MediaFileService.listFilter(image);
      msImage.then(
        function(response){
          vm.countType.image = response.meta.count;
        }
      );

      var audio = {file_type:'audio',page_limit: 1000};
      var msAudio = MediaFileService.listFilter(audio);
      msAudio.then(
        function(response){
          vm.countType.audio = response.meta.count;
        }
      );

      var video = {file_type:'video',page_limit: 1000};
      var msVideo = MediaFileService.listFilter(video);
      msVideo.then(
        function(response){
          vm.countType.video = response.meta.count;
        }
      );

      var other = {file_type:'other',page_limit: 1000};
      var msOther = MediaFileService.listFilter(other);
      msOther.then(
        function(response){
          vm.countType.other = response.meta.count;
        }
      );
    }




    function changePage(pos) {
      vm.page.current = pos;
      // vm.list = null;
      listMedia(pos);
    }


    function nextPage() {
      if (vm.page.current < vm.page.total) {
        vm.page.current = vm.page.current + 1;
        // vm.list = null;
        listMedia(vm.page.current);
      }
    }

    function prevPage() {
      if (vm.page.current > 1) {
        vm.page.current = vm.page.current - 1;
        // vm.list = null;
        listMedia(vm.page.current);
      }
    }

    function countPage(count) {
      vm.page.total = Math.ceil((count / vm.page.limit));
      vm.page.totalArray = new Array(vm.page.total);
    }


    function listMedia(pos) {
      var ls = MediaFileService.list();
      if (pos !== undefined) {
        ls = MediaFileService.list(pos, vm.page.limit);
        vm.page.current = pos;
      }

      ls.then(
        function(response) {
          vm.listdata = response;
          countPage(vm.listdata.meta.count); // pagination
        },
        function(error) {
          console.log(error);
        }
      );
      return vm.listdata;
    }


    function getMedia(id) {
      MediaFileService.get(id).then(
        function(response) {
          vm.media = response;
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
    }

    function detail(media){
      vm.media = media;
      vm.media.url = vm.siteUrl+'/'+vm.media.file_url+vm.media.file_name;
      vm.media.thumb = vm.siteUrl+'/'+media.thumb_url+media.thumb_file;

      //open ngDialog
      var tmpl = 'app/media/view/detail.html';
      vm.dialog = ngDialog.open({
         template: tmpl,
         className: 'ngdialog-theme-plain',
         scope: $scope
        });
    }


    function updateMedia() {
      var cmedia = angular.copy(vm.media);
      var umedia = MediaFileService.update(vm.media.id, cmedia);
      umedia.then(
        function(data) {
          var object = angular.copy(data);
          console.log('update ', object);
          // vm.media = null;
          logger.success('media Updated Success!');
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
      vm.dialog.close();
    }

    function editMedia(media) {
      vm.media = media;
      console.log(media);
    }

    function deleteMedia(media) {
      //remove from table in view
      var index = vm.listdata.indexOf(media);
      if (index > -1) vm.listdata.splice(index, 1);
      //remove from rest service
      var mediasv = MediaFileService.delete(media.id);
      mediasv.then(
        function(response) {
          console.log('delete => ', response);
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );
      //close ngDialog
      vm.dialog.close();
      countMediaType();
    }

    function bulk() {
      logger.info(vm.bulkSelect);
      if (vm.bulkSelect === "delete") {
        vm.listdata.forEach(function(media) {
          if (media.isSelected) {
            console.log(media);
            deletemedia(media);
          }
        });
      }
    }

    function searchMedia(keyword) {

    }
  }
})();
