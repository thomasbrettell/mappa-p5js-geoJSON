let myMap;
let canvas;
const mappa = new Mappa('Leaflet');
var colors = ['#fff7fb'];

const STATES = [
  {
    name: 'New South Wales',
    coords: [-31.840233, 145.612793],
  },
  {
    name: 'Victoria',
    coords: [-37.0201, 144.9646],
  },
  {
    name: 'South Australia',
    coords: [-30.000233, 136.209152],
  },
  {
    name: 'Western Australia',
    coords: [-25.042261, 117.793221],
  },
  {
    name: 'ACT',
    coords: [-35.282001, 149.128998],
  },
  {
    name: 'Tasmania',
    coords: [-41.640079, 146.315918],
  },
  {
    name: 'Queensland',
    coords: [-22.5752, 144.0848],
  },
  {
    name: 'Northern Territory',
    coords: [-19.4914, 132.551],
  },
];

const options = {
  lat: -28.2744,
  lng: 133.7751,
  zoom: 5,
  // style: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
};

function preload() {
  geoJSON = loadJSON(
    'https://gist.githubusercontent.com/GerardoFurtado/02aa65e5522104cb692e/raw/8108fbd4103a827e67444381ff594f7df8450411/aust.json'
  );
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  // fill(200, 100, 100);

  polygons = myMap.geoJSON(geoJSON, 'Polygon');
  multiPolygons = myMap.geoJSON(geoJSON, 'MultiPolygon');

  // Only redraw the point when the map changes and not every frame.
  // myMap.onChange(drawPoint);
}

function draw() {
  clear();

  //  For all polygons loop through the array and create a new Shape.
  stroke(0);
  strokeWeight(0.3);
  fill(255);
  // For all multiPolygons loop through the array and create a new Shape.
  for (var i = 0; i < multiPolygons.length; i++) {
    for (var k = 0; k < multiPolygons[i].length; k++) {
      beginShape();
      for (var j = 0; j < multiPolygons[i][k][0].length; j++) {
        //      for (var j = 0; j < multiPolygons[i][k].length; j++){
        var pos = myMap.latLngToPixel(
          multiPolygons[i][k][0][j][1],
          multiPolygons[i][k][0][j][0]
        );
        //        var pos = myMap.latLngToPixel(multiPolygons[i][k][j][1], multiPolygons[i][k][j][0]);
        vertex(pos.x, pos.y);
      }
      endShape();
    }
  }
  for (var i = 0; i < polygons.length; i++) {
    beginShape();
    for (var j = 0; j < polygons[i][0].length; j++) {
      var pos = myMap.latLngToPixel(polygons[i][0][j][1], polygons[i][0][j][0]);
      vertex(pos.x, pos.y);
    }
    endShape();
  }

  // for(var i = 0; i < geoJSON.features; i++) {
  //   text('NSW')
  // }
  for (const state of STATES) {
    fill(0);
    const pos = myMap.latLngToPixel(state.coords[0], state.coords[1]);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(state.name, pos.x, pos.y);
  }

  for(const dp of postCodeData) {
    const pos = myMap.latLngToPixel(dp.lat, dp.lng);
    fill(255, 0, 0, 50)
    noStroke()
    ellipse(pos.x, pos.y, 10, 10)
  }
}

function drawPoint() {
  clear();

  const nigeria = myMap.latLngToPixel(11.396396, 5.076543);
  ellipse(nigeria.x, nigeria.y, 20, 20);
}
