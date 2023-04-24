import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS.js';
import OSM from 'ol/source/OSM';

const layers = [
  new TileLayer({
    source: new OSM(),
  }),
  new TileLayer({
    source: new TileWMS({
      url: 'https://mrdata.usgs.gov/services/hi',
      params: {'LAYERS': 'Hawaii_Geology', 'TILED': true}
    }),
    opacity: 0.5
  }),
];

const map = new Map({
  layers: layers,
  target: 'map',
  view: new View({
    center: [-17430000, 2309100],
    zoom: 8.3,
  }),
});
