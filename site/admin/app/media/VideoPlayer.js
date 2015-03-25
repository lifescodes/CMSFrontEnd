(function() {
  'use strict';

  angular
  .module('app.media')
  .controller('VideoPlayer', VideoPlayer);

  VideoPlayer.$inject = ['$sce'];

  function VideoPlayer($sce) {
    /*jshint validthis: true */
    var vm = this;
    vm.videosrc = [];
    vm.injectSource = injectSource;

    function injectSource(data){
      console.log(data);
      vm.sources =  [
        {src: $sce.trustAsResourceUrl(data.url), type: "video/mp4"},
      ];
    }

    vm.tracks = [
      {
        src: "pale-blue-dot.vtt",
        kind: "subtitles",
        srclang: "en",
        label: "English",
        default: ""
      }
    ];

  

    vm.sources =  [
      {src: $sce.trustAsResourceUrl("http://api.lifecode.loc/upload/video/2015/3/9/41895320280_Makna_Kehidupan_(The_Meaning_Of_Life)_-_HD_(1).mp4"), type: "video/mp4"},
    ];



  }
})();
