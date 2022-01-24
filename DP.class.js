class DP {
  constructor(lat, lng, suburb) {
    this.lat = lat;
    this.lng = lng;
    this.r = 5;
    this.color = color(255, 0, 0, 100);
    this.suburb = suburb;
  }

  display() {
    push();
    textSize(8);
    fill(this.color);
    noStroke();
    const pos = myMap.latLngToPixel(this.lat, this.lng);
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2, this.r * 2);
    fill(0)
    textAlign(LEFT)
    text(this.suburb, 8, 0);
    pop();
  }
}
