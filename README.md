# Polygonizer
Make some polygons out of some colored areas using OpenCV.


## Install

    npm install git+ssh://git@github.com:orangemug/polygonizer.git


## Usage

    var polygonizer = require("polygonizer");
    polygonizer.get("/path/to/file.png", opts, function(err, data) {
      // data => [[10, 20, ...], ...]
    });

Where opts can be

 * `color`: The color to use as a threshold value
 * `epsilon`: The ellipson for finer adjustment
 * `minArea`: Minimum area of a polygon


## License
MIT
