import './style.css';
import  'bootstrap/dist/css/bootstrap.css'
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import Stamen from 'ol/source/Stamen';

function baseMap() {
  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new Stamen({
          layer: 'watercolor',
        }),
      }),
    ],
    view: new View({
      center: [-7400000, 400000],
      zoom: 4
    })
  });
}

baseMap();
