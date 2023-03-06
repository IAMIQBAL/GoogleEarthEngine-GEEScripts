``` 
    Use this script for ERA5 Land Hourly dataset which provides
    a consistent view of the evolution of land variables over 
    several decades at an enhanced resolution compared to ERA5.
    The script takes region coordinates, particular date, variable,
    and visParams and returns an image of nth hour in Earth Engine.
```

var region = ee.Geometry.BBox(-122.09, 37.42, -122.08, 37.43); // Dummy Coordinates | Region west, south, east, north

var ERA5Collection = ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY')
                              .filter(ee.Filter.date('2022-01-01', '2022-01-02')) // Date
                              .select('u_component_of_wind_10m') // Band | More bands on ERA5_Land Hourly
                              
var ERA5List = ERA5Collection.toList(ERA5Collection.size())
var ERA5 = ee.Image(ERA5List.get(0)) // nth Hour of the Day
var bbox2 = region.bounds()
var bbox = ERA5.clip(bbox2)

// Change visualization parameters accordingly
var visParams = {
  min: -40.0,
  max: 35.0,
  palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

var clipERA5 = ERA5.clip(region);
Map.addLayer(clipERA5, visParams, "U Component of Wind");
Map.centerObject(clipERA5, 5);