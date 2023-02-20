// RGB Composite of Night Lights using Additive Color System
// 2013: Red
// 2003: Green
// 1993: Blue

// Enter ROI [West, South, East, North]
var ROI = [];

// More coverages https://www.ncei.noaa.gov/products/dmsp-operational-linescan-system
var yearR = 'F182013'
var yearG = 'F182012'
var yearB = 'F182011'

var nB = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/' + yearB);
var nG = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/' + yearG)
                  .select('stable_lights')
                  .rename(yearG)
                  
var nR = ee.Image('NOAA/DMSP-OLS/NIGHTTIME_LIGHTS/' + yearR)
                  .select('stable_lights')
                  .rename(yearR)
                  
var composite = nR.addBands(nG)
                      .addBands(nB.select('stable_lights')
                      .rename(yearB))

var bbox = ee.Geometry.BBox(ROI[0], ROI[1], ROI[2], ROI[3]);

var clipNL = composite.clip(bbox)
Map.addLayer(clipNL, {min:0,max:63}, "NightLights");
Map.centerObject(clipNL, 3);