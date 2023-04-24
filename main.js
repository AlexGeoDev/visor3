import './style.css'
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { Stroke, Style} from 'ol/style.js';
import {Draw, Modify} from 'ol/interaction.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';

const typeSelect = document.getElementById("type");

//Set the color and width of line go to draw
const style = new Style({
  stroke: new Stroke({
    color: 'rgb(0, 0, 0)',
    line: 1,
    width: 3,
  })
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
  if (chooseType !== 'None'){
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
