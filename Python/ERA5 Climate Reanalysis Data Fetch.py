import ee
import geemap
import os
from geemap import cartoee
import matplotlib.pyplot as plt
%matplotlib inline

Map = geemap.Map()

def fetchImages(lat, lng, regionCoords, startDate, endDate, visParams, band, saveDir, gifName='output.gif', w=7, h=7, dpi=100, ff='png'):
    point = ee.Geometry.Point(lng, lat)
    collection = (ee.ImageCollection('ECMWF/ERA5_LAND/HOURLY') # Change for Daily or Monthly Averages
                 .filterBounds(point)
                 .filterDate(start, end)
                 .select(band))
    cartoee.get_image_collection_gif(
    ee_ic=collection,
    out_dir=os.path.expanduser(saveDir),
    out_gif=gifName,
    vis_params=visParams,
    region=regionCoords,
    fps=5, # Frame per second of output gif
# Uncomment Below for map4 output, plot title and date format respectively
#     mp4=True,
#     plot_title='',
#     date_format='YYYY-MM-dd',
    fig_size=(w, h),
    dpi_plot=dpi,
    file_format=ff,
    verbose=True,
#     grid_interval=(5,5)
)

# Temperature VisParams
visTEMP = {
  'min': 250,
  'max': 320,
  'palette': [
    '#000080', '#0000D9', '#4000FF', '#8000FF', '#0080FF', '#00FFFF', '#00FF80',
    '#80FF00', '#DAFF00', '#FFFF00', '#FFF500', '#FFDA00', '#FFB000', '#FFA400',
    '#FF4F00', '#FF2500', '#FF0A00', '#FF00FF'
  ]
};

# Precipitation VisParams
visPREC = {
    'min': 0,
    'max': 0.1,
    'palette': ['#FFFFFF', '#00FFFF', '#0080FF', '#DA00FF', '#FFA400', '#FF0000']
}


# 24 hrs
# 1982 to 2023
# Change Date Accordingly
start = '2022-09-24'
end = '2022-10-01'

band = 'total_precipitation' # temperature_2m OR total_precipitation

# Longitude and Latitude for centering
lon = 0
lat = 0
selection = [] # Bounding Box Coordinates

fetchImages(lat, lon, selection, start, end, visPREC, band, 'prec22Sep/' + str(2022))