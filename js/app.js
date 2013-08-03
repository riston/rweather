'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngResource', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'partials/partial1.html',
      controller: 'MyCtrl1'
    });
    $routeProvider.when('/view2', {
      templateUrl: 'partials/partial2.html',
      controller: 'MyCtrl2'
    });
    $routeProvider.when('/test', {
      templateUrl: 'partials/partial3.html',
      controller: 'MyCtrl3'
    });

    $routeProvider.when('/weather', {
      redirectTo: '/weather/Estonia,Rakvere'
    });

    $routeProvider.when('/weather/:location', {
      templateUrl: 'partials/current.html',
      controller: 'CurrentWeatherCtrl',
      resolve: {
        weather: function($q, $route, WeatherFactory, WeatherService) {
          var location = $route.current.params.location;

          console.log('Route', $route.current.params);
          var promiseCurrent = WeatherFactory.query(location);
          return promiseCurrent;
        }
      }
    });
    $routeProvider.otherwise({
      redirectTo: '/weather'
    });

    //    $locationProvider.html5Mode(true);
  }
]);
