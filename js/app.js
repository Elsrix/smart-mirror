(function(angular) {
    'use strict';

    angular.module('SmartMirror', ['ngAnimate','ngRoute'])
	.config( 
		['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'html/home.html'
			})
			.otherwise({
				redirectTo: '/'
			});
		}])
	;

}(window.angular));