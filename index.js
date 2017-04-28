'use strict';

// copied from
// https://github.com/turban/Leaflet.Graticule/blob/master/L.Graticule.js

module.exports = function graticule (interval) {

  interval = +interval || 20;
  const features = [];

  for (var lng = 0; lng <= 180; lng += interval) {
    features.push(makeFeature(makeMeridian(lng), {
      name: (lng) ? lng.toString() + "° E" : "Prime meridian"
    }));
    if (lng !== 0) {
      features.push(makeFeature(makeMeridian(-lng), {
        name: lng.toString() + "° W"
      }));
    }
  }

  for (var lat = 0; lat <= 90; lat += interval) {
    features.push(makeFeature(makeParallel(lat), {
      name: (lat) ? lat.toString() + "° N" : "Equator"
    }));
    if (lat !== 0) {
      features.push(makeFeature(makeParallel(-lat), {
	"name": lat.toString() + "° S"
      }));
    }
  }

  return {
    type: 'FeatureCollection',
    features
  };
}

function makeMeridian (lng) {
  lng = lngFix(lng);
  const coords = [];
  for (var lat = -90; lat <= 90; lat += 1) {
    coords.push([lng, lat]);
  }
  return coords;
}

function makeParallel (lat) {
  const coords = [];
  for (var lng = -180; lng <= 180; lng += 1) {
    coords.push([lngFix(lng), lat]);
  }
  return coords;
}

function makeFeature (coordinates, properties) {
  return {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates
    },
    properties
  };
}

function lngFix (lng) {
  if (lng >= 180) return 179.999999;
  if (lng <= -180) return -179.999999;
  return lng;
}
