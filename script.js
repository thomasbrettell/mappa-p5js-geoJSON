const mappa = new Mappa('Leaflet');
const DATA_POINTS = [];
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
  polygons = myMap.geoJSON(geoJSON, 'Polygon');
  multiPolygons = myMap.geoJSON(geoJSON, 'MultiPolygon');
  for (const dp of postCodeData) {
    DATA_POINTS.push(new DP(dp.lat, dp.lng, dp.Suburb));
  }
}

function draw() {
  clear();
  stroke(0);
  strokeWeight(0.3);
  fill(255);
  for (let i = 0; i < multiPolygons.length; i++) {
    for (let k = 0; k < multiPolygons[i].length; k++) {
      beginShape();
      for (let j = 0; j < multiPolygons[i][k][0].length; j++) {
        const pos = myMap.latLngToPixel(
          multiPolygons[i][k][0][j][1],
          multiPolygons[i][k][0][j][0]
        );
        vertex(pos.x, pos.y);
      }
      endShape();
    }
  }
  for (let i = 0; i < polygons.length; i++) {
    beginShape();
    for (let j = 0; j < polygons[i][0].length; j++) {
      const pos = myMap.latLngToPixel(
        polygons[i][0][j][1],
        polygons[i][0][j][0]
      );
      vertex(pos.x, pos.y);
    }
    endShape();
  }

  if (myMap.zoom() > options.zoom) {
    for (const dp of DATA_POINTS) {
      dp.display();
    }
  }

  if (myMap.zoom() <= options.zoom) {
    for (const state of STATES) {
      fill(0);
      const pos = myMap.latLngToPixel(state.coords[0], state.coords[1]);
      textSize(16);
      textAlign(CENTER, CENTER);
      text(state.name, pos.x, pos.y);
    }
  }
}
