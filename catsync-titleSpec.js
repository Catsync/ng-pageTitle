// pageTitle service that works with Angular ui-router 
// Adapted from https://gist.github.com/hilios/34e0b9f968a4c688fc3d
// by cat@zdh.com

describe('catsync.title tests', function() {
  var DEFAULT_TITLE = 'Foo Bar',
    $window, provider, $pageTitle;

  beforeEach(module('catsync.pagetitle'));

  beforeEach(function() {
    angular.module('testPageTitleMdl', ['ui.router', 'catsync.pagetitle'])
    .config(function($stateProvider, $pageTitleProvider) {
      provider = $pageTitleProvider;
      $pageTitleProvider.setDefault(DEFAULT_TITLE);
      $stateProvider
      	.state('default', {
      		url: '/test/default/title',
      		template: '<p>foo</p>'
      	})
      	.state('custom', {
      		url: '/test/custom/title',
      		data: { pageTitle: 'Custom route title' },
      		template: '<p>foo</p>'
      	})
    });

    // Load the test module.
    module('testPageTitleMdl');
  });

  beforeEach(inject(function(_$window_, _$pageTitle_) {
    $window = _$window_;
    $pageTitle = _$pageTitle_;
  }));

  describe('$pageTitleProvider', function() {
    it('should be defined', function() {
      expect(provider).toBeDefined();
    });

    describe('#setDefault(value)', function() {
      it('should be defined', function() {
        expect(provider.setDefault).toBeDefined();
        expect(typeof provider.setDefault).toBe('function');
      });
    });
  });

  describe('$pageTitle', function() {
    it('should be defined', function() {
      expect($pageTitle).toBeDefined();
    });

    it('should set the default title to the document', function() {
      expect($window.document.title).toBe(DEFAULT_TITLE);
    });

    describe('#get()', function() {
      it('should be defined', function() {
        expect($pageTitle.get).toBeDefined();
        expect(typeof $pageTitle.get).toBe('function');
      });

      it('should return the current document title', function() {
        expect($pageTitle.get()).toBe($window.document.title);
      });
    });

    describe('#set(value)', function() {
      it('should be defined', function() {
        expect($pageTitle.set).toBeDefined();
        expect(typeof $pageTitle.set).toBe('function');
      });

      it('should set the document title', function() {
        $pageTitle.set('Test');
        expect($pageTitle.get()).toBe('Test');
      });
    });

    describe('on $stateChangeSuccess event', function() {
      var navigateTo;

      beforeEach(inject(function($location, $state, $rootScope) {
        navigateTo = function(path) {
          $state.go(path);
          $rootScope.$apply();
        }
      }));

      it('should change the page title according to route config', function() {
        navigateTo('custom');
        expect($pageTitle.get()).toBe('Custom route title');
      });

      it('should use the default if no page title is defined on route', function() {
        navigateTo('default');
        expect($pageTitle.get()).toBe(DEFAULT_TITLE);
      });
    });
  });
});
