import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map from 'react-map-gl';
mapboxgl.accessToken = 'pk.eyJ1IjoiczU4MzgzNzg4IiwiYSI6ImNreWI4bTg4ZDBkMzAyd3A4MGs1OXhjamQifQ.EGVAwrEWnSaxQq8weQrrow';

export default function App() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/light-v11', // style URL
      center: [114.3262, 30.5469], // starting position：["经度"，"纬度"]
      zoom: 10 // starting zoom
    });

    map.on('load', () => {
      map.addSource('maine', {   // Add a data source containing GeoJSON data.在这里加入geojson文件：（map.addSource("name", {})）
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            // These coordinates outline Maine.
            'coordinates': [
              [
                [-67.13734, 45.13745],
                [-66.96466, 44.8097],
                [-68.03252, 44.3252],
                [-69.06, 43.98],
                [-70.11617, 43.68405],
                [-70.64573, 43.09008],
                [-70.75102, 43.08003],
                [-70.79761, 43.21973],
                [-70.98176, 43.36789],
                [-70.94416, 43.46633],
                [-71.08482, 45.30524],
                [-70.66002, 45.46022],
                [-70.30495, 45.91479],
                [-70.00014, 46.69317],
                [-69.23708, 47.44777],
                [-68.90478, 47.18479],
                [-68.2343, 47.35462],
                [-67.79035, 47.06624],
                [-67.79141, 45.70258],
                [-67.13734, 45.13745]
              ]
            ]
          }
        }
      });
        
      // Add a new layer to visualize the polygon.
      map.addLayer({
        'id': 'maine', //这里是图层的id，不是寻找对应来源的id
        'type': 'fill',
        'source': 'maine', // reference the data source 这里才是来源的id
        'layout': {},
        'paint': {
        'fill-color': '#0080ff', // blue color fill
        'fill-opacity': 0.5
        }
      });

      // Add a black outline around the polygon.
      map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'maine',
        'layout': {},
        'paint': {
          'line-color': 'white',
          'line-width': 3
        }
      });
    });
  },[]);
  return <div id = "map" style = {{ margin: 0, padding: 0, position: "absolute", top: 0, bottom: 0, width: "100%" }}></div>;
}