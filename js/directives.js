'use strict';
/* Directives */

var directives = angular.module('myApp.directives', []);

directives.
directive('appVersion', ['version',
  function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }
]);

directives.directive('icon', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      url: '@'
    },
    template: '<img width="64" height="64" ng-src="http://openweathermap.org/img/w/{{ url }}.png" />',
    replace: true
  };
});


directives.directive('map', ['MapService', 'OpenLayerService',
  function(mapService, OpenLayerService) {
    return {
      restrict: 'C',
      link: function(scope, element, attributes) {
        OpenLayerService.render('basicMap');
        // //Center of map

        // scope.$watch('map', function() {
        //   if (scope.map === undefined) return;
        //   console.log('Changed map ', scope.map);
        //   LeafletService.panTo([scope.map.lon, scope.map.lat], 6);
        // });
        scope.$watch('map', function() {
          if (scope.map === undefined) return;

          var panLon = new OpenLayers.LonLat(scope.map.lon, scope.map.lat);
          OpenLayerService.panTo(panLon.transform(
            new OpenLayers.Projection("EPSG:4326"),
            OpenLayerService.getProjectionObject()), 4);
        });


      }

    };
  }
]);

directives.directive('weatherIcon', [
  function() {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        var iconMapping = {
          '01d': '1',
          '01n': '9',
          '02d': '2',
          '02n': '10',
          '03d': '2',
          '03n': '10',
          '04d': '3',
          '04n': '10',
          '09d': '4',
          '09n': '11',
          '10d': '5',
          '10n': '11',
          '11d': '6',
          '11n': '11',
          '13d': '8',
          '13n': '12',
          '50d': '7',
          '50n': '10'
        };
        scope.$watch('currentWeather', function() {
          var icon = attributes.weatherIcon,
            load = '1'; // Default icon

          if (iconMapping.hasOwnProperty(icon)) {
            load = iconMapping[icon];
          }
          console.log('Attributes ', attributes);


          element.css({
            'background': 'url("img/weather/' + load + '.png") center right',
            'background-size': '5em',
            'background-repeat': 'no-repeat'
          });
          if (attributes.icon) {
            element.css({ 'background-size': '7em' });
          }
        });

      }
    };
  }
]);


directives.directive('forecast', function() {
  return {
    restrict: 'E',
    transclude: true,
    //        template: '<div>Loading...</div>',
    templateUrl: 'partials/partial1.html',
    link: function(scope, elem, attrs) {
      console.log(attrs.ngModel);

      attrs.$set('ngModel', 'this is new value');

    }
  };
});

directives.directive('enter', function() {
  return function($scope, element) {
    element.bind('mouseenter', function() {
      console.log(element);
    });

    element.bind('click', function() {
      console.log('Click');
    });
  };
});

directives.directive('timer', function() {

  return {
    link: function(scope, el, attrs) {
      scope.time = (new Date()).toString();
      console.log('Time is set', scope.time);
    },
    controller: function(scope, el) {
      scope.time = "Time";
    },
    restrict: 'E',
    template: '<div>Time is  {{time}}</div>'
  };
});