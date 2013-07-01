'use strict';

/* Controllers */

var app = angular.module('myApp.controllers', []);

//angular.module('myApp.controllers', ['myApp.weatherService']).
app.controller('MyCtrl1', [function() {

}]);
app.controller('MyCtrl2', [function() {

}]);

app.controller('MyCtrl3', [function() {
        
}]);
  
app.controller('CurrentWeatherCtrl', 
    ['$scope', '$location', '$routeParams', 'WeatherFactory', 'MapService', 'weather',
        function($scope, $location, $routeParams, WeatherFactory, mapService, weather) {

  $scope.extractResult = function(result) {
     $scope.currentWeather  = result.data;

     mapService = {
      lon: result.data.coord.lon,
      lat: result.data.coord.lat,
      name: result.data.name,
      country: result.data.sys.country
     };
     $scope.map = mapService;

     WeatherFactory.forecast($scope.location)
      .then(function(result) {
        $scope.forecast = result.data.list.slice(0, 4);
        $scope.loader = false;
     });
  };

  $scope.getCurrentWeather = function() {
    $scope.loader = true;

    WeatherFactory
      .query($scope.location).then(function(result) {
        $scope.extractResult(result);
      });

  };


  console.log('Current weather', mapService, weather);

  $scope.location = $routeParams.location || 'Estonia,Rakvere';

  $scope.extractResult(weather);


  // $scope.getCurrentWeather();
//  $scope.search = function() {
//      $scope.currentWeather.query($scope.location);
//
////      console.log(Weather.list({q: $scope.location}));
//      console.log('Data is loaded');
//
//  };

}]);