// pageTitle service that works with Angular ui-router 
// Adapted from https://gist.github.com/hilios/34e0b9f968a4c688fc3d
// by cat@zdh.com

angular.module('catsync.pagetitle',['ui.router'])
.provider('$pageTitle', function() {
	"use strict";
	var defaultTitle;

	this.setDefault = function(title) {
		defaultTitle = title;
	};

	/**
	* @name $pageTitle
	* @requires $rootScope
	* @requires $window
	*
	* @description
	* The `$pageTitle` service factory.
	*
	* ### Methods:
	* - $pageTitle.get()
	* - $pageTitle.set(value)
	*/
	function PageTitleService($rootScope, $window) {
		var _currentTitle;

		/**
		* Returns the current document title.
		* @return {string}
		*/
		function _get() {
			return $window.document.title;
		}
 
		/**
		* Sets the document title.
		* @param {String} title - The title.
		*/
		function _set(value) {
			_currentTitle = value || defaultTitle;
			$window.document.title = _currentTitle;
		}
 
		// Set up the default title to the document, if none provide use the current
		// document title as the default title.
		if (defaultTitle) {
			$window.document.title = defaultTitle;
		} else {
			defaultTitle = $window.document.title;
		}
 
		// Bind to ui-route system.
		$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
			var _pageTitle;
			if(toState.data && toState.data.pageTitle) {
				_pageTitle = toState.data.pageTitle || null;
			}
			_set(_pageTitle);
		});
 
		return {
			get: _get,
			set: _set
		};
	}
 
	this.$get = ['$rootScope', '$window', PageTitleService]; 
})
;