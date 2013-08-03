'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.

var services = angular.module('myApp.services', ['ngResource']);

services.value('version', '0.1.3');

services.service('MapService', function() {
   return {
       long: 25.0,
       lat: 59.0,
       name: '',
       country: 'Estonia'
   };
});

services.service('WeatherService', [function () {
    return {
        current: {},
        forecast: {}
    };
}]);

services.service('LeafletService', ['$timeout', 'MapService',
    function ($timeout, MapService) {
    console.log('Leaflet map');
    var EstoniaCord = { lat: 59, lon: 24 };

    var osm = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.png', {
        subdomains: '1234',
        type: 'osm',
        attribution: '',
        maxZoom: 18
    });

    var rain = L.tileLayer('http://{s}.tile.openweathermap.org/map/rain/{z}/{x}/{y}.png', {
        attribution: 'Map data © OpenWeatherMap',
        maxZoom: 15,
        opacity: 0.3
    });

    var map = L.map('basicMap', {
        layers: [osm]
    }).setView([58.9239, 25.0136070], 7);
    map.addLayer(rain);

    return map;

}]);

services.service('OpenLayerService', ['MapService', function (MapService) {
    // Tallinn coordinates
    var lat = 59.4393,
        lon = 24.7584,
        opacity = 0.3,
        layer_name = 'rain',
        lonlat = new OpenLayers.LonLat(lon, lat),
        map = new OpenLayers.Map();

    // Create overlays
    //  OSM
    var mapnik = new OpenLayers.Layer.OSM();
    // Stations
    var stations = new OpenLayers.Layer.Vector.OWMStations("Stations");
    // Current weather
    var city = new OpenLayers.Layer.Vector.OWMWeather("Weather");

    var layer = new OpenLayers.Layer.XYZ(
      "layer " + layer_name,
      "http://${s}.tile.openweathermap.org/map/" + layer_name + "/${z}/${x}/${y}.png", {
      numZoomLevels: 15,
      isBaseLayer: false,
      opacity: opacity,
      sphericalMercator: true

    });

    var precipitation = new OpenLayers.Layer.XYZ(
      "layer precipitation",
      "http://${s}.tile.openweathermap.org/map/precipitation/${z}/${x}/${y}.png", {
      numZoomLevels: 15,
      isBaseLayer: false,
      opacity: opacity,
      sphericalMercator: true

    });

    //Addind maps
    map.addLayers([mapnik, stations, city, layer, precipitation]);
    map.setCenter(lonlat.transform(
      new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()), 10);

    var ls = new OpenLayers.Control.LayerSwitcher({
      'ascending': false
    });
    map.addControl(ls);

    return map;
}]);

services.factory('WeatherFactory', function($http) {
    return {

        query: function(location) {
            var url = 'http://api.openweathermap.org/data/2.5/weather';
            var promise = $http({ method: 'JSONP', url: url, params: {
                    lang: 'en-us',
                    q: location,
                    units: 'metric',
                    mode: 'json',
                    callback:'JSON_CALLBACK'
                }
            });
            return promise;
        },
        forecast: function(location) {
            var url = 'http://api.openweathermap.org/data/2.5/forecast/daily';
            var promise = $http({ method: 'JSONP', url: url, params: {
                    lang: 'en-us',
                    q: location,
                    units: 'metric',
                    mode: 'json',
                    callback:'JSON_CALLBACK'
                }
            });
            return promise;
        }
    };
});
