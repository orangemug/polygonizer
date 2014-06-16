var fs   = require("fs");
var cv   = require('opencv');
var util = require("util");


function get(filepath, opts, done) {
  opts = opts || {};
  var minArea  = opts.minArea  || 10;
  var color    = opts.color    || {r: 255, g: 0, b: 0};
  var ellipson = opts.ellipson || 0.001;

  // NOTE: The colors are reverse order
  var lowerThreshold = [color.b, color.g, color.r];
  var upperThreshold = [color.b, color.g, color.r];

  cv.readImage(filepath, function(err, im) {
    var out = [];

    if(err) {
      done(err);
      return;
    }

    // Create a copy so we still have the original
    imc = im.copy();

    // Select all things in that color
    imc.inRange(lowerThreshold, upperThreshold);

    // Theshold top range
    imc.threshold(255, 255);

    contours = imc.findContours();

    var poly = [];

    // Assume the first polygon it the correct value
    for(var i=0; i<contours.size(); i++) {

      if(contours.area(i) > minArea) {
        var arcLength = contours.arcLength(i, true);
        contours.approxPolyDP(i, ellipson * arcLength, false);

        for(c = 0; c < contours.cornerCount(i); c++) {
          var point = contours.point(i, c);
          poly.push({
            x: point.x,
            y: point.y
          });
        }
        out.push(poly);
      }
    }

    done(undefined, out);
  });
}

module.exports = {
  get: get
};
