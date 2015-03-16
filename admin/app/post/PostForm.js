(function() {
  'use strict';

  angular
  .module('app.post')
  .controller('PostForm', PostForm);

  PostForm.$inject = [
    'PostService', 'CategoryService', 'TagService',
    'PostTagHelper','PostCategoryHelper','PostGetService',
    'URLHelper','logger', '$scope','restconfig'
  ];

  function PostForm(
    PostService, CategoryService, TagService,
    PostTagHelper, PostCategoryHelper, PostGetService,
    URLHelper, logger, $scope, restconfig
  ){
    /*jshint validthis: true */
    var vm = this;
    vm.save = save;
    vm.publish = publish;
    vm.update = update;

    vm.listCat = listCat;
    vm.listTag = listTag;

    vm.listdata = {
      category: [],
      tag: []
    };

    vm.service = PostGetService;
    vm.post = null;
    vm.tags = null;
    vm.categories = null;

    vm.shared = PostGetService;

    vm.checkCategory = [];
    vm.selectedCategory = [];
    vm.selectCategory = selectCategory;


    $scope.ckeditorConfig = {
      lang: 'en',
      // simpleImageBrowserUrl: restconfig.siteUrl+'/v1/media/file/url',
      toolbar_full: [
        { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike', 'Underline' ] },
        { name: 'paragraph', items: [ 'BulletedList', 'NumberedList', 'Blockquote' ] },
        { name: 'editing', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
        { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
        { name: 'tools', items: [ 'SpellChecker', 'Maximize' ] },
        '/',
        { name: 'styles', items: [ 'Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat' ] },
        { name: 'insert', items: [ 'Image', 'Table', 'SpecialChar' ] },
        { name: 'forms', items: [ 'Outdent', 'Indent' ] },
        { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
        //Adds PBCKCode button to CKeditor panel
        { name: 'document', items: [ 'PageBreak', 'Source' ] },
      ],
      extraPlugins: 'imagebrowser',
      "imageBrowser_listUrl" : restconfig.siteUrl + '/v1/media/file/url?format=json',
    };
    /**
    * runnner
    */
    activate();
    function activate() {
      listCat();
      listTag();
      if (URLHelper.segment(3)=="edit"){
        initEdit();
      } else {
        vm.checkCategory[1]=true;
      }
    }

    function initEdit(){
      var id = URLHelper.getSegment().last();
      PostService.get(id).then(
        function(response){
          vm.post = response;
          initCategoryWidget(vm.post.category);
          initTagWidget(vm.post.tag);
        },
        function(response){
          console.log("Error with status code", response.status);
        }
      );
    }

    function initCategoryWidget(categories){
      categories.forEach(function(cat){
        vm.checkCategory[cat.id] = true;
      });
    }

    function initTagWidget(tags){
      var tagArray = [];
      if (tags.length >0){
        tags.forEach(function(value){
          tagArray.push({id: value.id, text: value.name});
        });
      }
      vm.tags = tagArray;
    }


    function save() {
      vm.post.status = 0; //default for draft
      vm.post.user = 3;
      var cpost = angular.copy(vm.post);
      var ps = PostService.save(cpost);
      ps.then(
        function(response){
          var post = angular.copy(response);
          vm.post = post;

          PostTagHelper.save(post, vm.tags);
          PostCategoryHelper.save(post, vm.selectedCategory);
        },
        function(response){
          console.log("Error with status code", response.status);
        }
      );
    }

    function update(status){
      if (status === undefined){
        status = 0;
      }
      vm.post.status = status;
      vm.post.user = 3;
      var cpost = angular.copy(vm.post);
      var ps = PostService.update(cpost.id, cpost);
      ps.then(
        function(response){
          var post = angular.copy(response);
          // vm.post = response;
          PostTagHelper.update(post, vm.tags);
          PostCategoryHelper.update(post, vm.checkCategory);
        },
        function(response){
          console.log("Error with status code", response.status);
        }
      );

      console.log('PostForm.update',vm.checkCategory);
    }

    function selectCategory(id){
      vm.selectedCategory = [];
      vm.checkCategory.forEach(function(value,key){
        if (value === true){
          vm.selectedCategory.push(key);
        }
      });
      console.log(vm.selectedCategory);
    }


    function publish(){
      update(1);
    }


    function listCat() {
      var currentPage = 1;
      var limit = 100;
      var cs = CategoryService.tree(currentPage, limit);
      cs.then(
        function(response){
          vm.listdata.category = response;
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return cs;
    }

    function listTag() {
      var ts = TagService.list();
      ts.then(
        function(response){
          vm.listdata.tag = response;
        },
        function(response) {
          console.log("Error with status code", response.status);
        }
      );

      return ts;
    }



  }
})();
