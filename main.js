import './style.css'
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Stroke, Style} from 'ol/style.js';
import {Draw} from 'ol/interaction.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';

const typeSelect = document.getElementById("LineString");

//Set the color and width of line go to draw
const style = new Style({
  stroke: new Stroke({
    color: 'rgba(0, 255, 255, 0.8)',
    lineDash: [10, 10],
    width: 5,
  }),
});

const raster = new TileLayer({
  source: new OSM(),
});

const source = new VectorSource();

function styleFunction() {
  const styles = [style];
  return styles;
}

//keep the style of line 
const vector = new VectorLayer({
  source: source,
  style: function (feature) {
    return styleFunction(feature);
  },
});

const map = new Map({
  layers: [raster, vector], //raster is a map and vector is the layer to draw
  target: 'map',
  view: new View({
    center: [-8246000, 512500], //Centro historico de Bogota
    zoom: 16,
  }),
});

let draw; // global so we can remove it later

function addInteraction() {
  const chooseType = typeSelect.value;
  if (chooseType === 'LineString'){
    draw = new Draw({
      source: source,
      type: typeSelect.value,
      style: function (feature) {
        return styleFunction(feature, chooseType);
      },
    });
    map.addInteraction(draw);
  }
}

addInteraction();
